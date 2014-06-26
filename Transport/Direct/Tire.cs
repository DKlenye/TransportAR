using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web.UI.WebControls;
using Castle.Core;
using Ext.Direct;
using Kdn.Direct;
using Newtonsoft.Json.Linq;
using NHibernate.Criterion;
using Transport.Models;
using Transport.Models.tire;

namespace Transport.Direct
{
    public partial class Direct : Kdn.Direct.Direct
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
                movings.ForEach(x =>
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
            
            idList.ForEach(id=>
            {
                var moving = TireMoving.Find(id.Value<int>());
                var rez = db.Query<TireWorkVM>(";EXEC VehicleTireWork_Select @TireId",
                     new
                     {
                         TireId = moving.TireId
                     }
                   ).Where(x => x.TireMovingId == id.Value<int>());
                
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
                        record = new JObject() { new JProperty("period", period) };
                        data.Add(period,record);
                    }
                    record[moving.TireMovingId.ToString()] = String.Format("{0} [{1}]", r.work, r.SumWork);

                });

            });  
            
            return new DataSerializer(data.Values.ToList());
        }
       


    }
}
