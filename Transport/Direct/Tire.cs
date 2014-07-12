﻿using System;
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
        }




        [DirectMethod]
        [ParseAsJson]
        public DataSerializer TireCardRead(JObject o)
        {

            JToken p;
            int id = 0;

            p = o["filter"];

            id = p["TireId"].Value<int>();

            var db = new PetaPoco.Database("db2");
            var rez = db.Query<Models.BatteryCard>(";EXEC TireCard @TireId",
                 new
                 {
                     TireId = id
                 }
               );

            return new DataSerializer(new List<BatteryCard>(rez));
        }

        [DirectMethod]
        [ParseAsJson]
        public DataSerializer VehicleTiresRead(JObject o)
        {
            JToken p; int id = 0;
            p = o["filter"];
            id = p["TireId"].Value<int>();
            var data = new List<VihicleTire>();

            var currentMoving = TireMoving.FindOne(Restrictions.Where<TireMoving>(x => x.TireMovingId == Tire.Find(id).TireMovingId));
            if (currentMoving != null)
            {
                var movings = TireMoving.FindAll(Restrictions.Where<TireMoving>(x => x.Vehicle == currentMoving.Vehicle));
                CollectionExtensions.ForEach(movings, x =>
                {
                    var tire = Tire.Find(x.TireId);
                    var vt = new VihicleTire()
                    {
                        TireMovingId = x.TireMovingId,
                        InstallDate = x.InstallDate,
                        RemoveDate = x.RemoveDate,
                        FactoryNumber = tire.FactoryNumber,
                        Season = tire.Season
                    };
                    data.Add(vt);
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
            var db = new PetaPoco.Database("db2");
            
            CollectionExtensions.ForEach(idList, id=>
            {
                var moving = TireMoving.Find(id.Value<int>());
                var rez = db.Query<TireWorkVM>(";EXEC VehicleTireWork_Select @TireId",
                     new
                     {
                         TireId = moving.TireId
                     }
                   ).Where(x => x.TireMovingId == id.Value<int>());
                
                CollectionExtensions.ForEach(rez, r =>
                {
                    var period = r.y*100 + r.m;
                    JObject record;
                    if (data.ContainsKey(period))
                    {
                        record = data[period];
                    }
                    else
                    {
                        record = new JObject() { new JProperty("period", period) };
                        data.Add(period,record);
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
                else
                {
                    var _x = x["period"].Value<int>();
                    var _y = y["period"].Value<int>();
                    return _x.CompareTo(_y);
                }
            });

            return new DataSerializer(datList);
        }

        [DirectMethod]
        [ParseAsJson]
        public DataSerializer UpdateTireWork(JObject o)
        {
            var TireMovingId = o["TireMovingId"].Value<int>();
            var Period = o["period"].Value<int>();
            var Km = o["Km"].Value<int?>();

            var work = TireWork.FindFirst(
                  Expression.Where<TireWork>(
                      x => x.key.Period==Period && x.key.TireMovingId==TireMovingId));

            if (Km == null)
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
                        Km = Km.Value,
                        key = new TireWorkKey() {Period = Period, TireMovingId = TireMovingId}
                    };
                    work.CreateAndFlush();
                }
                else
                {
                    work.Km = Km.Value;
                    work.SaveAndFlush();
                }
            }

            return new DataSerializer(new List<object>());
        }






        [DirectMethod]
        [ParseAsJson]
        public DataSerializer TireRefresh(JObject o)
        {

            Tire.FindAll().ToList().ForEach(x =>
            {
                if (x.InstallDate != null)
                {
                    var moving = new TireMoving()
                    {
                        InstallDate = x.InstallDate.Value,
                        TireId = x.TireId,
                        Vehicle = x.Vehicle
                    };
                    moving.SaveAndFlush();
                }
            });

            return new DataSerializer(new List<object>());
        }





    }
}
