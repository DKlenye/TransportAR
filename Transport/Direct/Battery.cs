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


namespace Transport.Direct
{
   public partial class Direct:Kdn.Direct.Direct
    {

       [DirectMethod]
       [ParseAsJson]
       public DataSerializer BatteryCardRead(JObject o)
       {

         JToken p;
         int id = 0;

         p = o["filter"];

         id = p["BatteryId"].Value<int>();                   

          var db =new PetaPoco.Database("db2");
          var rez = db.Query<Models.BatteryCard>(";EXEC BatteryCard @BatteryId",
               new
               {
                  BatteryId = id
               }
             );                    

          return new DataSerializer(new List<BatteryCard>(rez));
       }
    }
}
