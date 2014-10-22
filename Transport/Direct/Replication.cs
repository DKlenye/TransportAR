using System;
using System.Linq;
using System.Text;
using System.Reflection;
using System.Collections.Generic;
using Castle.Core;
using Ext.Direct;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Castle.ActiveRecord;
using NHibernate;
using NHibernate.Cfg;
using NHibernate.Criterion;
using Kdn.Direct;
using Transport.Models;
using Transport.OtherModels.kdr;
using Transport.OtherModels.dbf;
using Transport.OtherModels.kdrPolymir;
using Farm = Transport.OtherModels.farm;
using Tdbf = Transport.OtherModels.tdbf;
using dbf = Transport.OtherModels.dbf;

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
      public string ReplicateEmployee(JObject o) {

         ISession kdrSession = buildCustomSession(KDRSettings, "Transport.OtherModels.kdr");

         IList<personal1> NaftanPersonal = new List<personal1>();
         IList<BIBPOLIM> PolymirPersonal = new List<BIBPOLIM>();
         int counter = 0;

         using( new SessionScope(FlushAction.Never) ) {
             
            try {
                                
               NaftanPersonal = kdrSession.QueryOver<personal1>().List();

               foreach( var men in NaftanPersonal ) {
                   
                  Employee employee = Employee.FindOne(Expression.Where<Employee>(e => e.id_men == men.ID_MEN));

                  string[] FIO = men.fio.Split();
                  int FIOLen = FIO.Length;

                  if( employee == null ) {
                     employee = new Employee() {
                        DSC = 1,
                        id_men = men.ID_MEN
                     };
                  }

                  employee.Department = men.ZEX;
                  employee.EmployeeNumber = men.tab;
                  employee.LastName = FIOLen > 0 ? FIO[0] : "";
                  employee.FirstName = FIOLen > 1 ? FIO[1] : "";
                  employee.MiddleName = FIOLen > 2 ? FIO[2] : "";
                  employee.Office = men.dol;
                  employee.IncomeDate = men.DATA_PR;
                  employee.DismissDate = men.DATA_UV;

                  employee.Save();
                  counter++;

                  if( counter % 200 == 0 ) {
                     SessionScope.Current.Flush();
                  }

               }

            }
            catch( Exception ex ) {
               var z = ex;
            }
            finally { SessionScope.Current.Flush(); kdrSession.Close(); }


            counter = 0;
            ISession kdrPolymirSession = buildCustomSession(KDRPolymirSettings, "Transport.OtherModels.kdrPolymir");


            try {
               PolymirPersonal = kdrPolymirSession.QueryOver<BIBPOLIM>().List();

               foreach( var men in PolymirPersonal ) {
                  Employee employee = Employee.FindOne(Expression.Where<Employee>(e => e.DSC == 2 && e.EmployeeNumber == men.nomer.Trim()));
                  men.nomer = int.Parse(men.nomer).ToString().Trim();

                  if( employee == null ) {
                     employee = new Employee() {
                        EmployeeNumber = men.nomer,
                        DSC = 2
                     };
                  }

                  employee.Department = men.zex;
                  employee.EmployeeNumber = men.nomer.Trim();
                  employee.LastName = men.fam.Trim();
                  employee.FirstName = men.ima.Trim();
                  employee.MiddleName = men.otc.Trim();
                  employee.Office = men.dol==null?"":men.dol.Trim();
                  employee.IncomeDate = ( men.data_pr == null ? (DateTime?)null : DateTime.Parse(men.data_pr) );
                  employee.DismissDate = ( men.data_uv == null ? (DateTime?)null : DateTime.Parse(men.data_uv) );

                  employee.Save();

                  counter++;

                  if( counter % 50 == 0 ) {
                     SessionScope.Current.Flush();
                  }

               }


            }
            catch( Exception ex ) {
               var z = ex;
            }
            finally { SessionScope.Current.Flush(); kdrPolymirSession.Close(); }

         }

         return "";

      }

      [DirectMethod]
      [ParseAsJson]
      public string ReplicateDriver(JObject o) {

         ISession dbfSession = buildCustomSession(DBFSettings, "Transport.OtherModels.dbf");
         IList<PolymirDrivers> PolDrivers = new List<PolymirDrivers>();
         IList<Transport.OtherModels.tdbf.Driver> NaftanDrivers = new List<Transport.OtherModels.tdbf.Driver>();

         int counter = 0;
         string errors = "";

         using( new SessionScope(FlushAction.Never) ) {

            try {

               PolDrivers = dbfSession.QueryOver<PolymirDrivers>().List();

               foreach( var driver in PolDrivers ) {

                  var employee = Employee.FindOne(Expression.Where<Employee>(x => x.DSC == 2 && x.EmployeeNumber == driver.TABN.ToString()));

                  if( employee != null ) {

                     var d = Driver.FindOne(Expression.Where<Driver>(x => x.Employee == employee));

                     if( d == null ) {
                        d = new Driver() {
                           Employee = employee,
                           OwnerId = 1
                        };

                     }

                     var kl = 0;
                     int.TryParse(driver.KL, out kl);

                     d.DriverClass = kl;
                     d.Save();


                     var licence = DriverLicence.FindOne(Expression.Where<DriverLicence>(x => x.Driver == d && x.Number == driver.NVU));
                     if( licence == null && driver.NVU.Trim() != "" ) {
                        new DriverLicence() {
                           Driver = d,
                           Number = driver.NVU,
                           DateOfTerm = DateTime.Now.AddYears(5)
                        }.Save();
                     }
                  }
                  else {
                     errors += JsonConvert.SerializeObject(driver);
                  }

                  counter++;
                  if( counter % 50 == 0 ) {
                     SessionScope.Current.Flush();
                  }

               }


            }
            catch( Exception ex ) {
               var z = ex; return ex.Message.ToString();
            }
            finally { SessionScope.Current.Flush(); dbfSession.Close(); }


            ISession dbsrv2Session = buildCustomSession(TDBFSettings, "Transport.OtherModels.tdbf");
            counter = 0;

            try {
               NaftanDrivers = dbsrv2Session.QueryOver<Transport.OtherModels.tdbf.Driver>().List();

               foreach( var driver in NaftanDrivers ) {

                  var employee = Employee.FindOne(Expression.Where<Employee>(x => x.id_men == driver.People.EmployeeId));

                  if( employee != null ) {

                     var d = Driver.FindOne(Expression.Where<Driver>(x => x.Employee == employee));

                     if( d == null ) {
                        d = new Driver() {
                           Employee = employee,
                           OwnerId = driver.OwnerId
                        };
                     }

                     d.ReplicationId = driver.DriverId;
                     d.ReplicationSource = ReplicationSource.dbsrv2;

                     d.Save();


                  }
                  else {
                     errors += JsonConvert.SerializeObject(driver);
                  }

                  counter++;
                  if( counter % 50 == 0 ) {
                     SessionScope.Current.Flush();
                  }
               }
            }
            catch( Exception ex ) {
               var z = ex; return ex.Message.ToString();
            }
            finally { SessionScope.Current.Flush(); dbsrv2Session.Close(); }
         }

         return errors;

      }

       /*
      [DirectMethod]
      [ParseAsJson]
      public string ReplicateWeather(JObject o) {


         ISession dbsrv2Session = buildCustomSession(TDBFSettings, "Transport.OtherModels.tdbf");
         IList<Transport.OtherModels.tdbf.TheWeather> Weather = new List<Transport.OtherModels.tdbf.TheWeather>();
         int counter = 0;


         using( new SessionScope(FlushAction.Never) ) {
            try {
               Weather = dbsrv2Session.QueryOver<Tdbf.TheWeather>().Where(x => x.targetDate > DateTime.Now.AddDays(-1)).List();

               foreach( var weather in Weather ) {

                  var temp = Temperature.FindOne(Expression.Where<Temperature>(x => x.key.Date == weather.targetDate && x.key.OwnerId == weather.ownerId));

                  if( temp == null ) {
                     new Temperature() {
                        OwnerId = weather.ownerId,
                        Date = weather.targetDate,
                        Temp = weather.temperature
                     }.Save();
                  }

                  counter++;
                  if( counter % 50 == 0 ) {
                     SessionScope.Current.Flush();
                  }
               }

            }
            catch( Exception ex ) {
               var z = ex; return ex.Message.ToString();
            }
            finally { 
               SessionScope.Current.Flush();
               dbsrv2Session.Flush();
               dbsrv2Session.SessionFactory.Close();
               dbsrv2Session.SessionFactory.Dispose();
               
            }
         }

         return "";

      }*/

      [DirectMethod]
      [ParseAsJson]
      public string ReplicateFarmDbsrv2(JObject o) {

         var tdbfSession = buildCustomSession(TDBFSettings);
         var farmSession = buildCustomSession(FarmSettings);


         var Waybills = farmSession.QueryOver<Farm.Waybill>()
                        .Where(new BetweenExpression("DepartureDate", Kdn.DateUtils.FirstDayOfMonth(11, 2013), Kdn.DateUtils.LastDayOfMonth(11, 2013)))
                        .OrderBy(x => x.Position).Asc
                        .List();


         var tdbfTx = tdbfSession.BeginTransaction();



         foreach( var waybill in Waybills ) {

            foreach( var waybillTask in waybill.WaybillTasks ) {
               foreach( var taskIncrease in waybillTask.WaybillTaskNormIncreases ) {
                  if( taskIncrease == 4 ) {

                     try {

                        var tdbfTask = tdbfSession.QueryOver<Tdbf.waybillsTasks>().Where(x => x.replicationID == waybillTask.TaskId).SingleOrDefault();

                        if( tdbfTask != null ) {
                           bool existFlag = false;
                           foreach( var tdbfTaskIncrease in tdbfTask.increases ) {
                              if( tdbfTaskIncrease.normIncreaseId == 3 ) {
                                 existFlag = true;
                                 break;
                              }
                           }

                           if( !existFlag ) {
                              var incr = new Tdbf.WaybillTaskIncrease() {
                                 normIncreaseId = 3,
                                 increase = 7,
                                 garageNumber = tdbfTask.garageNumber,
                                 ownerId = tdbfTask.ownerId,
                                 waybillNumber = tdbfTask.waybillNumber,
                                 waybillTaskId = tdbfTask.waybillTaskId
                              };

                              tdbfSession.Save(incr);
                           }

                        }


                     }
                     catch( Exception ex ) {
                        tdbfTx.Rollback(); return "";
                     }

                     tdbfSession.Flush();
                  }
               }
            }

         }

         tdbfTx.Commit();



         return "";


      }


      #region Подкачки по полимиру


      [DirectMethod]
      [ParseAsJson]
      public string ReplicatePolymirWaybills(JObject o)
      {
          var str = "";

          Func<DateTime, decimal, DateTime> convertDate = delegate(DateTime d, decimal time)
          {
              var hour = (int)decimal.Truncate(time);
              hour = hour > 24 ? 0 : hour;
              var min = time - hour;
              min = min > 60 ? 0 : min;
              int m = min == 0 ? 0 : int.Parse(min.ToString().Remove(0, 2));

              var date = DateTime.Now;
              try
              {
                  date = new DateTime(d.Year, d.Month, d.Day, hour, m, 0);
                  return date;
              }
              catch (Exception ex)
              {
                  throw (ex);
              }
          };


          int counter = 0;
                    

          var PolymirWaybills = _PolymirWaybill.FindAll(/*Order.Asc(Projections.Property<_PolymirWaybill>(x=>x.D_VY)),*/Expression.In(Projections.Property<_PolymirWaybill>(x=>x.REP),new string[]{"201210"}));

          using (new SessionScope(FlushAction.Never))
          {

              foreach (var pw in PolymirWaybills)
              {
                  var GarageNumber = 20000 + pw.GAR_N;
                  var car = BaseVehicle.FindFirst(Expression.Where<BaseVehicle>(x => x.GarageNumber == GarageNumber && x.OwnerId == 1));

                  if(car==null){
                      str += GarageNumber.ToString() + ',';
                    continue;
                  }

                  DateTime DepartureDate = convertDate(pw.key.D_VY, pw.VR_VY);

                  var waybill = Waybill.GetPolymirWaybill(pw.ReplicationId, DepartureDate);
                  if (waybill == null)
                  {

                      waybill = new Waybill()
                      {
                          ReplicationId = pw.ReplicationId,
                          ReplicationSource = ReplicationSource.dbfPolymir
                      };
                  }
                                    

                  waybill.Car = car;
                  waybill.FormNumber = pw.key.NPL;
                  waybill.DepartureDate = DepartureDate;
                  waybill.ReturnDate = convertDate(pw.D_VOZ.Value, pw.VR_VOZ);
                  waybill.AccPeriod = int.Parse(pw.REP);
                  waybill.ScheduleId = pw.REGIM == "2" ? 1 : 6;
                  if (pw.GAR_NP > 0)
                  {
                      var trailer = Trailer.FindFirst(Expression.Where<Trailer>(x => x.ReplicationId == pw.GAR_NP && x.ReplicationSource == ReplicationSource.dbfPolymir));
                      if (trailer != null)
                      {
                          waybill.TrailerId = trailer.VehicleId;
                      }
                  }

                  if (waybill.WaybillId == 0)
                  {
                      waybill.Position = Waybill.GetMaxPosition(car.VehicleId);
                      waybill.WaybillState = 2;
                      waybill.Save();
                      waybill.SetPosition();
                  }

                  waybill.Save();
                  SessionScope.Current.Flush();

                 // counter++; if (counter % 1 == 0) { SessionScope.Current.Flush(); }

              }
              SessionScope.Current.Flush();
          }



          return str;




      }





      [DirectMethod]
      [ParseAsJson]
      public string ReplicatePolymirGroups(JObject o) {
         var dbfSession = buildCustomSession(DBFSettings);
         var PolymirGroups = dbfSession.QueryOver<dbf.PolymirGroup>().List();

         foreach( var pGroup in PolymirGroups ) {

            var group = GroupAcc.FindFirst(Expression.Where<GroupAcc>(x => x.ReplicationId == Int16.Parse(pGroup.TIP) && x.ReplicationSource == ReplicationSource.dbfPolymir));

            if( group == null ) {
               new GroupAcc() {
                  GroupAccName = pGroup.NAIM,
                  ReplicationId = Int16.Parse(pGroup.TIP),
                  ReplicationSource = ReplicationSource.dbfPolymir
               }.SaveAndFlush();
            }
            else {
               group.GroupAccName = pGroup.NAIM;
               group.ReplicationId = Int16.Parse(pGroup.TIP);
               group.ReplicationSource = ReplicationSource.dbfPolymir;
               group.SaveAndFlush();
            }

         }
         return "";
      }

      [DirectMethod]
      [ParseAsJson]
      public string ReplicatePolymirIncrease(JObject o) {
         Action<string, short> fn = delegate(string name, short increase) {
            var inc = Increase.FindFirst(Expression.Where<Increase>(x => x.ReplicationId == name && x.ReplicationSource == ReplicationSource.dbfPolymir));
            if( inc == null ) inc = new Increase();

            inc.ReplicationSource = ReplicationSource.dbfPolymir;
            inc.ReplicationId = name;
            inc.Prcn = increase;
            inc.IncreaseName = name;
            inc.SaveAndFlush();
         };

         fn("TRASS", -10);
         fn("ZIMA", 7);
         fn("MLN", 5);
         fn("KOND", 4);

         return "";

      }

      [DirectMethod]
      [ParseAsJson]
      public string ReplicatePolymirWork(JObject o) {
         var type = typeof(PolymirTransport);

         foreach( var prop in type.GetProperties() ) {
            if( Attribute.GetCustomAttribute(prop, typeof(PolymirTransport.isWorkAttribute)) != null ) {
               var name = prop.Name;
               var worktype = WorkType.GetPolymirWork(name);
               if( worktype == null ) worktype = new WorkType();
               worktype.OwnerId = 1;
               worktype.ReplicationId = name;
               worktype.ReplicationSource = ReplicationSource.dbfPolymir;
               worktype.WorkTypeName = name;
               worktype.WorkUnitId = 1;

               worktype.SaveAndFlush();
            }
         }

         return "";

      }

      [DirectMethod]
      [ParseAsJson]
      public string ReplicatePolymirRoute(JObject o) {


         ISession dbfSession = buildCustomSession(DBFSettings);
         int counter = 0;
         var PolymirWays = dbfSession.QueryOver<PolymirWay>().List<PolymirWay>();


         using( new SessionScope(FlushAction.Never) ) {

            foreach( var way in PolymirWays ) {

               way.P_NAZN = Decode(way.P_NAZN.Trim());
               way.P_OTPR = Decode(way.P_OTPR.Trim());

               RoutePoint dest;
               RoutePoint source;

               source = RoutePoint.FindFirst(Expression.Where<RoutePoint>(x => x.RoutePointName == way.P_OTPR));
               if( source == null ) {
                  source = new RoutePoint() {
                     RoutePointName = way.P_OTPR
                  };
                  source.Save();
               }

               dest = RoutePoint.FindFirst(Expression.Where<RoutePoint>(x => x.RoutePointName == way.P_NAZN));
               if( dest == null ) {
                  dest = new RoutePoint() {
                     RoutePointName = way.P_NAZN
                  };
                  dest.Save();
               }

               Route route = Route.FindFirst(Expression.Where<Route>(x => x.DestinationPoint == dest && x.SourcePoint == source));
               if( route == null ) {
                  new Route() {
                     DestinationPoint = dest,
                     SourcePoint = source,
                     Distance = way.RAS
                  }.Save();
               }

               counter++;
               if( counter % 50 == 0 ) {
                  SessionScope.Current.Flush();
               }
            }
            SessionScope.Current.Flush();
         }

         return "";

      }

      [DirectMethod]
      [ParseAsJson]
      public string ReplicatePolymirCustomer(JObject o) {

         var dbfSession = buildCustomSession(DBFSettings);
         var PolymirCustomers = dbfSession.QueryOver<dbf.PolymirCustomer>().List();

         foreach( var PolymirCustomer in PolymirCustomers ) {

            var id = Int16.Parse(PolymirCustomer.SHZ);
            var cus = Customer.FindFirst(Expression.Where<Customer>(x => x.ReplicationId == id && x.ReplicationSource == ReplicationSource.dbfPolymir));

            if( cus == null ) {
               new Customer() {
                  CustomerName = PolymirCustomer.NAIMP,
                  CustomerName1 = PolymirCustomer.NAIMP1,
                  SHZ = PolymirCustomer.SHZ,
                  OwnerId = 1,
                  CostCode = PolymirCustomer.SHPZ,
                  ReplicationId = id,
                  ReplicationSource = ReplicationSource.dbfPolymir
               }.SaveAndFlush();
            }
            else {
               cus.SHZ = PolymirCustomer.SHZ;
               //cus.OwnerId = 1;
               // cus.CustomerName = PolymirCustomer.NAIMP;
               // cus.CustomerName1 = PolymirCustomer.NAIMP1;
               // cus.CostCode = PolymirCustomer.SHPZ;
               // cus.ReplicationId = id;
               // cus.ReplicationSource = ReplicationSource.dbfPolymir;
            }

         }


         return "";
      }

      [DirectMethod]
      [ParseAsJson]
      public string ReplicatePolymirDrivers(JObject o) {
         ISession dbfSession = buildCustomSession(DBFSettings, "Transport.OtherModels.dbf");
         IList<PolymirDrivers> PolDrivers = new List<PolymirDrivers>();
         IList<Transport.OtherModels.tdbf.Driver> NaftanDrivers = new List<Transport.OtherModels.tdbf.Driver>();

         int counter = 0;
         string errors = "";

         try {
            PolDrivers = dbfSession.QueryOver<PolymirDrivers>().List();

            foreach( var driver in PolDrivers ) {

               if( driver.TABN <= 0 ) continue;

               var employee = Employee.FindOne(Expression.Where<Employee>(x => x.DSC == 2 && x.EmployeeNumber == driver.TABN.ToString()));

               if( employee != null ) {

                  var d = Driver.FindOne(Expression.Where<Driver>(x => x.Employee == employee));

                  if( d != null ) {

                  }
                  else {
                     d = new Driver() {
                        Employee = employee,
                        OwnerId = 1
                     };
                     d.Save();
                  }


                  var licence = DriverLicence.FindOne(Expression.Where<DriverLicence>(x => x.Driver == d && x.Number == driver.NVU));
                  if( licence == null && driver.NVU.Trim() != "" ) {
                     new DriverLicence() {
                        Driver = d,
                        Number = driver.NVU,
                        DateOfTerm = DateTime.Now.AddYears(5)
                     }.Save();
                  }
               }
               else {
                  errors += JsonConvert.SerializeObject(driver);
               }

               counter++;
               if( counter % 50 == 0 ) {
                  SessionScope.Current.Flush();
               }

            }

         }
         catch( Exception ex ) {
            var z = ex; return ex.Message.ToString();
         }
         finally { SessionScope.Current.Flush(); dbfSession.Close(); }
         return "";
      }

            #endregion


      #region подкачки dbsrv2



      static Dictionary<int, int> dbsrv2TOdb2FuelMap = new Dictionary<int, int> {
         {1,1},
         {4,2},
         {3,3},
         {17,4},
         {42,5},
         {43,7}
      };

      static Dictionary<int, int> db2TOdbsrv2FuelMap = new Dictionary<int, int> {
         {1,1},
         {2,4},
         {3,3},
         {4,17},
         {5,42},
         {7,43}
      };

       /*
      [DirectMethod]
      [ParseAsJson]
      public string ReplicateOtherRefuelling(JObject o) {

         ISession tdbfSession = buildCustomSession(TDBFSettings);
         var otherRefuelling = tdbfSession.QueryOver<Tdbf.OtherRefuelling>().Where(x=>x.refuellingDate>DateTime.Now.AddMonths(-3)).OrderBy(x => x.recordId).Asc.List();
         int counter = 0;

         using( new SessionScope(FlushAction.Never) ) {

            foreach( var rec in otherRefuelling ) {

               if( dbsrv2TOdb2FuelMap.ContainsKey(rec.fuelId) ) {

                  var employee = Employee.FindFirst(Expression.Where<Employee>(x => x.id_men == rec.personId));
                  if( employee != null ) {

                     var refuelling = Refuelling.FindFirst(Expression.Where<Refuelling>(x => x.ReplicationId == rec.recordId && x.ReplicationSource == ReplicationSource.dbsrv2));
                     if( refuelling == null ) refuelling = new Refuelling();

                     refuelling.ReplicationSource = ReplicationSource.dbsrv2;
                     refuelling.ReplicationId = rec.recordId;
                     refuelling.EmployeeId = employee.EmployeeId;
                     refuelling.FuelId = dbsrv2TOdb2FuelMap[rec.fuelId];
                     refuelling.Quantity = rec.quantity;
                     refuelling.RefuellingDate = rec.refuellingDate;
                     refuelling.SheetNumber = rec.oSheetNumber;

                     refuelling.Save();
                  }
               }

               counter++; if( counter % 500 == 0 ) SessionScope.Current.Flush();

            }
            SessionScope.Current.Flush();
         }

         return "";
      }
       */

       /*
      [DirectMethod]
      [ParseAsJson]
      public string ReplicateDB2Refuelling(JObject o) {


         var sheets = waybillsRefuellingSheets.FindAll(Expression.Where<waybillsRefuellingSheets>(x => x.refuellingDate > DateTime.Now.AddDays(-1) && x.RefuellingPlaceId == 6));


         foreach( var s in sheets ) {
            var f = Tdbf.waybillsRefuellingSheets.Exists<int>(s.sheetNumber);

            if( !f && db2TOdbsrv2FuelMap.ContainsKey(s.fuelId) ) {
               var _sheet = new Tdbf.waybillsRefuellingSheets() {
                  fuelId = db2TOdbsrv2FuelMap[s.fuelId],
                  refuellingDate = s.refuellingDate,
                  sheetNumber = s.sheetNumber,
                  sheetState = s.sheetState,
                  groupAccId = s.groupAccId 
               };
               _sheet.CreateAndFlush();
            }

         }
        


         var refuelling = VehicleRefuelling.FindAll(Expression.Where<VehicleRefuelling>(x => x.RefuellingDate > DateTime.Now.AddDays(-1) && x.RefuellingPlaceId == 6));


         foreach( var r in refuelling ) {

            var f = Tdbf.waybillsRefuelling.FindFirst(Expression.Where<Tdbf.waybillsRefuelling>(x => x.correctionId == r.RefuellingId ));

            int GarageNumber = 0;

            if( r.VehicleId != null ) {

                  GarageNumber = new ScalarQuery<int>(typeof(Vehicle),
                          @" SELECT c.GarageNumber FROM Car as c
                     WHERE c.VehicleId = ?",
                          r.VehicleId
                       ).Execute();
               
            }


            if( f == null ) {
               f = new Tdbf.waybillsRefuelling() {
                  correctionId = r.RefuellingId
               };
            }

            f.sheetNumber = r.SheetNumber;
            f.refuellingDate = r.RefuellingDate;
            f.ownerId = 1;
            f.waybillNumber = r.WaybillId.Value;
            f.garageNumber = GarageNumber;
            f.fuelId = db2TOdbsrv2FuelMap[r.FuelId];
            f.refuellingId = 0;
            f.quantity = r.Quantity;
            try
            {
                f.SaveAndFlush();
            }
             catch(Exception ex){
                var z = 1;
                throw ex;
             }

         }
                  
         var _refuelling = Tdbf.waybillsRefuelling.FindAll(Expression.Where<Tdbf.waybillsRefuelling>(x => x.refuellingDate > DateTime.Now.AddDays(-1) && x.refuellingId == 0));


         foreach( var _r in _refuelling ) {

            if( _r.correctionId != null ) {
               if( !VehicleRefuelling.Exists<int>(_r.correctionId.Value) ) {
                  _r.DeleteAndFlush();
               }
            }
         }


         SessionScope.Current.Flush();


         return "";

      }
       */



      [DirectMethod]
      [ParseAsJson]
      public string ReplicateWaybillType(JObject o) {
         ISession tdbfSession = buildCustomSession(TDBFSettings);
         var wt = tdbfSession.QueryOver<Tdbf.WaybillType>().List();
         foreach( var rec in wt ) {
            var wbt = WaybillType.FindFirst(Expression.Where<WaybillType>(x => x.ReplicationId == rec.waybillTypeId && x.ReplicationSource == ReplicationSource.dbsrv2));
            if( wbt == null ) {
               wbt = new WaybillType() {
                  ReplicationSource = ReplicationSource.dbsrv2,
                  ReplicationId = rec.waybillTypeId
               };
            }
            wbt.WaybillTypeName = rec.waybillTypeName;
            wbt.SaveAndFlush();
         }
         return "";
      }

      [DirectMethod]
      [ParseAsJson]
      public string ReplicateSchedule(JObject o) {

         ISession tdbfSession = buildCustomSession(TDBFSettings);
         var schedules = tdbfSession.QueryOver<Tdbf.Schedule>().List();

         foreach( var sch in schedules ) {
            var s = Schedule.FindFirst(Expression.Where<Schedule>(x => x.ReplicationId == sch.scheduleId && x.ReplicationSource == ReplicationSource.dbsrv2));
            if( s == null ) s = new Schedule();

            s.ReplicationSource = ReplicationSource.dbsrv2;
            s.ReplicationId = sch.scheduleId;
            s.ScheduleName = sch.scheduleName;

            s.SaveAndFlush();
         }

         return "";

      }

      [DirectMethod]
      [ParseAsJson]
      public string ReplicateDepartment(JObject o) {

         ISession tdbfSession = buildCustomSession(TDBFSettings);

         var sub = tdbfSession.QueryOver<Tdbf.TransportSubOwner>().List();

         foreach( var s in sub ) {

            var c = Department.FindFirst(Expression.Where<Department>(x => x.ReplicationId == s.subOwnerId && x.ReplicationSource == ReplicationSource.dbsrv2));

            if( c == null ) {
               new Department() {
                  DepartmentName = s.subOwnerName,
                  OwnerId = s.ownerId == null ? 1 : s.ownerId.Value,
                  ReplicationId = s.subOwnerId,
                  ReplicationSource = ReplicationSource.dbsrv2
               }.SaveAndFlush();
            }
            else {
               c.ReplicationId = s.subOwnerId;
               c.ReplicationSource = ReplicationSource.dbsrv2;
               c.DepartmentName = s.subOwnerName;
               c.OwnerId = s.ownerId == null ? 1 : s.ownerId.Value;
            }

         }

         return "";
      }

      [DirectMethod]
      [ParseAsJson]
      public string ReplicateCustomer(JObject o) {

         ISession tdbfSession = buildCustomSession(TDBFSettings);
         var tdbfCustomers = tdbfSession.QueryOver<Tdbf.Customer>().Where(x => x.ownerId==1).List();
         int counter = 0;

          /*
         using( new SessionScope(FlushAction.Never) ) {
            foreach( var c in tdbfCustomers ) {

               var customer = Customer.FindFirst(
                     Expression.Where<Customer>(
                        x =>
                           x.ReplicationId == c.customerId &&
                           x.ReplicationSource == ReplicationSource.dbsrv2
                     )
               );

               if( customer == null ) {
                  customer = new Customer() {
                     ReplicationId = c.customerId,
                     ReplicationSource = ReplicationSource.dbsrv2
                  };
               }

               customer.CustomerName = c.customerName;
               customer.OwnerId = c.ownerId;
               customer.CostCode = c.inputsDebit;
               customer.notActual = c.hide != null && c.hide.Value == 1;

               customer.Save();

               counter++;
               if( counter % 50 == 0 ) {
                  SessionScope.Current.Flush();
               }

            }
           * */

          using (new SessionScope(FlushAction.Never))
          {
              foreach (var c in Customer.FindAll().Where(x=>x.ReplicationId==null))
              {
                  var newCustomer = new Tdbf.Customer()
                  {
                      customerName = c.CustomerName,
                      hide = 0,
                      ownerId = 1,
                      inputsDebit = c.CostCode,
                      excessCredit                      = "",
                      excessDebit                      = ""

                  };

                  tdbfSession.SaveOrUpdate(newCustomer);

                  c.ReplicationSource = ReplicationSource.dbsrv2;
                  c.ReplicationId = newCustomer.customerId;
                  c.Update();
              }


          SessionScope.Current.Flush();
         }

         return "";

      }

      [DirectMethod]
      [ParseAsJson]
      public string ReplicateTransportFacilities(JObject o) {

         ISession tdbfSession = buildCustomSession(TDBFSettings);
         var Cars = tdbfSession.QueryOver<Tdbf.transportFacility>().List();


         var Departments = Department.FindAll();
         var DepartmentsMap = new Dictionary<int, Department>();
         foreach( var d in Departments ) {
            if( d.ReplicationId != null && d.ReplicationSource == ReplicationSource.dbsrv2 ) {
               DepartmentsMap.Add(d.ReplicationId.Value, d);
            }
         }

         var GroupsAcc = RefuellingGroup.FindAll();
         var GroupsAccMap = new Dictionary<int, RefuellingGroup>();
         foreach( var d in GroupsAcc ) {
            GroupsAccMap.Add(d.RefuellingGroupId, d);
         }

         var Customers = Customer.FindAll();
         var CustomerMap = new Dictionary<int, Customer>();
         foreach( var d in Customers ) {
            if( d.ReplicationId != null && d.ReplicationSource == ReplicationSource.dbsrv2 ) {
               CustomerMap.Add(d.ReplicationId.Value, d);
            }
         }

         var BodyTypes = BodyType.FindAll();
         var BodyTypeMap = new Dictionary<int, BodyType>();
         foreach( var bt in BodyTypes ) {
            if( bt.ReplicationId != null && bt.ReplicationSource == ReplicationSource.dbsrv2 ) {
               BodyTypeMap.Add(bt.ReplicationId.Value, bt);
            }
         }


         var Trailers = Trailer.FindAll();
         var TrailersMap = new Dictionary<int, Trailer>();
         foreach( var d in Trailers ) {
            if( d.GetType() == typeof(Trailer) && d.ReplicationId != null && d.ReplicationSource == ReplicationSource.dbsrv2 ) {
               TrailersMap.Add(d.ReplicationId.Value, (Trailer)d);
            }
         }

         var PackageTypes = WaybillPackageType.FindAll();
         var PackageTypesMap = new Dictionary<int, WaybillPackageType>();
         foreach( var p in PackageTypes ) {
            if( p.GetType() == typeof(WaybillPackageType) && p.ReplicationId != null && p.ReplicationSource == ReplicationSource.dbsrv2 ) {
               PackageTypesMap.Add(p.ReplicationId.Value, (WaybillPackageType)p);
            }
         }

         var WaybillTypes = WaybillType.FindAll();
         var WaybillTypesMap = new Dictionary<int, WaybillType>();
         foreach( var d in WaybillTypes ) {
            if( d.ReplicationId != null && d.ReplicationSource == ReplicationSource.dbsrv2 ) {
               WaybillTypesMap.Add(d.ReplicationId.Value, d);
            }
         }




         var counter = 0;
         using( new SessionScope(FlushAction.Never) ) {
            foreach( var car in Cars ) {

               int? DepartmentId = null;
               if( car.subOwnerId != null && DepartmentsMap.ContainsKey(car.subOwnerId.Value) ) {
                  DepartmentId = DepartmentsMap[car.subOwnerId.Value].DepartmentId;
               }

               int? RefuellingGroupId = null;
               if( car.groupAccId != null && GroupsAccMap.ContainsKey(car.groupAccId.Value) ) {
                  RefuellingGroupId = GroupsAccMap[car.groupAccId.Value].RefuellingGroupId;
               }

               int? BodyTypeId = null;
               if( car.bodyTypeId != null && BodyTypeMap.ContainsKey(car.bodyTypeId.Value) ) {
                  BodyTypeId = BodyTypeMap[car.bodyTypeId.Value].BodyTypeId;
               }

               Customer customer = null;
               if( car.customerId != null && CustomerMap.ContainsKey(car.customerId.Value) ) {
                  customer = CustomerMap[car.customerId.Value];
               }


               int? TrailerId = null;
               if( car.trailerGarageNumber != null && TrailersMap.ContainsKey(car.trailerGarageNumber.Value) ) {
                  TrailerId = TrailersMap[car.trailerGarageNumber.Value].VehicleId;
               }

               int? WaybillTypeId = null;
               if( car.waybillTypeId != null && WaybillTypesMap.ContainsKey(car.waybillTypeId.Value) ) {
                  WaybillTypeId = WaybillTypesMap[car.waybillTypeId.Value].WaybillTypeId;
               }

               int? PackageTypeId = null;
               if( car.waybillPackageId != null && PackageTypesMap.ContainsKey(car.waybillPackageId.Value) ) {
                  PackageTypeId = PackageTypesMap[car.waybillPackageId.Value].PackageTypeId;
               }


               string StartWork = "";
               string EndWork = "";

               if( car.shiftBegin > 0 ) {

                  var hh = (int)decimal.Truncate(car.shiftBegin);
                  var mm = (int)decimal.Truncate(( car.shiftBegin - hh ) * 100);

                  TimeSpan ts = new TimeSpan(hh, mm, 0);

                  var hh2 = (int)decimal.Truncate(car.shiftDuration);
                  var mm2 = (int)decimal.Truncate(( car.shiftDuration - hh2 ) * 100);

                  TimeSpan ts2 = ts.Add(new TimeSpan(hh2, mm2, 0));

                  StartWork = String.Format("{0}:{1}",
                     ts.Hours == 0 ? "00" : ts.Hours.ToString("##"),
                     ts.Minutes == 0 ? "00" : ts.Minutes.ToString("##")
                  );
                  EndWork = String.Format("{0}:{1}",
                     ts2.Hours == 0 ? "00" : ts2.Hours.ToString("##"),
                     ts2.Minutes == 0 ? "00" : ts2.Minutes.ToString("##")
                  );


               }

               var t = (FullCar)FullCar.FindFirst(Expression.Where<FullCar>(x => x.ReplicationId == car.ReplicationId && x.ReplicationSource == ReplicationSource.dbsrv2));
               if( t == null ) {
                  t = new FullCar() {
                     ReplicationSource = ReplicationSource.dbsrv2,
                     ReplicationId = car.ReplicationId
                  };
               }
               /*
               t.GarageNumber = car.garageNumber;
               t.OwnerId = car.ownerId;
               t.BodyNumber = car.bodyNo;
               t.BodyTypeId = BodyTypeId;
               t.CapacityTonns = car.capacityTonns;
               t.DepartmentId = DepartmentId;
               t.FullMass = car.fullMass;
               t.RefuellingGroupId = RefuellingGroupId;
               t.Height = car.dimensionHeight;
               t.InventoryNumber = car.inventory;
               t.Length = car.dimensionLength;
               t.MakeYear = car.makeYear;
               t.Model = car.model;
               t.FondModel = car.fondModel;
               t.RegEnd = car.RegFinish;
               t.RegistrationNumber = car.registrationNumber;
               t.RegSertificate = car.RegSertificate;
               t.SelfMass = car.selfMass;
               t.ServiceDocNumber = car.serviceDocNo;
               t.Width = car.dimensionWidth;
               t.WriteOffDate = car.writeOff;
               t.CoolantVolume = car.coolVol;
               t.Customer = customer;
               t.EndWork = EndWork;
               t.StartWork = StartWork;
               t.EngineNumber = car.engineNo;
               t.EngineOilVolume = car.engineOilVol;
               t.EnginePower = car.power;
               t.EngineVolume = car.engineVol;
               t.FuelVolume = car.fuelVol;
               t.HydraulicOilVolume = car.hydraVol;
               t.TrailerId = TrailerId;
               t.WaybillTypeId = WaybillTypeId;
                 
                
               t.RefuellingGroupId = RefuellingGroupId;
               t.PackageTypeId = PackageTypeId;
               

               t.CostCode = car.inputsDebit;
                */




               t.Save();

               counter++;
               if( counter % 50 == 0 ) {
                  SessionScope.Current.Flush();
               }
            }
            SessionScope.Current.Flush();
         }
         return "";
      }

      [DirectMethod]
      [ParseAsJson]
      public string ReplicateTransportTrailers(JObject o) {

         ISession tdbfSession = buildCustomSession(TDBFSettings);

         var Trailers = tdbfSession.QueryOver<Tdbf.transportTrailer>().List();

         var counter = 0;
         using( new SessionScope(FlushAction.Never) ) {
            foreach( var trailer in Trailers ) {

               var t = FullTrailer.FindFirst(Expression.Where<FullTrailer>(x => x.ReplicationId == trailer.trailerGarageNumber && x.ReplicationSource == ReplicationSource.dbsrv2));
               if( t == null ) {
                  t = new FullTrailer() {
                     ReplicationSource = ReplicationSource.dbsrv2,
                     ReplicationId = trailer.trailerGarageNumber
                  };
               }

               t.BodyNumber = trailer.bodyNo;
               t.CapacityTonns = trailer.capacityTonns;
               t.OwnerId = trailer.OwnerId.Value;
               t.Model = trailer.model;
               t.MakeYear = trailer.makeYear;
               t.Length = trailer.dimensionLength;
               t.InventoryNumber = trailer.inventory;
               t.Width = trailer.dimensionWidth;
               t.ServiceDocNumber = trailer.serviceDocNo;
               t.SelfMass = trailer.weight;
               t.FullMass = trailer.fullWeight;
               t.GarageNumber = trailer.trailerGarageNumber;
               t.Height = trailer.dimensionHeight;
               t.RegEnd = trailer.regfinish;
               t.RegistrationNumber = trailer.registrationNumber;
               t.RegSertificate = trailer.regSertificate;
               t.DepartmentId = 9;

               t.Save();

               counter++; if( counter % 50 == 0 ) { SessionScope.Current.Flush(); }

            }

            SessionScope.Current.Flush();


         }

         return "";
      }

      [DirectMethod]
      [ParseAsJson]
      public string ReplicateGroupAcc(JObject o) {

         ISession tdbfSession = buildCustomSession(TDBFSettings);

         var groups = tdbfSession.QueryOver<Tdbf.groupAcc>().List();

         var counter = 0;
         using( new SessionScope(FlushAction.Never) ) {
            foreach( var group in groups ) {

               var refuellingGroup = RefuellingGroup.FindFirst(Expression.Where<RefuellingGroup>(x => x.RefuellingGroupId == group.groupAccId));
               if( refuellingGroup == null ) {
                  refuellingGroup = new RefuellingGroup() {
                     RefuellingGroupId = group.groupAccId
                  };
               }

               refuellingGroup.debit = group.debit;
               refuellingGroup.groupAccCode = group.groupAccCode;
               refuellingGroup.oilDebit = group.oilDebit;
               refuellingGroup.oilReplacingReport = group.oilReplacingReport;
               refuellingGroup.RefuellingGroupName = group.groupAccName;


               refuellingGroup.SaveAndFlush();

            }
         }

         return "";
      }

      [DirectMethod]
      [ParseAsJson]
      public string ReplicateIncreases(JObject o) {

         ISession tdbfSession = buildCustomSession(TDBFSettings);

         var increases = tdbfSession.QueryOver<Tdbf.normsIncrease>().List();

         var counter = 0;
         using( new SessionScope(FlushAction.Never) ) {
            foreach( var i in increases ) {

               var increase = Increase.FindFirst(Expression.Where<Increase>(x => x.ReplicationId == i.normIncreaseId.ToString() && x.ReplicationSource == ReplicationSource.dbsrv2));
               if( increase == null ) {
                  increase = new Increase() {
                     ReplicationSource = ReplicationSource.dbsrv2,
                     ReplicationId = i.normIncreaseId.ToString()
                  };
               }

               increase.Prcn = (short)i.increase;
               increase.IncreaseName = i.normIncreaseName;
               increase.SaveAndFlush();

               counter++; if( counter % 40 == 0 ) { SessionScope.Current.Flush(); }

            }

            SessionScope.Current.Flush();
         }

         return "";

      }


      [DirectMethod]
      [ParseAsJson]
      public string ReplicateRefuellingPlace(JObject o) {

         var places = new PetaPoco.Database("dbsrv2").Query<Tdbf.Refuelling>("select * from Refuelling");

         foreach( var place in places ) {
            var p = RefuellingPlace.FindFirst(Expression.Where<RefuellingPlace>(x => x.ReplicationId == place.refuellingId && x.ReplicationSource == ReplicationSource.dbsrv2));
            if( p == null ) {
               p = new RefuellingPlace() {
                  ReplicationId = place.refuellingId,
                  ReplicationSource = ReplicationSource.dbsrv2
               };
            }

            p.RefuellingPlaceName = place.refuellingName;
            p.OwnerId = 1;
            p.Save();
         }

         return "";

      }

      [DirectMethod]
      [ParseAsJson]
      public string ReplicateWaybills(JObject o) {

         var GarageNumber = o["GarageNumber"].Value<int>();

         var schedule = Schedule.FindAll();
         var scheduleMap = new Dictionary<int, Schedule>();
         foreach( var sch in schedule ) {
            if( sch.ReplicationSource == ReplicationSource.dbsrv2 && !scheduleMap.ContainsKey(sch.ReplicationId.Value) ) {
               scheduleMap.Add(sch.ReplicationId.Value, sch);
            }
         }

         var waybilltype = WaybillType.FindAll();
         var waybilltypeMap = new Dictionary<int, WaybillType>();
         foreach( var wt in waybilltype ) {
            if( wt.ReplicationSource == ReplicationSource.dbsrv2 && !waybilltypeMap.ContainsKey(wt.ReplicationId.Value) ) {
               waybilltypeMap.Add(wt.ReplicationId.Value, wt);
            }
         }

         var cars = Car.FindAll(Order.Asc("GarageNumber"), Expression.Where<Car>(x => x.ReplicationSource == ReplicationSource.dbsrv2 && x.GarageNumber > GarageNumber && x.OwnerId == 1));


         return "";

      }

      
      [DirectMethod]
      [ParseAsJson]
      public string ReplicateWaybill(JObject o) {

         ISession tdbfSession = buildCustomSession(TDBFSettings);
         var OwnerId = 1;
         var CarCache = new Dictionary<int, BaseVehicle>();

         Func<int, BaseVehicle> getCar = delegate(int garagenumber) {

            if( CarCache.ContainsKey(garagenumber) ) {
               return CarCache[garagenumber];
            }

            var Car = BaseVehicle.FindFirst(Expression.Where<BaseVehicle>(x => x.ReplicationSource == ReplicationSource.dbsrv2 && x.GarageNumber == garagenumber && x.OwnerId == OwnerId));
            CarCache.Add(garagenumber, Car);

            return Car;

         };


         var waybills = tdbfSession.QueryOver<Tdbf.waybills>().Where(x => x.ownerId == OwnerId).OrderBy(x => x.WaybillId).Asc().Skip(10000).Take(10000).List();



         var schedule = Schedule.FindAll();
         var scheduleMap = new Dictionary<int, Schedule>();
         foreach( var sch in schedule ) {
            if( sch.ReplicationSource == ReplicationSource.dbsrv2 && !scheduleMap.ContainsKey(sch.ReplicationId.Value) ) {
               scheduleMap.Add(sch.ReplicationId.Value, sch);
            }
         }


         var waybilltype = WaybillType.FindAll();
         var waybilltypeMap = new Dictionary<int, WaybillType>();
         foreach( var wt in waybilltype ) {
            if( wt.ReplicationSource == ReplicationSource.dbsrv2 && !waybilltypeMap.ContainsKey(wt.ReplicationId.Value) ) {
               waybilltypeMap.Add(wt.ReplicationId.Value, wt);
            }
         }



         var counter = 0;
         using( new SessionScope(FlushAction.Never) ) {

            foreach( var waybill in waybills ) {
               try {
                  var w = Waybill.FindFirst(Expression.Where<Waybill>(x => x.ReplicationId == waybill.ReplicationId.ToString() && x.ReplicationSource == ReplicationSource.dbsrv2));

                  if( w == null ) {
                     w = new Waybill() {
                        ReplicationSource = ReplicationSource.dbsrv2,
                        ReplicationId = waybill.ReplicationId.ToString()
                     };

                  }

                  w.Car = getCar(waybill.garageNumber);

                  if( w.Car == null ) {
                     var zz = 0;
                  }

                  w.FormNumber = waybill.formNumber;
                  w.DepartureDate = waybill.departureDate == null ? DateTime.Parse("01.01.1990") : waybill.departureDate.Value;
                  w.ReturnDate = waybill.returnDate == null ? DateTime.Parse("01.01.1990") : waybill.returnDate.Value;

                  if( waybill.scheduleId != null && scheduleMap.ContainsKey(waybill.scheduleId.Value) ) {
                     w.ScheduleId = scheduleMap[waybill.scheduleId.Value].ScheduleId;
                  }

                  if( waybill.waybillTypeId != null && waybilltypeMap.ContainsKey(waybill.waybillTypeId.Value) ) {
                     w.WaybillTypeId = waybilltypeMap[waybill.waybillTypeId.Value].WaybillTypeId;
                  }

                  w.Shift = waybill.shift == null ? (short)1 : ( waybill.shift.Value == 0 ? (short)1 : waybill.shift.Value );
                  w.Way = waybill.way;
                  w.PackageId = waybill.waybillPackageNumber;

                  if( waybill.accMonth != null && waybill.accYear != null ) {
                     w.AccPeriod = waybill.accYear * 100 + waybill.accMonth;
                  }

                  if( w.WaybillId == 0 ) {
                     w.Position = Waybill.GetMaxPosition(w.Car.VehicleId);
                     w.WaybillState = 2;
                     w.Save();
                     w.SetPosition();
                  };

                  w.Update();


                  #region Счётчики

                  if( waybill.departureKm != null && waybill.departureKm.Value != 0 ) {

                     var counterId = 1;

                     var cnt = WaybillCounter.FindFirst(Expression.Where<WaybillCounter>(x => x.WaybillId == w.WaybillId && x.CounterId == counterId));
                     if( cnt == null ) {
                        cnt = new WaybillCounter() {
                           CounterId = counterId,
                           WaybillId = w.WaybillId
                        };
                        cnt.Save();
                     }

                     cnt.isBroken = !( waybill.odometerInvalid == null || waybill.odometerInvalid.Value == false );
                     cnt.Departure = waybill.departureKm;
                     cnt.Return = waybill.returnKm;
                     cnt.Update();
                  }

                  if( waybill.departureMh != null && waybill.departureMh.Value != 0 ) {

                     var counterId = 2;

                     var cnt = WaybillCounter.FindFirst(Expression.Where<WaybillCounter>(x => x.WaybillId == w.WaybillId && x.CounterId == counterId));
                     if( cnt == null ) {
                        cnt = new WaybillCounter() {
                           CounterId = counterId,
                           WaybillId = w.WaybillId
                        };
                        cnt.Save();
                     }

                     cnt.isBroken = !( waybill.mhmeterInvalid != null || waybill.mhmeterInvalid.Value == false );
                     cnt.Departure = waybill.departureMh;
                     cnt.Return = waybill.returnMh;
                     cnt.Update();
                  }

                  #endregion

                  /*
                  #region Остатки топлива

                  foreach( var remain in waybill.waybillsFuelRemains ) {
                     if (dbsrv2TOdb2FuelMap.ContainsKey(remain.fuelId)){
                        var fid = dbsrv2TOdb2FuelMap[remain.fuelId];

                        var rem = WaybillFuelRemain.FindFirst(Expression.Where<WaybillFuelRemain>(x => x.WaybillId == w.WaybillId && x.FuelId == fid));
                        if( rem == null ) {
                           rem = new WaybillFuelRemain() {
                              WaybillId=w.WaybillId,
                              FuelId = fid
                           };
                        }

                        rem.DepartureRemain = remain.departureRemain;
                        rem.ReturnRemain = remain.returnRemain;

                        rem.Save();
                     }
                         
                  }

                  #endregion
                  
                  #region Водители

                  foreach( var driver in waybill.drivers ) {
                     var db2Driver = Driver.FindFirst(Expression.Where<Driver>(x=>x.ReplicationId==driver.DriverId && x.ReplicationSource == ReplicationSource.dbsrv2));
                     if(db2Driver!=null){
                        var d = WaybillDriver.FindFirst(Expression.Where<WaybillDriver>(x => x.Driver == db2Driver && x.WaybillId == w.WaybillId));
                        if( d == null ) {
                           new WaybillDriver() {
                              Driver = db2Driver,
                              WaybillId = w.WaybillId
                           }.Save();
                        }
                     }                     
                  }

                  foreach( var driver in waybill.driversResponse ) {
                     var db2Driver = Driver.FindFirst(Expression.Where<Driver>(x => x.ReplicationId == driver.DriverId && x.ReplicationSource == ReplicationSource.dbsrv2));
                     if( db2Driver != null ) {

                        w.ResponsibleDriver = db2Driver;
                        w.Save();

                        break;
                     }
                  }




                  #endregion
                  */



                  counter++; if( counter % 50 == 0 ) { SessionScope.Current.Flush(); }

               }

               catch( Exception ex ) {
                  var z = ex.Message;
               };
            }


            SessionScope.Current.Flush();
         }

         return "";


      }





      #endregion






      [DirectMethod]
      [ParseAsJson]
      public string ReplicateWork(JObject o) {
         ISession tdbfSession = buildCustomSession(TDBFSettings);

         var FuelNorms = tdbfSession.QueryOver<Tdbf.fuelNorm>().List();

         var counter = 0;
         using( new SessionScope(FlushAction.Never) ) {
            foreach( var norm in FuelNorms ) {
               if( norm.note.Trim() != "" ) {

                  var work = WorkType.FindFirst(Expression.Where<WorkType>(x => x.WorkTypeName == norm.note.Trim()));
                  if( work == null ) {
                     work = new WorkType() {
                        OwnerId = norm.ownerId,
                        WorkTypeName = norm.note.Trim(),
                        WorkUnitId = norm.normType == 1 ? 2 : 1
                     };
                  }
                  work.Save();

               }
               counter++; if( counter % 20 == 0 ) { SessionScope.Current.Flush(); }
            }
            SessionScope.Current.Flush();
         }

         return "";
      }

      [DirectMethod]
      [ParseAsJson]
      public string ReplicateFuelNormIncreases(JObject o) {
         ISession tdbfSession = buildCustomSession(TDBFSettings);

         var FuelNorms = tdbfSession.QueryOver<Tdbf.fuelNorm>().List();

         var counter = 0;
         using( new SessionScope(FlushAction.Never) ) {
            foreach( var norm in FuelNorms ) {

               foreach( var normsex in norm.fuelNormsexes ) {
                  if( normsex.normIncreaseId == null && normsex.description.Trim() != "" ) {
                     var increase = Increase.FindFirst(Expression.Where<Increase>(x => x.IncreaseName == normsex.description && x.Prcn == (short)normsex.extraNormPrcn));
                     if( increase == null ) {
                        increase = new Increase() {
                           IncreaseName = normsex.description,
                           Prcn = (short)normsex.extraNormPrcn
                        };

                        increase.Save();
                     }
                  }

               }

               counter++; if( counter % 50 == 0 ) { SessionScope.Current.Flush(); }
            }
            SessionScope.Current.Flush();
         }

         return "";
      }



      [DirectMethod]
      [ParseAsJson]
      public string ReplicateDriversToTransport(JObject o) {
         ISession tdbfSession = buildCustomSession(TDBFSettings);

         var drivers = tdbfSession.QueryOver<Tdbf.driversToTransport>().List();

         var counter = 0;
         using( new SessionScope(FlushAction.Never) ) {
            foreach( var driver in drivers ) {

               var V = (FullCar)FullCar.FindFirst(Expression.Where<FullCar>(x => x.ReplicationSource == ReplicationSource.dbsrv2 && x.OwnerId == driver.ownerId && x.GarageNumber == driver.garageNumber));
               var D = Driver.FindFirst(Expression.Where<Driver>(x => x.ReplicationId == driver.driverId && x.ReplicationSource == ReplicationSource.dbsrv2));

               if( V != null && D != null ) {

                  var d = VehicleDriver.FindFirst(Expression.Where<VehicleDriver>(x => x.Car.VehicleId == V.VehicleId && x.Driver == D));
                  if( d == null ) {
                     new VehicleDriver() {
                        Car = new BaseVehicle() { VehicleId = V.VehicleId },
                        Driver = D
                     }.Save();
                  }


                  var responseDriver = tdbfSession.QueryOver<Tdbf.driversToResponse>().Where(x => x.driverId == driver.driverId && x.ownerId == driver.ownerId && x.garageNumber == driver.garageNumber);
                  if( responseDriver != null ) {
                     V.ResponsibleDriver = D;
                     V.Save();
                  }

               }

               counter++; if( counter % 20 == 0 ) { SessionScope.Current.Flush(); }
            }
            SessionScope.Current.Flush();
         }

         return "";
      }


      [DirectMethod]
      [ParseAsJson]
      public string ReplicatePackages(JObject o) {
         var waybillPackages = Tdbf.Waybillpackage.FindAll();


         foreach( var waybillPackage in waybillPackages ) {
            var wp = WaybillPackageType.FindFromDbsrv2(waybillPackage.Waybillpackageid);
            if( wp == null ) {
               wp = new WaybillPackageType() {
                  ReplicationSource = ReplicationSource.dbsrv2,
                  ReplicationId = waybillPackage.Waybillpackageid
               };
            }
            wp.OwnerId = waybillPackage.Ownerid;
            wp.PackageTypeName = waybillPackage.Waybillpackagename;
            wp.notActual = !waybillPackage.Using;

            wp.SaveAndFlush();
         }

         return "";
      }

      [DirectMethod]
      [ParseAsJson]
      public string ReplicateBodyType(JObject o) {
         var bodyTypes = Tdbf.Bodytype.FindAll();

         foreach( var bodyType in bodyTypes ) {
            var bt = BodyType.FindFromDbsrv2(bodyType.Bodytypeid);
            if( bt == null ) {
               bt = new BodyType() {
                  ReplicationSource = ReplicationSource.dbsrv2,
                  ReplicationId = bodyType.Bodytypeid
               };
            }
            bt.BodyTypeName = bodyType.Bodytypename;
            bt.SaveAndFlush();
         }

         return "";

      }


      [DirectMethod]
      [ParseAsJson]
      public string ReplicateDriverLicence(JObject o) {

         var licences = Tdbf.Driverslicense.FindAll(Order.Asc("Licenceid"), Expression.Where<Tdbf.Driverslicense>(x => x.Licenceid > 987));
         var counter = 0;

         using( new SessionScope(FlushAction.Never) ) {
            foreach( var dl in licences ) {

               var d = Driver.FindFirst(Expression.Where<Driver>(x => x.ReplicationId == dl.DriverId && x.ReplicationSource == ReplicationSource.dbsrv2));
               if( d != null ) {
                  var l = DriverLicence.FindFromDbsrv2(dl.Licenceid);
                  if( l == null ) {
                     l = new DriverLicence() {
                        ReplicationId = dl.Licenceid,
                        ReplicationSource = ReplicationSource.dbsrv2
                     };
                  }
                  l.Serial = dl.Licenceserial;
                  l.Number = dl.Licencenumber;
                  l.DateOfTerm = dl.Dateofterm < DateTime.Parse("01.01.1990") ? DateTime.Parse("01.01.2000") : dl.Dateofterm;
                  l.Driver = d;

                  l.SaveAndFlush();
               }

               counter++; if( counter % 20 == 0 ) { SessionScope.Current.Flush(); }

            }
            SessionScope.Current.Flush();
         }

         return "";
      }


      [DirectMethod]
      [ParseAsJson]
      public string ReplicateDriverMedical(JObject o) {

         var medical = Tdbf.Driversmedicalcertificate.FindAll();
         var counter = 0;

         using( new SessionScope(FlushAction.Never) ) {
            foreach( var dl in medical ) {

               var d = Driver.FindFirst(Expression.Where<Driver>(x => x.ReplicationId == dl.Driverid && x.ReplicationSource == ReplicationSource.dbsrv2));
               if( d != null ) {
                  var l = DriverMedical.FindFromDbsrv2(dl.Medicalid);
                  if( l == null ) {
                     l = new DriverMedical() {
                        ReplicationId = dl.Medicalid,
                        ReplicationSource = ReplicationSource.dbsrv2
                     };
                  }
                  l.Number = dl.Num.ToString();
                  l.DateOfTerm = dl.Dateofterm < DateTime.Parse("01.01.1990") ? DateTime.Parse("01.01.1990") : dl.Dateofterm;
                  l.Driver = d;

                  l.Save();
               }

               counter++; if( counter % 20 == 0 ) { SessionScope.Current.Flush(); }

            }
            SessionScope.Current.Flush();
         }

         return "";
      }


      [DirectMethod]
      [ParseAsJson]
      public string ReplicateWaybillsPackages(JObject o) {


         var packages = Tdbf.Waybillspackages.FindAll();

         var packTypes = WaybillPackageType.FindAll();

         var packMap = new Dictionary<int, WaybillPackageType>();

         foreach( var type in packTypes ) {
            if( type.ReplicationId != null && type.ReplicationSource == ReplicationSource.dbsrv2 ) {
               packMap.Add(type.ReplicationId.Value, type);
            }
         }

         var counter = 0;

         using( new SessionScope(FlushAction.Never) ) {

            foreach( var pack in packages ) {


               var p = WaybillPackage.FindFromDbsrv2(pack.Waybillpackagenumber);
               if( p == null ) {
                  p = new WaybillPackage() {
                     ReplicationId = pack.Waybillpackagenumber,
                     ReplicationSource = ReplicationSource.dbsrv2
                  };
               }

               if( packMap.ContainsKey(pack.waybillPackageId) ) {
                  p.PackageTypeId = packMap[pack.waybillPackageId].PackageTypeId;
                  p.Save();
               }

               counter++; if( counter % 20 == 0 ) { SessionScope.Current.Flush(); }

            }
            SessionScope.Current.Flush();
         }

         return "";


      }


      [DirectMethod]
      [ParseAsJson]
      public string UpdateBattery(JObject o)
      {

          var bats = Battery.FindAll(Expression.Where<Battery>(x=>x.BatteryId>1222));

          foreach (var bat in bats)
          {
              var moving = BatteryMoving.FindFirst(Order.Desc(Projections.Property<BatteryMoving>(x => x.InstallDate)),
              Expression.Where<BatteryMoving>(
                x => x.BatteryId == bat.BatteryId
               ));

              if (moving == null) continue;

              bat.BatteryMovingId = moving.BatteryMovingId;
              moving.setBatGarageNumber();

          }

          return "";
      }

      [DirectMethod]
      [ParseAsJson]
      public string FixTasks(JObject o)
      {

          var waybills = Waybill.FindAll(Expression.Where<Waybill>(x => x.WaybillState < 2));
          foreach (var waybill in waybills)
          {
              var tasks = WaybillTask.FindAll(Expression.Where<WaybillTask>(x => x.WaybillId == waybill.WaybillId));
              foreach (var task in tasks)
              {
                  if (task.NormConsumptionId != null && task.NormConsumptionId.Value > 0)
                  {
                      try
                      {
                          var taskNorm = Norm.Find(task.NormConsumptionId);
                          var checkNorm =
                              Norm.FindActualNorms(waybill.Car.VehicleId, task.TaskDepartureDate)
                                  .FirstOrDefault(x => x.WorkTypeId == taskNorm.WorkTypeId);

                          task.NormConsumptionId = checkNorm.NormId;
                          task.SaveAndFlush();
                      }
                      catch{}
                  }
              }

          }

          return "";
      }

      [DirectMethod]
      [ParseAsJson]
       public string CalcWaybillsTime(JObject o)
      {
          Waybill[] waybills;
          using (new SessionScope(FlushAction.Never))
          {
              waybills = Waybill.FindAll(Expression.Where<Waybill>(x => x.WaybillState == 2 && x.ReturnDate > DateTime.Parse("01.08.2013")));
              waybills.ForEach(x =>
              {
                  x.ClearWorkingTime();
                  x.CalcWorkingTime();
                  SessionScope.Current.Flush();
              });
          }
          

          return waybills.Count().ToString();
      }

       [DirectMethod]
       [ParseAsJson]
       public string CalcWaybillsWork(JObject o)
       {
           Waybill[] waybills;
           var counter = 0;
           using (new SessionScope(FlushAction.Never))
           {
               waybills = Waybill.FindAll(Expression.Where<Waybill>(x => x.WaybillState == 2 && (x.AccPeriod>201303||x.AccPeriod == null)));
               waybills.ForEach(x =>
               {
                   x.ClearWaybillWork();
                   x.CalcWaybillWork();
                   counter++;
                   if (counter%100 == 0)
                   {
                       SessionScope.Current.Flush();
                   }
               });
               SessionScope.Current.Flush();
           }
           
           return waybills.Count().ToString();
       }

       [DirectMethod]
       [ParseAsJson]
       public string SetRemainsForNaftanService(JObject o)
       {




           var GarageNumberList = new List<int>() { o["g"].Value<int>() };
           
           foreach (var garageNumber in GarageNumberList)
           {
               int number = garageNumber;
               var vehicle =
                   (FullCar)Models.FullCar.FindOne(
                       Restrictions.Where<FullCar>(x => x.GarageNumber == number && x.OwnerId == 1));
               var lasCloseWaybill = Waybill.LastClose(vehicle.VehicleId);

               var w = new Waybill()
               {
                   Car = Car.Find(vehicle.VehicleId),
                   WaybillState = 1,
                   DepartureDate = new DateTime(2014, 09, 30),
                   ReturnDate = new DateTime(2014, 09, 30),
                   WaybillTypeId = vehicle.WaybillTypeId.Value,
                   ScheduleId = 1,
                   Shift = 1,
                   Way = "Передача в Нафтан-Сервис"
               };

               w.Save();

            w.Position = Waybill.GetMaxPosition(w.Car.VehicleId);
            w.WaybillState = 1;
            w.SaveAndFlush();
            w.SetPosition();
               
               lasCloseWaybill.MoveRemains(w,false);

               var remains = WaybillFuelRemain.findByWaybillId(w.WaybillId);

               foreach (var remain in remains)
               {
                   remain.ReturnRemain = 0;

                   if (remain.DepartureRemain != 0)
                   {
                       var refuelling = new VehicleRefuelling()
                       {
                           WaybillId = w.WaybillId,
                           Driver = vehicle.ResponsibleDriver,
                           RefuellingDate = w.ReturnDate,
                           RefuellingPlaceId = 11,
                           FuelId = remain.FuelId,
                           Quantity = remain.DepartureRemain.Value*(-1)
                       };
                       refuelling.SaveAndFlush();
                   }

                   remain.SaveAndFlush();
               }

               var counters = WaybillCounter.findByWaybillId(w.WaybillId);
               foreach (var counter in counters)
               {
                   counter.Return = counter.Departure;
                   counter.SaveAndFlush();
               }
               
                w.DispClose();

           }


           return "";
       }

   }



}
