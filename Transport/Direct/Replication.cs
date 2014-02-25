using System;
using System.Linq;
using System.Text;
using System.Web;
using System.Reflection;
using System.Collections;
using System.Collections.Generic;
using Castle.Core;
using Ext.Direct;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Castle.ActiveRecord;
using Kdn.CommonModels;
using NHibernate;
using NHibernate.Cfg;
using NHibernate.Hql;
using NHibernate.Criterion.Lambda;
using NHibernate.Criterion;
using Kdn.Direct;
using Transport.Models;
using Transport.OtherModels.kdr;
using Transport.OtherModels.dbf;
using Transport.OtherModels.kdrPolymir;
using Farm = Transport.OtherModels.farm;
using Tdbf = Transport.OtherModels.tdbf;
using dbf = Transport.OtherModels.dbf;
using Castle.ActiveRecord.Queries;

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

      }

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
                  waybill.FormSerial = pw.SERIA;
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

      [DirectMethod]
      [ParseAsJson]
      public string ReplicatePolymirTransport(JObject o) {

         var dbfSession = buildCustomSession(DBFSettings);
         var PolymirVehicles = dbfSession.CreateQuery("from PolymirTransport where GAR_N=44").List<PolymirTransport>();

         int departmentId = 27;//Цех 17 полимир.

         foreach( var pVehicle in PolymirVehicles ) {
            var tip = int.Parse(pVehicle.TIP);

            GroupAcc group = GroupAcc.FindFirst(Expression.Where<GroupAcc>(x => x.ReplicationId == tip && x.ReplicationSource == ReplicationSource.dbfPolymir));

            if( tip == 30 || tip == 31 )//Прицепы
            {
               var trailer = FullTrailer.FindFirst(Expression.Where<Trailer>(x => x.ReplicationId == pVehicle.GAR_N && x.ReplicationSource == ReplicationSource.dbfPolymir));

               if( trailer == null ) trailer = new FullTrailer();

               trailer.ReplicationSource = ReplicationSource.dbfPolymir;
               trailer.ReplicationId = pVehicle.GAR_N;
               trailer.PolymirSHU = pVehicle.SHU;
               trailer.GarageNumber = pVehicle.GAR_N;
               trailer.OwnerId = 1;
               trailer.Model = pVehicle.NAIMM.Trim();
               trailer.RegistrationNumber = pVehicle.GOSN.Trim();
               trailer.InventoryNumber = pVehicle.INVN.Trim();
               trailer.WriteOffDate = DateTime.Parse(pVehicle.DS) < DateTime.Parse("01.01.1900") ? null : (DateTime?)DateTime.Parse(pVehicle.DS);
               trailer.WriteOffDate = DateTime.Parse(pVehicle.DS);
               trailer.GroupAccId = ( group == null ) ? null : (int?)group.GroupAccId;
               trailer.DepartmentId = departmentId;
               trailer.CapacityTonns = pVehicle.GR_POD > 0 ? (decimal?)pVehicle.GR_POD : null;
               trailer.SaveAndFlush();
            }

            else {

               var car = (FullCar)FullCar.FindFirst(Expression.Where<FullCar>(x => x.ReplicationId == pVehicle.GAR_N && x.ReplicationSource == ReplicationSource.dbfPolymir));
               if( car == null ) car = new FullCar();

               car.ReplicationSource = ReplicationSource.dbfPolymir;
               car.ReplicationId = pVehicle.GAR_N;
               car.PolymirSHU = pVehicle.SHU;
               car.GarageNumber = pVehicle.GAR_N;
               car.OwnerId = 1;
               car.Model = pVehicle.NAIMM.Trim();
               car.RegistrationNumber = pVehicle.GOSN.Trim();
               car.InventoryNumber = pVehicle.INVN.Trim();
               car.InputDate = DateTime.Parse(pVehicle.DV);
               car.WriteOffDate = DateTime.Parse(pVehicle.DS) < DateTime.Parse("01.01.1900") ? null : (DateTime?)DateTime.Parse(pVehicle.DS);
               car.GroupAccId = ( group == null ) ? null : (int?)group.GroupAccId;
               car.DepartmentId = departmentId;
               car.CapacityTonns = pVehicle.GR_POD > 0 ? (decimal?)pVehicle.GR_POD : null;

               car.SaveAndFlush();

               BaseVehicle V = BaseVehicle.Find(car.VehicleId);

               int FuelId = 0;

               if( pVehicle.SHG == "Б" ) {
                  if( PolymirFuelMap.ContainsKey(pVehicle.TIP_SHG.Trim()) ) {
                     FuelId = PolymirFuelMap[pVehicle.TIP_SHG.Trim()];
                  }
               }
               else if( pVehicle.SHG == "Д" ) {
                  FuelId = 3;
               }


               foreach( var prop in pVehicle.GetType().GetProperties() ) {

                  if( prop.Name == "NOR_OTOP" && pVehicle.NOR_OTOPZ > 0 ) {
                     continue;
                  }

                  #region Надбавки
                  if( Attribute.GetCustomAttribute(prop, typeof(PolymirTransport.isIncreaseAttribute)) != null ) {

                     var val = (decimal)prop.GetValue(pVehicle, null);
                     if( prop.Name == "TRASS" ) val = 0 - val;

                     var incr = Increase.GetPolymirIncrease(prop.Name);

                     if( incr != null && val != 0 && ( val * 100 ) != incr.Prcn ) {
                        var vehicleincrease = VehicleIncrease.FindFirst(Expression.Where<VehicleIncrease>(x => x.Car.VehicleId == car.VehicleId && x.IncreaseId == incr.IncreaseId));
                        if( vehicleincrease == null ) vehicleincrease = new VehicleIncrease();

                        vehicleincrease.IncreaseId = incr.IncreaseId;
                        vehicleincrease.Car = V;
                        vehicleincrease.Prcn = (short)( val * 100 );

                        vehicleincrease.SaveAndFlush();
                     }
                  }

                  #endregion

                  #region Нормы
                  if( Attribute.GetCustomAttribute(prop, typeof(PolymirTransport.isWorkAttribute)) != null ) {

                     decimal val = (decimal)prop.GetValue(pVehicle, null);
                     var work = WorkType.GetPolymirWork(prop.Name);

                     if( work != null && val > 0 ) {
                        var norm = Norm.FindFirst(Expression.Where<Norm>(x => x.Car.VehicleId == car.VehicleId && x.WorkTypeId == work.WorkTypeId));
                        if( norm == null ) norm = new Norm();

                        var workUnit = WorkUnit.Find(work.WorkUnitId);

                        norm.Car = V;
                        norm.WorkTypeId = work.WorkTypeId;
                        norm.isMain = ( prop.Name == "NOR_GOR_L" || prop.Name == "NOR_MC_L" );
                        norm.CounterId = workUnit.CounterId;

                        //если есть NOR_OTOPZ, то основная норма транспорта на газу
                        if( norm.isMain && pVehicle.NOR_OTOPZ > 0 ) {
                           FuelId = 5;
                        }
                        if( FuelId > 0 && !norm.NormFuels.Contains(FuelId) ) {
                           norm.NormFuels.Add(FuelId);
                        }

                        //кондиционер проставляется с нормой постоянно
                        if( pVehicle.KOND > 0 && norm.isMain ) {
                           var increase = Increase.GetPolymirIncrease("KOND");
                           if( !norm.NormIncreases.Contains(increase.IncreaseId) ) {
                              norm.NormIncreases.Add(increase.IncreaseId);
                           }
                        }

                        norm.SaveAndFlush();

                        var cons = NormConsumption.FindFirst(Expression.Where<NormConsumption>(x => x.Consumption == val && x.NormId == norm.NormId));
                        if( cons == null ) cons = new NormConsumption();

                        cons.NormId = norm.NormId;
                        cons.Consumption = val;
                        cons.ConsumptionStartDate = DateTime.Parse("01.01.2013");

                        cons.SaveAndFlush();

                     }
                  }
                  #endregion

               }

               //Водитель
               if( pVehicle.TABN > 0 ) {

                  DetachedCriteria c = DetachedCriteria.For<Driver>()
                     .CreateAlias("Employee", "Employee")
                     .Add(Expression.Where<Driver>(x => x.Employee.DSC == 2 && x.Employee.EmployeeNumber == pVehicle.TABN.ToString()));

                  var driver = Driver.FindFirst(c);

                  if( driver != null ) {

                     var vd = VehicleDriver.FindFirst(Expression.Where<VehicleDriver>(x => x.Car.VehicleId == car.VehicleId && x.Driver == driver));
                     if( vd == null ) {
                        vd = new VehicleDriver();
                     }

                     vd.Driver = driver;
                     vd.Car = V;

                     vd.SaveAndFlush();

                     car.ResponsibleDriver = driver;
                     car.SaveAndFlush();
                  }
               }
            }

         }


         return "";
      }

      
      public string ReplicatePolymirWaybill(JObject o) {

          return "";

         Func<DateTime, decimal, DateTime> convertDate = delegate(DateTime d, decimal time) {
            var hour = (int)decimal.Truncate(time);
            hour = hour > 24 ? 0 : hour;
            var min = time - hour;
            min = min > 60 ? 0 : min;
            int m = min == 0 ? 0 : int.Parse(min.ToString().Remove(0, 2));

            var date = DateTime.Now;
            try {
               date = new DateTime(d.Year, d.Month, d.Day, hour, m, 0);
               return date;
            }
            catch( Exception ex ) {
               throw ( ex );
            }
         };


         var Works = WorkType.FindAll();

         var WorkMap = new Dictionary<string, WorkType>();
         foreach( var w in Works ) {
            if( w.ReplicationId.Length > 0 && w.ReplicationSource == ReplicationSource.dbfPolymir ) {
               WorkMap.Add(w.ReplicationId, w);
            }
         }


         var GN = 85;

         var dbfSession = buildCustomSession(DBFSettings);
         var PolymirWaybills = dbfSession.CreateQuery("from PolymirWaybill where GAR_N=" + GN.ToString()).List<PolymirWaybill>();


         var car = BaseVehicle.FindFirst(Expression.Where<BaseVehicle>(x => x.GarageNumber == GN && x.DepartmentId == 27));

         int cnt = 0;

         var Norms = Norm.FindAll(Expression.Where<Norm>(x => x.Car.VehicleId == car.VehicleId));
         int FuelId = 0;
         var WorkConsumptionMap = new Dictionary<int, int>();

         foreach( var norm in Norms ) {
            if( norm.isMain && norm.NormFuels.Count > 0 ) {
               foreach( int fuelId in norm.NormFuels ) {
                  FuelId = fuelId;
                  break;
               }
               break;
            }
         }

         foreach( var norm in Norms ) {
            foreach( var cons in norm.NormConsumption ) {
               WorkConsumptionMap.Add(norm.WorkTypeId, cons.RecId);
               break;
            }
         }




         foreach( var pWB in PolymirWaybills ) {

            var waybill = Waybill.GetPolymirWaybill(pWB.ReplicationId);
            if( waybill == null ) waybill = new Waybill() {
               ReplicationId = pWB.ReplicationId,
               ReplicationSource = ReplicationSource.dbfPolymir
            };

            waybill.Car = car;
            waybill.FormNumber = pWB.NPL;
            waybill.FormSerial = pWB.SERIA;
            waybill.DepartureDate = convertDate(pWB.D_VY.Value, pWB.VR_VY);
            waybill.ReturnDate = convertDate(pWB.D_VOZ.Value, pWB.VR_VOZ);
            waybill.AccPeriod = int.Parse(pWB.REP);
            waybill.ScheduleId = pWB.REGIM == "2" ? 1 : 6;
            if( pWB.GAR_NP > 0 ) {
               var trailer = Trailer.FindFirst(Expression.Where<Trailer>(x => x.ReplicationId == pWB.GAR_NP && x.ReplicationSource == ReplicationSource.dbfPolymir));
               if( trailer != null ) {
                  waybill.TrailerId = trailer.VehicleId;
               }
            }

            if( waybill.WaybillId == 0 ) {
               waybill.Position = Waybill.GetMaxPosition(car.VehicleId);
               waybill.WaybillState = 1;
               waybill.Save();
               waybill.SetPosition();
            }

            waybill.Save();

            #region Счётчики

            if( pWB.CHAS1 > 0 ) {
               var CounterId = 2;
               var counter = WaybillCounter.FindFirst(Expression.Where<WaybillCounter>(x => x.WaybillId == waybill.WaybillId && x.CounterId == CounterId));
               if( counter == null ) counter = new WaybillCounter();
               counter.WaybillId = waybill.WaybillId;
               counter.CounterId = CounterId;
               counter.Departure = pWB.CHAS1;
               counter.Return = pWB.CHAS2;
               counter.isBroken = false;

               counter.Save();
            }

            if( pWB.SP_VY > 0 ) {
               var CounterId = 1;
               var counter = WaybillCounter.FindFirst(Expression.Where<WaybillCounter>(x => x.WaybillId == waybill.WaybillId && x.CounterId == CounterId));
               if( counter == null ) counter = new WaybillCounter();
               counter.WaybillId = waybill.WaybillId;
               counter.CounterId = CounterId;
               counter.Departure = pWB.SP_VY;
               counter.Return = pWB.SP_VOZ;
               counter.isBroken = false;

               counter.Save();
            }

            #endregion

            #region Водители

            if( pWB.TABN > 0 ) {

               DetachedCriteria c = DetachedCriteria.For<Driver>()
                  .CreateAlias("Employee", "Employee")
                  .Add(Expression.Where<Driver>(x => x.Employee.DSC == 2 && x.Employee.EmployeeNumber == pWB.TABN.ToString()));

               var driver = Driver.FindFirst(c);

               if( driver != null ) {

                  var wd = WaybillDriver.FindFirst(Expression.Where<WaybillDriver>(x => x.WaybillId == waybill.WaybillId && x.Driver == driver));
                  if( wd == null ) {
                     wd = new WaybillDriver();
                  }

                  wd.Driver = driver;
                  wd.WaybillId = waybill.WaybillId; ;

                  wd.Save();

                  waybill.ResponsibleDriver = driver;
                  waybill.Save();
               }

            }

            if( pWB.TABN2 > 0 ) {

               DetachedCriteria c = DetachedCriteria.For<Driver>()
                  .CreateAlias("Employee", "Employee")
                  .Add(Expression.Where<Driver>(x => x.Employee.DSC == 2 && x.Employee.EmployeeNumber == pWB.TABN2.ToString()));

               var driver = Driver.FindFirst(c);

               if( driver != null ) {

                  var wd = WaybillDriver.FindFirst(Expression.Where<WaybillDriver>(x => x.WaybillId == waybill.WaybillId && x.Driver == driver));
                  if( wd == null ) {
                     wd = new WaybillDriver();
                  }

                  wd.Driver = driver;
                  wd.WaybillId = waybill.WaybillId; ;

                  wd.Save();
               }

            }
            #endregion

            #region Остатки
            if( FuelId != 0 ) {
               var remain = WaybillFuelRemain.FindFirst(Expression.Where<WaybillFuelRemain>(x => x.WaybillId == waybill.WaybillId && x.FuelId == FuelId));
               if( remain == null ) remain = new WaybillFuelRemain();

               remain.FuelId = FuelId;
               remain.WaybillId = waybill.WaybillId;
               remain.DepartureRemain = pWB.OST_VY;
               remain.ReturnRemain = pWB.OST_VOZ;

               remain.Save();

            }


            if( pWB.OST_VYB > 0 ) {
               var _fuelid = 2;
               if( car.GarageNumber == 57 ) _fuelid = 4;

               var remain = WaybillFuelRemain.FindFirst(Expression.Where<WaybillFuelRemain>(x => x.WaybillId == waybill.WaybillId && x.FuelId == _fuelid));
               if( remain == null ) remain = new WaybillFuelRemain();

               remain.FuelId = _fuelid;
               remain.WaybillId = waybill.WaybillId;
               remain.DepartureRemain = pWB.OST_VYB;
               remain.ReturnRemain = pWB.OST_VOZB;

               remain.Save();

            }


            #endregion

            #region Заправка

            if( pWB.POL_AZS1 > 0 ) {

               var refuelling = VehicleRefuelling.FindFirst(Expression.Where<VehicleRefuelling>(x => x.WaybillId == waybill.WaybillId && x.FuelId == FuelId && x.RefuellingPlaceId == 2 && x.Quantity == pWB.POL_AZS1));
               if( refuelling == null ) refuelling = new VehicleRefuelling();

               refuelling.FuelId = FuelId;
               refuelling.WaybillId = waybill.WaybillId;
               refuelling.RefuellingPlaceId = 2;
               refuelling.RefuellingDate = ( pWB.D_AZS1 == null || pWB.D_AZS1 < DateTime.Parse("01.01.1900") ) ? waybill.DepartureDate : pWB.D_AZS1.Value;
               refuelling.Driver = waybill.ResponsibleDriver;
               refuelling.CardNumber = pWB.N_CHIP;
               refuelling.Quantity = pWB.POL_AZS1;

               refuelling.Save();
            }

            if( pWB.POL_AZS2 != null && pWB.POL_AZS2 > 0 ) {

               var refuelling = VehicleRefuelling.FindFirst(Expression.Where<VehicleRefuelling>(x => x.WaybillId == waybill.WaybillId && x.FuelId == FuelId && x.RefuellingPlaceId == 2 && x.Quantity == pWB.POL_AZS2));
               if( refuelling == null ) refuelling = new VehicleRefuelling();

               refuelling.FuelId = FuelId;
               refuelling.WaybillId = waybill.WaybillId;
               refuelling.RefuellingPlaceId = 2;
               refuelling.RefuellingDate = ( pWB.D_AZS2 == null || pWB.D_AZS2 < DateTime.Parse("01.01.1900") ) ? waybill.DepartureDate : pWB.D_AZS2.Value;
               refuelling.Driver = waybill.ResponsibleDriver;
               refuelling.CardNumber = pWB.N_CHIP;
               refuelling.Quantity = pWB.POL_AZS2.Value;

               refuelling.Save();
            }

            if( pWB.POL_NR > 0 ) {

               var refuelling = VehicleRefuelling.FindFirst(Expression.Where<VehicleRefuelling>(x => x.WaybillId == waybill.WaybillId && x.FuelId == FuelId && x.RefuellingPlaceId == 3 && x.Quantity == pWB.POL_NR));
               if( refuelling == null ) refuelling = new VehicleRefuelling();

               refuelling.FuelId = FuelId;
               refuelling.WaybillId = waybill.WaybillId;
               refuelling.RefuellingPlaceId = 3;
               refuelling.RefuellingDate = ( pWB.D_AZS2 == null || pWB.D_AZS2 < DateTime.Parse("01.01.1900") ) ? waybill.DepartureDate : pWB.D_AZS2.Value;
               refuelling.Driver = waybill.ResponsibleDriver;
               refuelling.Quantity = pWB.POL_NR;

               refuelling.Save();
            }

            if( pWB.POL_OAO > 0 ) {
               var refuelling = VehicleRefuelling.FindFirst(Expression.Where<VehicleRefuelling>(x => x.WaybillId == waybill.WaybillId && x.FuelId == FuelId && x.RefuellingPlaceId == 1 && x.Quantity == pWB.POL_OAO));
               if( refuelling == null ) refuelling = new VehicleRefuelling();

               refuelling.FuelId = FuelId;
               refuelling.WaybillId = waybill.WaybillId;
               refuelling.RefuellingPlaceId = 1;
               refuelling.RefuellingDate = waybill.DepartureDate;
               refuelling.Driver = waybill.ResponsibleDriver;
               refuelling.Quantity = pWB.POL_OAO;

               refuelling.Save();
            }

            if( pWB.POL_OAOB > 0 ) {

               var __fuelid = 2;
               if( car.GarageNumber == 57 ) __fuelid = 4;

               var refuelling = VehicleRefuelling.FindFirst(Expression.Where<VehicleRefuelling>(x => x.WaybillId == waybill.WaybillId && x.FuelId == __fuelid && x.RefuellingPlaceId == 1 && x.Quantity == pWB.POL_OAOB));
               if( refuelling == null ) refuelling = new VehicleRefuelling();

               refuelling.FuelId = __fuelid;
               refuelling.WaybillId = waybill.WaybillId;
               refuelling.RefuellingPlaceId = 1;
               refuelling.RefuellingDate = waybill.DepartureDate;
               refuelling.Driver = waybill.ResponsibleDriver;
               refuelling.Quantity = pWB.POL_OAOB;

               refuelling.Save();
            }


            #endregion

            #region Задания



            var zakaz = dbfSession.CreateQuery(
               String.Format("from PolymirWaybillTask where NPL='{0}' and FR='{1}'", pWB.NPL, pWB.FR)
            ).List<PolymirWaybillTask>();


            var zakazCount = zakaz.Count;










            /*
            var taskCache = new List<WaybillTask>();

            foreach( var p in pWB.GetType().GetProperties() ) {


               var atr = (PolymirWaybill.WorkAttribute)Attribute.GetCustomAttribute(p, typeof(PolymirWaybill.WorkAttribute));
               if( atr != null ) {

                  var val = (int)p.GetValue(pWB, null);
                  if( val > 0 ) {

                     var NormWork = WorkMap[atr.Norm];

                     if( WorkConsumptionMap.ContainsKey(NormWork.WorkTypeId) ) {

                        var ConsId = WorkConsumptionMap[NormWork.WorkTypeId];
                        var task = WaybillTask.FindFirst(Expression.Where<WaybillTask>(x => x.WaybillId == waybill.WaybillId && x.NormConsumptionId == ConsId));
                        if( task == null ) task = new WaybillTask();

                        task.NormConsumptionId = ConsId;
                        task.TaskDepartureDate = waybill.DepartureDate;
                        task.WaybillId = waybill.WaybillId;
                        task.FuelId = FuelId;
                        task.WorkAmount = val;

                        task.Save();
                     
                     
                     }

                  }
               }
            }
             * */



            #endregion


            cnt++;
            if( cnt % 50 == 0 ) {
               SessionScope.Current.Flush();
            }

         }

         return "";
      }




      [DirectMethod]
      [ParseAsJson]
      public string ReplicatePolymirShin(JObject o) {
         ISession dbfSession = buildCustomSession(DBFSettings);
         var shins = dbfSession.QueryOver<dbf.SHIN>().List();
         var counter = 0;
         var errors = new StringBuilder();
         using( new SessionScope(FlushAction.Never) ) {
            foreach( var shin in shins ) {

               shin.ZAWNOM = shin.ZAWNOM.Trim();
               var maker = TireMaker.FindFirst(Expression.Where<TireMaker>(x => x.TireMakerName == shin.IZGOT));
               if( maker == null && shin.ZAWNOM != "" ) {
                  maker = new TireMaker() {
                     TireMakerName = shin.IZGOT
                  };
                  maker.Save();
               }

               shin.GOST = shin.GOST.Trim();
               var standard = TireStandard.FindFirst(Expression.Where<TireStandard>(x => x.TireStandardName == shin.GOST));
               if( standard == null && shin.GOST != "" ) {
                  standard = new TireStandard() {
                     TireStandardName = shin.GOST
                  };
                  standard.Save();
               }

               shin.OBOZN = shin.OBOZN.Trim();
               shin.MODEL = shin.MODEL.Trim();

               var c = DetachedCriteria.For<TireModel>()
                  .Add(Expression.Where<TireModel>(x => x.Size == shin.OBOZN && x.TireModelName == shin.MODEL));

               if( maker == null ) {
                  c.Add(Expression.IsNull("TireMakerId"));
               }
               else {
                  c.Add(Expression.Where<TireModel>(x => x.TireMakerId == maker.TireMakerId));
               }

               if( standard == null ) {
                  c.Add(Expression.IsNull("TireStandardId"));
               }
               else {
                  c.Add(Expression.Where<TireStandard>(x => x.TireStandardId == standard.TireStandardId));
               }


               var model = TireModel.FindFirst(c);
               if( model == null ) {
                  model = new TireModel() {
                     TireModelName = shin.MODEL,
                     Size = shin.OBOZN,
                     TireMakerId = maker == null ? null : (int?)maker.TireMakerId,
                     TireStandardId = standard == null ? null : (int?)standard.TireStandardId,
                  };
                  model.WeightIndex = shin.NORMSL;
                  model.Save();
               }


               var Vehicle = BaseVehicle.FindFirst(Expression.Where<BaseVehicle>(x => x.ReplicationId == shin.GAR_N && x.ReplicationSource == ReplicationSource.dbfPolymir));

               if( Vehicle == null ) { errors.AppendLine("Не найден гар.№ " + shin.GAR_N); continue; }

               shin.ZAWNOM = shin.ZAWNOM.Trim();
               var t = Tire.FindFirst(Expression.Where<Tire>(x => x.FactoryNumber == shin.ZAWNOM));

               if( t == null ) {
                  t = new Tire() {
                     FactoryNumber = shin.ZAWNOM
                  };
               }

               t.Cost = shin.STOIM;
               t.KmNorm = shin.NORMPROB;
               t.TireModelId = model.TireModelId;

               t.Save();

               counter++; if( counter % 50 == 0 ) SessionScope.Current.Flush();

            }
            SessionScope.Current.Flush();
         }

         return errors.ToString();

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


         foreach( var car in cars ) {
            if( car.GetType() == typeof(Car) )
               ReplicateCarWaybills((Car)car, scheduleMap, waybilltypeMap);
         }

         return "";

      }

      void ReplicateCarWaybills(Car car, Dictionary<int, Schedule> scheduleMap, Dictionary<int, WaybillType> waybilltypeMap) {

         ISession tdbfSession = buildCustomSession(TDBFSettings);

         var db = new PetaPoco.Database("dbsrv2");
         var waybills = db.Query<Tdbf.waybills>("  SELECT * FROM ( select top 40 * from waybills where ownerId=@0 and garageNumber=@1 order by waybillPosition desc)a ORDER BY waybillPosition asc ", car.OwnerId, car.GarageNumber);

         var _car = new BaseVehicle() { VehicleId = car.VehicleId };

         var counter = 0;
         using( new SessionScope(FlushAction.Never) ) {
            foreach( var waybill in waybills ) {
               var w = Waybill.FindFirst(Expression.Where<Waybill>(x => x.ReplicationId == waybill.ReplicationId.ToString() && x.ReplicationSource == ReplicationSource.dbsrv2));
               if( w == null ) {
                  w = new Waybill() {
                     ReplicationSource = ReplicationSource.dbsrv2,
                     ReplicationId = waybill.ReplicationId.ToString(),
                     Car = _car,
                     Position = Waybill.GetMaxPosition(car.VehicleId)
                  };
               }

               w.WaybillState = waybill.waybillState == 2 ? (short)2 : (short)1;
               w.DepartureDate = waybill.departureDate == null ? DateTime.Parse("01.01.1990") : waybill.departureDate.Value;
               w.ReturnDate = waybill.returnDate == null ? DateTime.Parse("01.01.1990") : waybill.returnDate.Value;
               w.FormNumber = waybill.formNumber;
               w.WaybillNumber = waybill.waybillNumber;

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

               if( waybill.trailerGarageNumber != null ) {
                  try {
                     var trail = Trailer.FindFirst(Expression.Where<Trailer>(x => x.GarageNumber == waybill.trailerGarageNumber && x.OwnerId == waybill.ownerId));
                     if( trail != null ) {
                        w.TrailerId = trail.VehicleId;
                     }
                  }
                  catch { }
               }

               w.Save();

               #region Счётчики

               if( waybill.departureKm != null && waybill.departureKm.Value != 0 ) {

                  var counterId = 1;

                  var cnt = WaybillCounter.FindFirst(Expression.Where<WaybillCounter>(x => x.WaybillId == w.WaybillId && x.CounterId == counterId));
                  if( cnt == null ) {
                     cnt = new WaybillCounter() {
                        CounterId = counterId,
                        WaybillId = w.WaybillId
                     };
                  }

                  cnt.isBroken = !( waybill.odometerInvalid == null || waybill.odometerInvalid.Value == false );
                  cnt.Departure = waybill.departureKm;
                  cnt.Return = waybill.returnKm;
                  try {
                     cnt.Save();
                  }
                  catch( Exception ex ) {

                     throw ex;
                  }
               }

               if( waybill.departureMh != null && waybill.departureMh.Value != 0 ) {

                  var counterId = 2;

                  var cnt = WaybillCounter.FindFirst(Expression.Where<WaybillCounter>(x => x.WaybillId == w.WaybillId && x.CounterId == counterId));
                  if( cnt == null ) {
                     cnt = new WaybillCounter() {
                        CounterId = counterId,
                        WaybillId = w.WaybillId
                     };
                  }

                  cnt.isBroken = !( waybill.mhmeterInvalid == null || waybill.mhmeterInvalid.Value == false );
                  cnt.Departure = waybill.departureMh;
                  cnt.Return = waybill.returnMh;
                  cnt.Save();
               }

               #endregion


               #region Водители

               var db2 = new PetaPoco.Database("dbsrv2");
               var drivers = db2.Query<Tdbf.waybillsDriver>("select * from waybillsDrivers where ownerId = @0 and waybillNumber = @1 and garageNumber = @2", waybill.ownerId, waybill.waybillNumber, waybill.garageNumber);

               foreach( var driver in drivers ) {
                  var db2Driver = Driver.FindFirst(Expression.Where<Driver>(x => x.ReplicationSource == ReplicationSource.dbsrv2 && x.ReplicationId == driver.driverId));
                  if( db2Driver != null ) {
                     var d = WaybillDriver.FindFirst(Expression.Where<WaybillDriver>(x => x.WaybillId == w.WaybillId && x.Driver == db2Driver));
                     if( d == null ) {
                        new WaybillDriver() { Driver = db2Driver, WaybillId = w.WaybillId }.Save();
                     }

                     var responsible = new PetaPoco.Database("dbsrv2").ExecuteScalar<int>("select count(*) from waybillsDriversResponse where ownerId = @0 and waybillNumber = @1 and garageNumber = @2 and driverId = @3 ", waybill.ownerId, waybill.waybillNumber, waybill.garageNumber, driver.driverId);
                     if( responsible > 0 ) {
                        w.ResponsibleDriver = db2Driver;
                        w.Save();
                     }
                  }

               }


               #endregion

               #region Остатки топлива

               var remains = new PetaPoco.Database("dbsrv2").Query<Tdbf.waybillsFuelRemains>(" select * from waybillsFuelRemains where ownerId = @0 and waybillNumber = @1 and garageNumber = @2", waybill.ownerId, waybill.waybillNumber, waybill.garageNumber);

               foreach( var remain in remains ) {
                  if( dbsrv2TOdb2FuelMap.ContainsKey(remain.fuelId) ) {
                     var fuelId = dbsrv2TOdb2FuelMap[remain.fuelId];

                     var rem = WaybillFuelRemain.FindFirst(Expression.Where<WaybillFuelRemain>(x => x.WaybillId == w.WaybillId && x.FuelId == fuelId));
                     if( rem == null ) {
                        rem = new WaybillFuelRemain() {
                           FuelId = fuelId,
                           WaybillId = w.WaybillId
                        };
                     }

                     rem.DepartureRemain = remain.departureRemain;
                     rem.ReturnRemain = remain.returnRemain;

                     rem.Save();
                  }
               }


               #endregion

               #region Заправка

               var refuelling = new PetaPoco.Database("dbsrv2").Query<Tdbf.waybillsRefuelling>("select * from waybillsRefuelling where ownerId = @0 and waybillNumber = @1 and garageNumber = @2", waybill.ownerId, waybill.waybillNumber, waybill.garageNumber);

               foreach( var re in refuelling ) {
                  var db2Driver = Driver.FindFirst(Expression.Where<Driver>(x => x.ReplicationSource == ReplicationSource.dbsrv2 && x.ReplicationId == re.driverId));
                  var refuellingPlace = RefuellingPlace.FindFirst(Expression.Where<RefuellingPlace>(x => x.ReplicationId == re.refuellingId && x.ReplicationSource == ReplicationSource.dbsrv2));
                  if( refuellingPlace != null && db2Driver != null && dbsrv2TOdb2FuelMap.ContainsKey(re.fuelId) ) {

                     var r = VehicleRefuelling.FindFirst(Expression.Where<VehicleRefuelling>(x => x.ReplicationId == re.recordId && x.ReplicationSource == ReplicationSource.dbsrv2));

                     if( r == null ) {
                        r = new VehicleRefuelling() {
                           ReplicationId = re.recordId,
                           ReplicationSource = ReplicationSource.dbsrv2
                        };
                     }

                     r.CardNumber = re.CartNo;
                     r.Driver = db2Driver;
                     r.FuelId = dbsrv2TOdb2FuelMap[re.fuelId];
                     r.Quantity = re.quantity;
                     r.RefuellingDate = re.refuellingDate;
                     r.SheetNumber = re.sheetNumber;
                     r.WaybillId = w.WaybillId;
                     r.RefuellingPlaceId = refuellingPlace.RefuellingPlaceId;

                     r.Save();
                  }
               }


               #endregion

               #region Задания

               var tasks = tdbfSession.QueryOver<Tdbf.waybillsTasks>().Where(x => x.ownerId == waybill.ownerId && x.waybillNumber == waybill.waybillNumber && x.garageNumber == waybill.garageNumber).List();

               foreach( var task in tasks ) {
                  Trailer trailer = null;
                  if( task.trailerGarageNumber != null ) {
                     trailer = (Trailer)Trailer.FindFirst(Expression.Where<Trailer>(x => x.VehicleId == task.trailerGarageNumber.Value));
                  }

                  var customer = Customer.FindFirst(Expression.Where<Customer>(x => x.ReplicationId == task.CustomerId && x.ReplicationSource == ReplicationSource.dbsrv2));

                  if( customer != null ) {
                     var t = WaybillTask.FindFirst(Expression.Where<WaybillTask>(x => x.ReplicationId == task.waybillTaskId && x.ReplicationSource == ReplicationSource.dbsrv2));
                     if( t == null ) {
                        t = new WaybillTask() {
                           ReplicationSource = ReplicationSource.dbsrv2,
                           ReplicationId = task.waybillTaskId
                        };
                     }

                     t.WaybillId = w.WaybillId;
                     t.BYkm = task.raceBY;
                     t.Customer = customer;
                     t.TrailerId = trailer == null ? null : (int?)trailer.VehicleId;

                     int WorkTypeId = task.fuelNorm.normType == 1 ? 6 : 5;
                     var n = Norm.FindFirst(Expression.Where<Norm>(x => x.Car.VehicleId == car.VehicleId && x.WorkTypeId == WorkTypeId));

                     foreach( var cons in n.NormConsumption ) {
                        if( cons.Consumption == task.fuelNorm.basicNorm ) {
                           t.NormConsumptionId = cons.RecId;
                           break;
                        }
                     }

                     t.isUnaccounted = !( task.isUnaccounted == null || task.isUnaccounted.Value == 0 );
                     t.Passengers = task.passengers;
                     t.Weight = task.mass;
                     t.WeightKm = task.massRace;
                     t.WorkAmount = task.fuelNorm.normType == 1 ? task.mh : task.km;
                     t.TaskDepartureDate = task.taskBeginDate == null ? w.DepartureDate : task.taskBeginDate.Value;
                     if( dbsrv2TOdb2FuelMap.ContainsKey(task.fuelNorm.fuelId) ) t.FuelId = dbsrv2TOdb2FuelMap[task.fuelNorm.fuelId];

                     t.Consumption = task.accConsumption;

                     t.Save();
                  }

               }

               #endregion

               counter++; if( counter % 200 == 0 ) { SessionScope.Current.Flush(); }
            }
            SessionScope.Current.Flush();
         }

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
      public string ReplicateFuelNorms(JObject o) {
         ISession tdbfSession = buildCustomSession(TDBFSettings);
         var FuelNorms = tdbfSession.QueryOver<Tdbf.fuelNorm>().List();

         var counter = 0;
         using( new SessionScope(FlushAction.Never) ) {
            foreach( var norm in FuelNorms ) {

               var car = Car.FindFirst(Expression.Where<Car>(x => x.GarageNumber == norm.garageNumber && x.OwnerId == norm.ownerId && x.ReplicationSource == ReplicationSource.dbsrv2));

               if( norm.note.Trim() == "" && car != null ) {

                  int WorkTypeId = norm.normType == 1 ? 6 : 5;
                  var n = Norm.FindFirst(Expression.Where<Norm>(x => x.Car.VehicleId == car.VehicleId && x.WorkTypeId == WorkTypeId));

                  if( n == null ) {
                     n = new Norm() {
                        Car = new BaseVehicle() { VehicleId = car.VehicleId },
                        WorkTypeId = WorkTypeId
                     };
                  }

                  n.isMain = norm.additional == 0;
                  if( norm.notInMetters == 0 ) {
                     n.CounterId = norm.normType == 1 ? 2 : 1;
                  }

                  if( dbsrv2TOdb2FuelMap.ContainsKey(norm.fuelId) && !n.NormFuels.Contains(dbsrv2TOdb2FuelMap[norm.fuelId]) ) {
                     n.NormFuels.Add(dbsrv2TOdb2FuelMap[norm.fuelId]);
                  }

                  n.Save();

                  var flag = false;

                  foreach( var cons in n.NormConsumption ) {
                     if( cons.Consumption == norm.basicNorm ) {
                        flag = true;
                        break;
                     }
                  }

                  if( !flag ) {
                     var date = norm.startingDate == null ? DateTime.Parse("01.01.2000") : norm.startingDate.Value;

                     while( true ) {
                        var nc = NormConsumption.FindFirst(Expression.Where<NormConsumption>(x => x.NormId == n.NormId && x.ConsumptionStartDate == date));
                        if( nc != null ) date = date.AddDays(1);
                        else break;
                     }

                     new NormConsumption() {
                        Consumption = norm.basicNorm,
                        ConsumptionStartDate = date,
                        NormId = n.NormId
                     }.Save();
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




      # region DBSRV_Back


      [DirectMethod]
      [ParseAsJson]
      public string ReplicateDB2Waybill(JObject o)
      {
         
        var gn = o["GarageNumber"].Value<int>();
          
         var WorkUnitMap = WorkUnit.getMap(); 
         var WorkTypeMap = WorkType.getMap(); 

         var s = new StringBuilder();
          
         ISession tdbfSession = buildCustomSession(TDBFSettings);

         var waybills = Waybill.FindAll(Order.Asc("DepartureDate"), Expression.Where<Waybill>(x => (x.ReturnDate > DateTime.Parse("01.10.2013") && x.ReturnDate < DateTime.Parse("25.10.2013") /*&& x.Car == Car.FindFirst(Expression.Eq("GarageNumber",gn))*/)));
                    
         using( new SessionScope(FlushAction.Never) ) {

            foreach( var waybill in waybills ) { 

               try {
                  

                  var _waybill = tdbfSession.QueryOver<Tdbf.waybills>().Where(x => x.waybillNumber == waybill.WaybillId).SingleOrDefault();

                  var _tf = tdbfSession.QueryOver<Tdbf.transportFacility>().Where(x => x.ownerId == 1 && x.garageNumber == waybill.Car.GarageNumber).SingleOrDefault();

                  if( _tf == null ) {
                     _tf = new Tdbf.transportFacility() {
                        garageNumber = waybill.Car.GarageNumber,
                        ownerId = 1,
                        registrationNumber = waybill.Car.RegistrationNumber ?? "", 
                        model = waybill.Car.Model,
                        inventory = waybill.Car.InventoryNumber ?? "",
                        inputsCredit = "",
                        scheduleId = 1
                     };

                     tdbfSession.Save(_tf);
                  }


                  var schedule = Schedule.Find(waybill.ScheduleId ?? 1);


                  if( _waybill == null ) {

                     _waybill = new Tdbf.waybills() {
                        waybillNumber = waybill.WaybillId,
                        garageNumber = _tf.garageNumber,
                        ownerId = _tf.ownerId
                     };

                  }

                  _waybill.shift = (byte)( waybill.Shift == 0 ? 1 : waybill.Shift );
                  _waybill.scheduleId = schedule.ReplicationId;
                  _waybill.waybillState = 2;
                  _waybill.departureDate = waybill.DepartureDate;
                  _waybill.returnDate = waybill.ReturnDate;
                  _waybill.waybillPosition = waybill.WaybillId;
                  _waybill.waybillPackageNumber = waybill.PackageId;



                  #region Счётчики

                  var counters = WaybillCounter.FindAll(Expression.Where<WaybillCounter>(x => x.key.WaybillId == waybill.WaybillId));

                  foreach( var counter in counters ) {
                     if( counter.key.CounterId == 1 ) {
                        _waybill.departureKm = counter.Departure;
                        _waybill.returnKm = counter.Return;
                     }
                     else {
                        _waybill.departureMh = counter.Departure??0;
                        _waybill.returnMh = counter.Return??0;
                     }
                  }

                  tdbfSession.SaveOrUpdate(_waybill);

                  #endregion

                  #region Водители

                  var drivers = WaybillDriver.FindAll(Expression.Where<WaybillDriver>(x => x.key.WaybillId == waybill.WaybillId));

                  foreach( var driver in drivers ) {
                     Tdbf.Driver _driver = null;

                     if( driver.Driver.Employee.id_men != null ) {
                        _driver = tdbfSession.QueryOver<Tdbf.Driver>().Where(x => x.People.EmployeeId == driver.Driver.Employee.id_men.Value).SingleOrDefault();

                        if( _driver == null ) {
                           var people = tdbfSession.QueryOver<Tdbf.BasePeople>().Where(x => x.EmployeeId == driver.Driver.Employee.id_men).SingleOrDefault();
                           if( people != null ) {
                              _driver = new Tdbf.Driver() {
                                 OwnerId = 1,
                                 People = people
                              };

                              tdbfSession.SaveOrUpdate(_driver);
                           }
                        }

                     }


                     if( _driver != null ) {
                        var wd = tdbfSession.QueryOver<Tdbf.waybillsDriver>().Where(x => x.waybillNumber == _waybill.waybillNumber && x.driverId == _driver.DriverId).SingleOrDefault();

                        if( wd == null ) {
                           wd = new Tdbf.waybillsDriver() {
                              driverId = _driver.DriverId,
                              garageNumber = _tf.garageNumber,
                              ownerid = _tf.ownerId,
                              waybillNumber = _waybill.waybillNumber
                           };
                           tdbfSession.SaveOrUpdate(wd);
                        }

                     }


                  }


                  #endregion



                  #region Остатки топлива

                  var remains = WaybillFuelRemain.FindAll(Expression.Where<WaybillFuelRemain>(x => x.key.WaybillId == waybill.WaybillId));

                  foreach( var remain in remains ) {
                     var _fuelId = db2TOdbsrv2FuelMap[remain.FuelId];


                     var tFuel = tdbfSession.QueryOver<Tdbf.transportFuel>().Where(x => x.ownerId == _tf.ownerId && x.garageNumber == _tf.garageNumber && x.fuelId == _fuelId).SingleOrDefault();

                     if( tFuel == null ) {

                        tFuel = new Tdbf.transportFuel() {
                           fuelId = _fuelId,
                           garageNumber = _tf.garageNumber,
                           ownerId = _tf.ownerId
                        };

                        tdbfSession.SaveOrUpdate(tFuel);
                        tdbfSession.Flush();
                     }

                     var _remain = tdbfSession.QueryOver<Tdbf.waybillsFuelRemains>().Where(x => x.waybillNumber == _waybill.waybillNumber && x.fuelId == _fuelId).SingleOrDefault();

                     if( _remain == null ) {
                        _remain = new Tdbf.waybillsFuelRemains() {
                           waybillNumber = _waybill.waybillNumber,
                           ownerId = _waybill.ownerId,
                           garageNumber = _waybill.garageNumber,
                           fuelId = _fuelId
                        };

                        _remain.departureRemain = remain.DepartureRemain ?? 0;
                        _remain.returnRemain = remain.ReturnRemain ?? 0;

                        tdbfSession.SaveOrUpdate(_remain);
                     }


                  }


                  #endregion


                  #region Заправка

                  var refuelling = VehicleRefuelling.FindAll(Expression.Where<VehicleRefuelling>(x => x.WaybillId == waybill.WaybillId && x.RefuellingPlaceId != 6));

                  foreach( var r in refuelling ) {

                     var _fuelId = db2TOdbsrv2FuelMap[r.FuelId];
                     var place = RefuellingPlace.Find(r.RefuellingPlaceId);


                     var tFuel = tdbfSession.QueryOver<Tdbf.transportFuel>().Where(x => x.ownerId == _tf.ownerId && x.garageNumber == _tf.garageNumber && x.fuelId == _fuelId).SingleOrDefault();

                     if( tFuel == null ) { 

                        tFuel = new Tdbf.transportFuel() {
                           fuelId = _fuelId,
                           garageNumber = _tf.garageNumber,
                           ownerId = _tf.ownerId
                        };

                        tdbfSession.SaveOrUpdate(tFuel);
                        tdbfSession.Flush();
                     }


                     var _r = Tdbf.waybillsRefuelling.FindFirst(Expression.Where<Tdbf.waybillsRefuelling>(x => x.correctionId == r.RefuellingId));

                     if( _r == null ) {
                        _r = new Tdbf.waybillsRefuelling() {
                           correctionId = r.RefuellingId
                        };

                     }

                     _r.CartNo = r.CardNumber;
                     _r.fuelId = _fuelId;
                     _r.garageNumber = _tf.garageNumber;
                     _r.ownerId = _tf.ownerId;
                     _r.quantity = r.Quantity;
                     _r.refuellingDate = r.RefuellingDate;
                     _r.waybillNumber = _waybill.waybillNumber;
                     _r.refuellingId = place.ReplicationId == null ? 1 : place.ReplicationId.Value;

                     _r.SaveAndFlush();



                  }


                  #endregion


                  #region Задания

                  var tasks = WaybillTask.FindAll(Expression.Where<WaybillTask>(x => x.WaybillId == waybill.WaybillId));

                  foreach (var task in tasks)
                  {

                      var customer = task.Customer;



                      //заказчик
                      Tdbf.Customer _customer;
                      if (customer != null && customer.ReplicationId == null)
                      {
                          _customer = new Tdbf.Customer()
                          {
                              customerName = customer.CustomerName,
                              inputsDebit = customer.CostCode,
                              ownerId = _waybill.ownerId,
                              excessCredit = "",
                              excessDebit = ""
                          };

                          tdbfSession.SaveOrUpdate(_customer);
                          tdbfSession.Flush();

                          customer.ReplicationId = _customer.customerId;
                          customer.ReplicationSource = ReplicationSource.dbsrv2;
                          customer.SaveAndFlush();


                      }



                      bool isKm = false;
                      Tdbf.fuelNorm _fn = null;

                      if (task.NormConsumptionId != null && task.FuelId != null && task.FuelId.Value > 0)
                      {

                          var _fuelId = db2TOdbsrv2FuelMap[task.FuelId.Value];

                          var normConsumption = NormConsumption.Find(task.NormConsumptionId);
                          if (normConsumption != null)
                          {
                              var norm = Norm.Find(normConsumption.NormId);
                              if (norm != null)
                              {
                                  isKm = WorkTypeMap[norm.WorkTypeId].WorkUnitId == 1;

                                  _fn = tdbfSession.QueryOver<Tdbf.fuelNorm>().Where(x => x.ownerId == _tf.ownerId && x.garageNumber == _tf.garageNumber && x.fuelId == _fuelId && x.basicNorm == normConsumption.Consumption).Take(1).SingleOrDefault();
                                  if (_fn == null)
                                  {

                                      var tFuel = tdbfSession.QueryOver<Tdbf.transportFuel>().Where(x => x.ownerId == _tf.ownerId && x.garageNumber == _tf.garageNumber && x.fuelId == _fuelId).SingleOrDefault();

                                      if (tFuel == null)
                                      {

                                          tFuel = new Tdbf.transportFuel()
                                          {
                                              fuelId = _fuelId,
                                              garageNumber = _tf.garageNumber,
                                              ownerId = _tf.ownerId
                                          };

                                          tdbfSession.SaveOrUpdate(tFuel);
                                          tdbfSession.Flush();
                                      }

                                      _fn = new Transport.OtherModels.tdbf.fuelNorm()
                                      {
                                          additional = (byte)(norm.isMain ? 0 : 1),
                                          basicNorm = normConsumption.Consumption,
                                          coefficientMh = norm.MotoToMachineKoef ?? 1,
                                          fuelId = _fuelId,
                                          garageNumber = _tf.garageNumber,
                                          normType = (byte)(isKm ? 0 : 1),
                                          ownerId = _tf.ownerId,
                                          note = WorkTypeMap[norm.WorkTypeId].WorkTypeName
                                      };

                                      tdbfSession.SaveOrUpdate(_fn);

                                  }

                              }
                          }
                      }


                      //Прицеп

                      var _task = tdbfSession.QueryOver<Tdbf.waybillsTasks>().Where(x => x.replicationID == task.TaskId).SingleOrDefault();

                      if (_task == null)
                      {
                          _task = new Tdbf.waybillsTasks()
                          {
                              replicationID = task.TaskId,
                              waybillNumber = _waybill.waybillNumber,
                              ownerId = _waybill.ownerId,
                              garageNumber = _waybill.garageNumber
                          };

                      }

                      _task.accConsumption = task.Consumption;
                      _task.isUnaccounted = (task.isUnaccounted ?? false) ? (short)1 : (short)0;
                      _task.massRace = task.WeightKm ?? 0;
                      _task.mass = task.Weight ?? 0;
                      _task.passengers = task.Passengers;
                      _task.raceBY = task.BYkm;
                      _task.taskBeginDate = task.TaskDepartureDate;
                      _task.CustomerId = customer == null ? null : (int?)customer.ReplicationId.Value;
                      _task.fuelNorm = _fn;
                      _task.km = isKm ? task.WorkAmount : 0;
                      _task.mh = isKm ? 0 : task.WorkAmount;

                      tdbfSession.SaveOrUpdate(_task);
                      


                  }


                  #endregion



                  tdbfSession.Flush();

                  SessionScope.Current.Flush();


               }


               catch( Exception ex ) {

                  s.AppendLine(ex.Message);

               }

            }
         }

         return s.ToString();

      }

      #endregion


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
               waybills = Waybill.FindAll(Expression.Where<Waybill>(x => x.WaybillState == 2 && x.ReturnDate > DateTime.Parse("01.11.2013") && x.ReturnDate <= DateTime.Parse("01.12.2013")));
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

   }
}
