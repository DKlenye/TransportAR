using System;
using System.Collections.Generic;
using System.Linq;
using Castle.Core;
using Ext.Direct;
using Kdn.Direct;
using Newtonsoft.Json.Linq;
using NHibernate.Criterion;
using Transport.Models;
using Transport.Models.tire;

namespace Transport.Direct
{
    public partial class Direct
    {

        public class VihicleTire
        {
            public int TireMovingId { get; set; }
            public string FactoryNumber { get; set; }
            public TireSeason? Season { get; set; }
            public DateTime InstallDate { get; set; }
            public DateTime? RemoveDate { get; set; }
            public string RemoveReason { get; set; }
            public bool IsWriteOff { get; set; }
        }

        
        [DirectMethod]
        [ParseAsJson]
        public DataSerializer TireCardRead(JObject o)
        {

            var id = o["filter"]["TireId"].Value<int>();

            var rez = db.Query<Models.TireCard>(";EXEC TireCard @0", id);

            return new DataSerializer(new List<TireCard>(rez));
        }

        [DirectMethod]
        [ParseAsJson]
        public DataSerializer VehicleTiresRead(JObject o)
        {
            JToken p; int id = 0;
            p = o["filter"];
            id = p["TireId"].Value<int>();
            var showObsolete = p["showObsolete"].Value<bool>();
            var data = new List<VihicleTire>();

            var currentMoving = TireMoving.FindOne(Restrictions.Where<TireMoving>(x => x.TireMovingId == Tire.Find(id).TireMovingId));
            if (currentMoving != null)
            {
                var movings = TireMoving.FindAll(Restrictions.Where<TireMoving>(x => x.Vehicle == currentMoving.Vehicle));
                CollectionExtensions.ForEach(movings, x =>
                {
                    var tire = Tire.Find(x.TireId);
                    var reason = x.TireRemoveReasonId==null?null:TireRemoveReason.Find(x.TireRemoveReasonId);
                    
                    var vt = new VihicleTire()
                    {
                        TireMovingId = x.TireMovingId,
                        InstallDate = x.InstallDate,
                        RemoveDate = x.RemoveDate,
                        FactoryNumber = tire.FactoryNumber,
                        Season = tire.Season
                    };

                    if (reason != null)
                    {
                        vt.RemoveReason = reason.TireRemoveReasonName;
                        vt.IsWriteOff = reason.isWriteOff;
                    }

                    if (!showObsolete && reason != null)
                    {
                    }
                    else data.Add(vt);
                });
            }

            return new DataSerializer(data);

        }


        public class TireWorkVM
        {
            public int ORDER_ID { get; set; }
            public int m { get; set; }
            public int y { get; set; }
            public int TireMovingId { get; set; }
            public int VehicleId { get; set; }
            public DateTime InstallDate { get; set; }
            public DateTime RemoveDate { get; set; }
            public int work { get; set; }
            public int SumWork { get; set; }
            public bool isHanded { get; set; }
        }




        [DirectMethod]
        [ParseAsJson]
        public DataSerializer VehicleTiresWorkRead(JObject o)
        {
            JToken p;
            p = o["filter"];
            var idList = JArray.Parse(p["movings"].ToString());
            var data = new Dictionary<int, JObject>();

            idList.ForEach(id =>
            {
                var moving = TireMoving.Find(Extensions.Value<int>(id));
                var rez =
                    db.Query<TireWorkVM>(";EXEC VehicleTireWork_Select @0", moving.TireId)
                        .Where(x => x.TireMovingId == Extensions.Value<int>(id));

                rez.ForEach(r =>
                {
                    var period = r.y*100 + r.m;
                    JObject record;
                    if (data.ContainsKey(period))
                    {
                        record = data[period];
                    }
                    else
                    {
                        record = new JObject() {new JProperty("period", period)};
                        data.Add(period, record);
                    }

                    record[moving.TireMovingId.ToString()] = r.work;
                    record[moving.TireMovingId.ToString() + "_sum"] = r.SumWork;
                    record[moving.TireMovingId.ToString() + "_isHanded"] = r.isHanded;

                });

            });

            var datList = data.Values.ToList();

            datList.Sort(delegate(JObject x, JObject y)
            {
                if (x == null || y == null) return 0;

                var _x = x["period"].Value<int>();
                var _y = y["period"].Value<int>();
                return _x.CompareTo(_y);

            });

            return new DataSerializer(datList);
        }

        public class UpdateTireWorkParam
        {
            public int TireMovingId { get; set; }
            public int period { get; set; }
            public int? Km { get; set; }
        }


        [DirectMethod]
        public DataSerializer UpdateTireWork(UpdateTireWorkParam par)
        {
            var work = TireWork.FindFirst(
                  Restrictions.Where<TireWork>(
                      x => x.key.Period==par.period && x.key.TireMovingId==par.TireMovingId));

            if (par.Km == null)
            {
               if (work != null)
                {
                    work.DeleteAndFlush();
                }
            }
            else
            {
                if (work == null)
                {
                    work = new TireWork()
                    {
                        IsAutomatic = false,
                        Km = par.Km.Value,
                        key = new TireWorkKey() {Period = par.period, TireMovingId = par.TireMovingId}
                    };
                    work.CreateAndFlush();
                }
                else
                {
                    work.Km = par.Km.Value;
                    work.SaveAndFlush();
                }
            }

            return new DataSerializer(new List<object>());
        }


        [DirectMethod]
        public Tire[]  GetVehicleTires(BaseVehicle vehicle)
        {
            return TireMoving.FindByVehicle(vehicle).Select( x=>Tire.Find(x.TireId)).ToArray();
        }


    }
}
