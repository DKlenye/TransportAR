using System;
using System.Collections.Generic;
using Ext.Direct;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Kdn.Direct;
using Transport.Models;


namespace Transport.Direct
{
   public partial class Direct:Kdn.Direct.Direct
    {

       [DirectMethod]
       [ParseAsJson]
       public DataSerializer FuelCostRead(JObject o)
       {

         JToken p;
         int month=0, year=0, accountingId=0;
          
         if( o.TryGetValue("period", out p) && p.Value<DateTime?>() != null ) {
            month = p.Value<DateTime>().Month;
            year = p.Value<DateTime>().Year;            
         }
         if( o.TryGetValue("accounting", out p) && !String.IsNullOrEmpty(p.Value<string>())) {
            accountingId = p.Value<int>();
         }

          var db =new PetaPoco.Database("db2");          
          var rez = db.Query<Models.FuelFilledCost>(";EXEC FuelFilledCost_Select @month,@year,@accountingId",
               new
               {
                  month = month,
                  year = year,
                  accountingId = accountingId
               }
             );                    
          return new DataSerializer(new List<FuelFilledCost>(rez));
       }

       [DirectMethod]
       [ParseAsJson]
       public DataSerializer FuelCostSave(JObject o) {

          JArray models = getModels(o);
          List<object> rezult = new List<object>();

          var db = new PetaPoco.Database("db2"); 

          foreach( JObject model in models ) {
             var FuelFilledCost = JsonConvert.DeserializeObject<FuelFilledCost>(model.ToString());

             db.Execute(";EXEC FuelFilledCost_Save @accperiod,@accountingId,@fuelId,@refuellingPlaceId,@cost,@diff",
                new {
                  accperiod = FuelFilledCost.AccPeriod,
                  accountingId = FuelFilledCost.AccountingId,
                  fuelId = FuelFilledCost.FuelId,
                  refuellingPlaceId = FuelFilledCost.RefuellingPlaceId,
                  cost = FuelFilledCost.Cost,
                  diff = FuelFilledCost.Diff
                }
             );

             rezult.Add(FuelFilledCost);

          }

          return new DataSerializer(rezult);

       }

      
       [DirectMethod]
       [ParseAsJson]
       public DataSerializer AccFuelPriceCalculate(JObject o)
       {

         JToken p;
         int month=0, year=0, accountingId=0;
          
         if( o.TryGetValue("period", out p) && p.Value<DateTime?>() != null ) {
            month = p.Value<DateTime>().Month;
            year = p.Value<DateTime>().Year;            
         }
         if( o.TryGetValue("accounting", out p) && !String.IsNullOrEmpty(p.Value<string>())) {
            accountingId = p.Value<int>();
         }

          var db =new PetaPoco.Database("db2");
          var rez = db.Query<Models.FuelPriceCalculate>(";EXEC AccFuelPrice_Calculate @month,@year,@accountingId",
               new
               {
                  month = month,
                  year = year,
                  accountingId = accountingId
               }
             );

          return new DataSerializer(new List<FuelPriceCalculate>(rez));
       }



       [DirectMethod]
       [ParseAsJson]
       public DataSerializer AccFuelPriceRead(JObject o) {

          JToken p;
          int month = 0, year = 0, accountingId = 0;

          if( o.TryGetValue("period", out p) && p.Value<DateTime?>() != null ) {
             month = p.Value<DateTime>().Month;
             year = p.Value<DateTime>().Year;
          }
          if( o.TryGetValue("accounting", out p) && !String.IsNullOrEmpty(p.Value<string>()) ) {
             accountingId = p.Value<int>();
          }

          var db = new PetaPoco.Database("db2");
          var rez = db.Query<Models.AccFuelPrice>(";EXEC AccFuelPrice_Select @month,@year,@accountingId",
               new {
                  month = month,
                  year = year,
                  accountingId = accountingId
               }
             );
          return new DataSerializer(new List<AccFuelPrice>(rez));
       }


       [DirectMethod]
       [ParseAsJson]
       public DataSerializer AccFuelPriceSave(JObject o) {

          JArray models = getModels(o);
          List<object> rezult = new List<object>();

          var db = new PetaPoco.Database("db2");

          foreach( JObject model in models ) {
             var a = JsonConvert.DeserializeObject<AccFuelPrice>(model.ToString());
             db.Execute(";EXEC AccFuelPrice_Save @accperiod,@accountingId,@fuelId,@price,@retailPrice",
                new {
                   accperiod = a.AccPeriod,
                   accountingId = a.AccountingId,
                   fuelId = a.FuelId,
                   price = a.Price,
                   retailPrice = a.RetailPrice
                }
             );
             rezult.Add(a);
          }
          return new DataSerializer(rezult);

       }

          
 


    }
}
