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
   public partial class Direct : Kdn.Direct.Direct {

      [DirectMethod]
      [ParseAsJson]
      public DataSerializer AccRefuellingRead(JObject o) {

         JToken p;
         int month = 0, year = 0, refuellingPlaceId = 0, accountingId = 0;

         if( o.TryGetValue("period", out p) && p.Value<DateTime?>() != null ) {
            month = p.Value<DateTime>().Month;
            year = p.Value<DateTime>().Year;
         }
         if( o.TryGetValue("refuellingPlaceId", out p) && p.Value<int?>() != null ) {
            refuellingPlaceId = p.Value<int>();
         }

         if( o.TryGetValue("accounting", out p) && !String.IsNullOrEmpty(p.Value<string>()) ) {
            accountingId = p.Value<int>();
         }


         var db = new PetaPoco.Database("db2");
         var rez = db.Query<Models.AccRefuelling>("SELECT * FROM v_AccRefuelling where MONTH(RefuellingDate) = @0 and YEAR(RefuellingDate)= @1 and RefuellingPlaceId = @2 and AccountingId = @3",
              month,
              year,
              refuellingPlaceId,
              accountingId
            );
                              
         return new DataSerializer(new List<AccRefuelling>(rez));
      }


                                          

      [DirectMethod]
      [ParseAsJson]
      public DataSerializer AccRefuellingUpdate(JObject o) {

         JArray models = getModels(o);
         List<object> rezult = new List<object>();

         var db = new PetaPoco.Database("db2");

         foreach( JObject model in models ) {
            var AccRefuelling = JsonConvert.DeserializeObject<AccRefuelling>(model.ToString());

            db.Execute("Update VehicleRefuelling set CardNumber = @0, AccPeriod = @1, SheetId = @2, TrkId = @3, TankId = @4 where RefuellingId = @5",               
                  AccRefuelling.CardNumber,
                  AccRefuelling.AccPeriod,
                  AccRefuelling.SheetId,
                  AccRefuelling.TrkId,
                  AccRefuelling.TankId,
                  AccRefuelling.RefuellingId               
            );

            rezult.Add(AccRefuelling);

         }

         return new DataSerializer(rezult);


      }
   }





}
