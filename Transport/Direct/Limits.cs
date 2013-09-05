using System;
using System.Web;
using System.Reflection;
using System.Collections;
using System.Collections.Generic;
using Ext.Direct;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Castle.ActiveRecord;
using Castle.ActiveRecord.Queries;
using Kdn.CommonModels;
using NHibernate;
using NHibernate.Hql;
using NHibernate.Criterion.Lambda;
using NHibernate.Criterion;
using Kdn.Direct;
using Transport.Models;
using System.Data.SqlClient;
using System.Data;
using System.Data.OleDb;
using System.Security.Principal;

namespace Transport.Direct
{
    public partial class Direct : Kdn.Direct.Direct
    {

        [DirectMethod]
        [ParseAsJson]
        public DataSerializer KmLimitsRead(JObject o)
        {

            JToken p;
            int month = 0, year = 0;

            if (o.TryGetValue("period", out p) && p.Value<DateTime?>() != null)
            {
                month = p.Value<DateTime>().Month;
                year = p.Value<DateTime>().Year;
            }

            var db = new PetaPoco.Database("db2");
            var rez = db.Query<KmLimits>(";exec KmLimitsSelect @0,@1",
                month,
                year
               );
            return new DataSerializer(new List<KmLimits>(rez));
        }

        [DirectMethod]
        [ParseAsJson]
        public DataSerializer FuelLimitsRead(JObject o)
        {

            JToken p;
            int month = 0, year = 0;

            if (o.TryGetValue("period", out p) && p.Value<DateTime?>() != null)
            {
                month = p.Value<DateTime>().Month;
                year = p.Value<DateTime>().Year;
            }

            var db = new PetaPoco.Database("db2");
            var rez = db.Query<FuelLimits>(";exec FuelLimitsSelect @0,@1",
                month,
                year
               );
            return new DataSerializer(new List<FuelLimits>(rez));
        }


        [DirectMethod]
        [ParseAsJson]
        public DataSerializer KmLimitsDetailsRead(JObject o)
        {

            JToken p;
            int month = 0, year = 0, VehicleId = 0;

            if (o.TryGetValue("period", out p) && p.Value<DateTime?>() != null)
            {
                month = p.Value<DateTime>().Month;
                year = p.Value<DateTime>().Year;
            }

            if (o.TryGetValue("VehicleId", out p) && p.Value<int?>() != null)
            {
                VehicleId = p.Value<int>();
            }

            var db = new PetaPoco.Database("db2");
            var rez = db.Query<KmLimitsDetails>(";exec KmLimitsDetailsSelect @0,@1,@2",
                 month,
                 year,
                 VehicleId
               );
            return new DataSerializer(new List<KmLimitsDetails>(rez));
        }


    }
}
