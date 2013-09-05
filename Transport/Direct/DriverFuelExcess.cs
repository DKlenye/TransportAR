﻿using System;
using System.Configuration;
using System.Data.OleDb;
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
      public DataSerializer DriverFuelExcessRead(JObject o) {

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
         var rez = db.Query<Models.DriverFuelExcess>(";EXEC DriverFuelExcessRead @0,@1,@2",
              month,
              year,
              accountingId
            );
         return new DataSerializer(new List<DriverFuelExcess>(rez));
      }

      [DirectMethod]
      [ParseAsJson]
      public DataSerializer DriverFuelExcesssUpdate(JObject o) {

         JArray models = getModels(o);
         List<object> rezult = new List<object>();

         var db = new PetaPoco.Database("db2");

         foreach( JObject model in models ) {
            var excess = JsonConvert.DeserializeObject<DriverFuelExcess>(model.ToString());

            db.Execute("update DriverFuelExcess set SalaryPeriod = @0 where AccPeriod = @1 and AccountingId = @2 and DriverId = @3",
               excess.SalaryPeriod,
               excess.AccPeriod,
               excess.AccountingId,
               excess.DriverId
            );

            rezult.Add(excess);

         }

         return new DataSerializer(rezult);
      }


      [DirectMethod]
      [ParseAsJson]
      public string DriverFuelExcessSalarySend(JObject o) {


         JToken p;
         
         int month = 0, year = 0, accountingId = 0;

                  
         if( o.TryGetValue("period", out p) && p.Value<DateTime?>() != null ) {
            month = p.Value<DateTime>().Month;
            year = p.Value<DateTime>().Year;
         }
         if( o.TryGetValue("accounting", out p) && !String.IsNullOrEmpty(p.Value<string>()) ) {
            accountingId = p.Value<int>();
         }
         

         int nyear,nmonth;

         if(month==12){
            nmonth=1;
            nyear=year+1;
         }
         else{
            nmonth=month+1;
            nyear=year;
         }


         string fileName =accountingId==1?"Vo885":"Vo885p";

         var db = new PetaPoco.Database("db2");
         var rez = db.Query<Models.DriverFuelExcess>(";EXEC DriverFuelExcessRead @0,@1,@2",
              month,
              year,
              accountingId
            );

         OleDbConnection c = new OleDbConnection(ConfigurationManager.ConnectionStrings["salary"].ConnectionString);
         

         try {
            c.Open();

            System.IO.File.Delete("\\\\Pump\\buh_acc$\\sutki\\zarpiv\\" + fileName + ".dbf");
            System.IO.File.Copy(System.Web.Hosting.HostingEnvironment.MapPath("\\Transport2\\db\\") + fileName + ".dbf", "\\\\Pump\\buh_acc$\\sutki\\zarpiv\\" + fileName + ".dbf");
         }
         catch( Exception ex ) {
            return ex.Message;
         }
         /*new OleDbCommand(String.Format("delete from {0}",fileName), c).ExecuteNonQuery();
         new OleDbCommand(String.Format("SET EXCLUSIVE ON ; pack {0}.dbf", fileName), c).ExecuteNonQuery();*/


         string msg = "";

         foreach( var r in rez ) {

            if( r.SalaryPeriod == nyear * 100 + nmonth ) {

               try {

                 var insert = new OleDbCommand(
                        String.Format("insert into {0} ([ZEX],[TAB],[VO],[RABT],[SUM],[MESN],[GODN]) values('{1}','{2}','{3}','',{4},'{5}',{6})",
                           fileName,
                           r.Department,
                           r.EmployeeNumber,
                           "8850",
                           (int)r.Cost,
                           nmonth,
                           nyear
                        )
                        , c
                  );

                  insert.ExecuteNonQuery();
               }
               catch( Exception ex ) {
                  msg = ex.Message;
               }
            }
         }
         
         c.Close();


         if( msg == "" ) return "Выполнено успешно";
         else return msg;

      }  

 


    }
}
