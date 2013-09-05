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
       public DataSerializer AzsFuelCostRead(JObject o)
       {

         JToken p;
         int month = 0, year = 0;
          
         if( o.TryGetValue("period", out p) && p.Value<DateTime?>() != null ) {
            month = p.Value<DateTime>().Month;
            year = p.Value<DateTime>().Year;            
         }

          var db =new PetaPoco.Database("db2");
          var rez = db.Query<Models.AzsFuelPrice>(";EXEC AzsFuelPriceCalculate @month,@year",
               new
               {
                  month = month,
                  year = year
               }
             );
          return new DataSerializer(new List<AzsFuelPrice>(rez));
       }

       [DirectMethod]
       [ParseAsJson]
       public DataSerializer AzsFuelExciseSave(JObject o)
       {
          JArray models = getModels(o);
          List<object> rezult = new List<object>();

          var db = new PetaPoco.Database("db2"); 

          foreach( JObject model in models ) {
              var FuelPrice = JsonConvert.DeserializeObject<AzsFuelPrice>(model.ToString());

              db.Execute(";EXEC AzsFuelExcise_Save @month,@year,@fuelId,@excise",
                new {
                    month = FuelPrice.AccMonth,
                    year = FuelPrice.AccYear,
                    fuelId = FuelPrice.FuelId,
                    excise = FuelPrice.Excise
                }
             );

              rezult.Add(FuelPrice);

          }

          return new DataSerializer(rezult);

       }

      
      
          
 


    }
}
