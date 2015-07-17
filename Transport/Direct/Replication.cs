using System;
using System.Linq;
using System.Text;
using System.Reflection;
using System.Collections.Generic;
using Castle.Core;
using Ext.Direct;
using Newtonsoft.Json.Linq;
using Castle.ActiveRecord;
using NHibernate;
using NHibernate.Cfg;
using Transport.Models;
using Farm = Transport.OtherModels.farm;
using Tdbf = Transport.OtherModels.tdbf;

namespace Transport.Direct {

   public partial class Direct : Kdn.Direct.Direct {


      static string Decode(string str866) {

         var srcEncoding = Encoding.GetEncoding(866);
         var destEncoding = Encoding.Unicode;
         var bytes = srcEncoding.GetBytes(str866.ToCharArray());
         var bytesConvert = Encoding.Convert(srcEncoding, destEncoding, bytes);
         var rezult = destEncoding.GetChars(bytesConvert);
         return new String(rezult);
      }

      static Dictionary<string, int> PolymirFuelMap = new Dictionary<string, int>() {
         {"А92",1},  
         {"АИ95",2},
         {"Н80",4},
         {"H80",4}
      };


      #region Настройки подключений

      static string startPath = "D:\\OldComp\\D\\Projects\\";

      static Dictionary<string, string> TDBFSettings = new Dictionary<string, string>() {
         {"connection.driver_class","NHibernate.Driver.SqlClientDriver"},
         {"connection.connection_string","data source=dbsrv2; initial catalog=transport_dbf_store; integrated security=SSPI;"},
         {"dialect","NHibernate.Dialect.MsSql2000Dialect"},
         {"current_session_context_class","web"},
         {"model_namespace","Transport.OtherModels.tdbf"}
      };

      static Dictionary<string, string> KDRSettings = new Dictionary<string, string>() {
         {"connection.driver_class","NHibernate.Driver.SqlClientDriver"},
         {"connection.connection_string","data source=dbsrv2; initial catalog=kdr; integrated security=SSPI;"},
         {"dialect","NHibernate.Dialect.MsSql2000Dialect"},
         {"current_session_context_class","web"},
         {"model_namespace","Transport.OtherModels.kdr"}
      };

      static Dictionary<string, string> KDRPolymirSettings = new Dictionary<string, string>() {
         {"connection.driver_class","NHibernate.Driver.SqlClientDriver"},
         {"connection.connection_string","data source=dbsrv2; initial catalog=KDR_Polymir; integrated security=SSPI;"},
         {"dialect","NHibernate.Dialect.MsSql2000Dialect"},
         {"current_session_context_class","web"},
         {"model_namespace","Transport.OtherModels.kdrPolymir"}
      };

      static Dictionary<string, string> LocalSettings = new Dictionary<string, string>() {
         {"connection.driver_class","NHibernate.Driver.SQLite20Driver"},
         {"connection.connection_string","Data Source="+startPath+"TransportSite\\db\\Transport.db"},
         {"dialect","NHibernate.Dialect.SQLiteDialect"},
         {"current_session_context_class","web"}
      };

      static Dictionary<string, string> DBFSettings = new Dictionary<string, string>() {
         {"connection.provider","NHibernate.Connection.DriverConnectionProvider"},
         {"connection.driver_class","NHibernate.Driver.OleDbDriver"},
         {"connection.connection_string","Provider=VFPOLEDB.1;Data Source="+startPath+"TransportSite\\db;Password=\"\";Collating Sequence=MACHINE"},
         {"dialect","NHibernate.Dialect.MsSql2000Dialect"},
         {"current_session_context_class","web"},
         {"model_namespace","Transport.OtherModels.dbf"}
      };

      static Dictionary<string, string> FarmSettings = new Dictionary<string, string>() {
         {"connection.driver_class","NHibernate.Driver.SQLite20Driver"},
         {"connection.connection_string","Data Source="+startPath+"TransportSite\\db\\Farm.db"},
         {"dialect","NHibernate.Dialect.SQLiteDialect"},
         {"current_session_context_class","web"},
         {"model_namespace","Transport.OtherModels.farm"}
      };

      #endregion

      ISession buildCustomSession(Dictionary<string, string> settings) {
         return buildCustomSession(settings, settings["model_namespace"]);
      }
      ISession buildCustomSession(Dictionary<string, string> settings, string modelsNameSpace) {
         Configuration cfg = new Configuration().SetProperties(settings);
         Assembly currectAssembly = Assembly.GetExecutingAssembly();
         var types = currectAssembly.GetTypes();
         foreach( var type in types ) {
            if( type.Namespace != null && type.Namespace.StartsWith(modelsNameSpace) ) {
               try { cfg.AddClass(type); }
               catch( Exception ex ) { }
            }
         }

         return cfg.BuildSessionFactory().OpenSession();

      }

       
 

       [DirectMethod]
       [ParseAsJson]
       public string CalcWorkingTime(JObject o)
       {
           var counter = 0;
           var waybillId =
               db.Query<int>(@"SELECT
	                            TOP 500 
	                            w.WaybillId 
                            FROM Waybill w 
                            inner join Vehicle v on v.VehicleId = w.VehicleId and v.ownerId = 1
                            LEFT JOIN WaybillCustomerWorkingTime wcwt on wcwt.WaybillId = w.WaybillId 
                            WHERE w.accPeriod between 201306 AND 201412 AND wcwt.WaybillId IS null");

           using (new SessionScope(FlushAction.Never))
           {
               waybillId.ForEach(id =>
               {
                   var x = Waybill.Find(id);

                   try
                   {
                       x.ClearWorkingTime();

                       x.CalcWorkingTime();


                       var par = new JObject();
                       par.Add("WaybillId", id);

                       customerWorkingTimeRead(par);

                   }
                   catch 
                   {
                   }
                   counter++;
                   SessionScope.Current.Evict(x);
                   if (counter % 100 == 0)
                   {
                       SessionScope.Current.Flush();
                   }
               });
               SessionScope.Current.Flush();
           }

           return waybillId.Count().ToString();
       }




   }



}
