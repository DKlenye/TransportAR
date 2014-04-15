﻿using System;
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
using NHibernate.Hql;
using NHibernate.Criterion.Lambda;
using NHibernate.Criterion;
using Kdn.Direct;
using Transport.Models;


namespace Transport.Direct
{
   public partial class Direct : Kdn.Direct.Direct
   {


      [DirectMethod]
      [ParseAsJson]
      public JObject LoadVehicleInsertInfo(JObject o)
      {
         JToken p;
         JObject obj = null;
         Car car=null;
         if (o.TryGetValue("VehicleId", out p) && p.Value<int?>() != null)
         {
            car = (Car)Car.Find(p.Value<int>());

            if( car.Customer !=null && car.Customer.notActual )
               car.Customer = null;

            VehicleDriver[] drivers = VehicleDriver.FindAll(Expression.Where<VehicleDriver>(x => x.Car.VehicleId == p.Value<int>()));
            List<VehicleDriver> ActualDrivers = new List<VehicleDriver>();

            foreach (var driver in drivers)
            {
                if (driver.Driver.Employee.DismissDate == null)
                {
                    ActualDrivers.Add(driver);
                }
                else
                {
                    if (car.DriverId == driver.Driver.DriverId)
                    {
                        car.DriverId = null;
                    }
                    driver.Delete();
                } 
            }


            obj = JObject.FromObject(car);
            obj["Drivers"] = JArray.FromObject(ActualDrivers);

         }
         return obj;
      } 

      
      [DirectMethod]
      [ParseAsJson]
      public JObject LoadInsertInfo(JObject o)
      {
         var VehicleId = o["VehicleId"].Value<int>();

         JObject info = new JObject();
         var lastClose = Waybill.LastClose(VehicleId);
         if (lastClose != null)
         {
            var w = JObject.FromObject(lastClose);
            w["WaybillCounter"] = JArray.FromObject(WaybillCounter.findByWaybillId(lastClose.WaybillId));
            w["WaybillFuelRemain"] = JArray.FromObject(WaybillFuelRemain.findByWaybillId(lastClose.WaybillId));
            info["LastClose"] = w;
         }
         var firstOpen = Waybill.FirstOpen(VehicleId);
         if (firstOpen != null)
         {
            info["FirstOpen"] = JObject.FromObject(Waybill.FirstOpen(VehicleId));
         }
         
         return info;
      }

      [DirectMethod]
      [ParseAsJson]
      public  Waybill InsertWaybill(JObject o)
      {
         var waybill = JsonConvert.DeserializeObject<Waybill>(o.ToString());
         if (waybill.WaybillId == 0)
         {
            waybill.Position = Waybill.GetMaxPosition(waybill.Car.VehicleId);
            waybill.WaybillState = 1;
            waybill.SaveAndFlush();
            waybill.SetPosition();
         }                  
         waybill.Save();

         var prevWaybill = waybill.Prev();

         if (prevWaybill != null)
         {
            prevWaybill.MoveRemains(waybill, prevWaybill.WaybillState < 2);
         }
         else
         {
            waybill.SetRemains();
         }

         JToken drivers;
         if(o.TryGetValue("Drivers", out drivers)){
            var d = JsonConvert.DeserializeObject<List<Driver>>(drivers.ToString());
            var driversCache = new List<WaybillDriver>();
            var car = (Car)Car.Find(waybill.Car.VehicleId);
            foreach (var _driver in d)
            {
               var wd = new WaybillDriver()
               {
                  WaybillId = waybill.WaybillId,
                  Driver = _driver
               };
               wd.Save();
               if (car.DriverId == _driver.DriverId)
               {
                  waybill.ResponsibleDriver = _driver;
                  waybill.Save();
               }
               driversCache.Add(wd);
            }

            if (waybill.ResponsibleDriver == null && driversCache.Count > 0)
            {
               waybill.ResponsibleDriver = driversCache[0].Driver;
               waybill.Save();
            }


         }


         JToken customer;
         Customer _Customer =null;
         if( o.TryGetValue("Customer", out customer)) {
            _Customer =JsonConvert.DeserializeObject<Customer>(customer.ToString());
         }

         JToken cargoName;
         string _CargoName = "";
         if (o.TryGetValue("CargoName", out cargoName))
         {
            _CargoName = cargoName.Value<string>();
         }

         JToken dstRoutePoint;
         int? _DstRoutePoint = null;
         if( o.TryGetValue("DstRoutePoint", out dstRoutePoint) ) {
            _DstRoutePoint = dstRoutePoint.Value<int>();
         }

         JToken srcRoutePoint;
         int? _SrcRoutePoint = null;
         if( o.TryGetValue("SrcRoutePoint", out srcRoutePoint) ) {
            _SrcRoutePoint = srcRoutePoint.Value<int>();
         }

            var vehicleIncreases = VehicleIncrease.FindAll(Expression.Where<VehicleIncrease>(x => x.Car.VehicleId == waybill.Car.VehicleId));
            var mapVehicleIncreases = new Dictionary<int, VehicleIncrease>();
            var mapIncreases = new Dictionary<int, Increase>();

            foreach( var inc in vehicleIncreases ) {
               mapVehicleIncreases.Add(inc.IncreaseId, inc);
            }

            foreach( var inc in Increase.FindAll() ) {
               mapIncreases.Add(inc.IncreaseId, inc);
            }

            var norms = Norm.FindAll(Expression.Where<Norm>(x => x.Car.VehicleId == waybill.Car.VehicleId && x.Enabled));
            Norm norm = null;            
            foreach( var n in norms ) {
               if( n.isMain ) {
                  norm = n;
                  break;
               }
            }

            if (norm == null)
            {
               foreach (var n in norms)
               {
                     norm = n;
                     break;
               }
            }

            int normConsumptionId=0;
            if( norm != null ) {
               foreach( var cons in norm.NormConsumption ) {
                  if( cons.ConsumptionStartDate < waybill.DepartureDate )
                  {
                     normConsumptionId = cons.RecId;
                     break;
                  }
               }
            }

            int fuelId = 0;

            if( norm != null ) {

                if (norm.MainFuelId == null)
                {
                    foreach (var f in norm.NormFuels)
                    {
                        fuelId = f;
                        break;
                    }
                }
                else
                {
                    fuelId = norm.MainFuelId.Value;
                }


            }

          WaybillTask task = null;
          if (norm != null)
          {

              task = new WaybillTask()
              {
                  WaybillId = waybill.WaybillId,
                  TaskDepartureDate = waybill.DepartureDate,
                  Customer = _Customer,
                  NormConsumptionId = normConsumptionId,
                  FuelId = fuelId,
                  CargoName = _CargoName,
                  DstRoutPoint = _DstRoutePoint,
                  SrcRoutPoint = _SrcRoutePoint,
                  TrailerId = waybill.TrailerId,
                  isTruck = waybill.Car.BodyTypeId == 18 || waybill.Car.BodyTypeId == 36
              };

              task.Save();
          }



          if( norm != null && norm.NormIncreases.Count > 0 ) {
               foreach( var incr in norm.NormIncreases ) {

                   if (incr != 63 /*fucking hard code, it's OAO NAFTAN baby*/ /*and copy->past from Models/WaybillTask.cs*/)
                   {
                       new WaybillTaskIncrease()
                       {
                           IncreaseId = incr,
                           TaskId = task.TaskId,
                           Prcn =
                               mapVehicleIncreases.ContainsKey(incr)
                                   ? mapVehicleIncreases[incr].Prcn
                                   : mapIncreases[incr].Prcn
                       }.Save();
                   }
               }
         }

         return waybill; 
      }


      [DirectMethod]
      [ParseAsJson]
      public bool CheckWaybillExists(JObject o)
      {
         var date = o["Date"].Value<DateTime>();
         var vehicleId = o["VehicleId"].Value<int>();

         var c = DetachedCriteria.For<Waybill>()
             .Add(Expression.Between("DepartureDate", date, date.AddDays(1).AddMinutes(-1)))
             .Add(Expression.Where<Waybill>(x => x.Car.VehicleId == vehicleId));

         return Waybill.Exists(c);
      }



      [DirectMethod]
      [ParseAsJson]
      public JObject LoadVehicle(JObject o)
      {
         JToken p;
         FullCar car;
         if (o.TryGetValue("VehicleId", out p) && p.Value<int?>() != null)
         {
            car = (FullCar)FullCar.Find(p.Value<int>());
         }
         else if (o.TryGetValue("WaybillId", out p) && p.Value<int?>() != null)
         {
            car = (FullCar)FullCar.GetByWaybill(p.Value<int>());
         }
         else
         {
            car = null;
         }

         if (car != null) return car.Info();
         return null;
      }




      
      [DirectMethod]
      [ParseAsJson]
      public JObject LoadWaybill(JObject o) {
         var VehicleId = o["VehicleId"].Value<int?>();
         var WaybillId = o["WaybillId"].Value<int?>();
         var Direction = o["Direction"].Value<int?>();

         Waybill waybill = null;

         if( Direction == 0 ) {
            if( WaybillId != null && WaybillId.Value != 0 ) {
               waybill = Waybill.Find(WaybillId);
            }
            else if( VehicleId != null ) {
               waybill = Waybill.FirstOpen(VehicleId.Value);
            }
         }
         else {                        
            waybill = Direction > 0 ?
                   Waybill.Find(WaybillId).Next() :
                   Waybill.Find(WaybillId).Prev();
         }

         if( waybill == null && VehicleId != null ) {
            waybill = Waybill.LastClose(VehicleId.Value);
            if( waybill == null ) {
               waybill = Waybill.FindFirst(Expression.Where<Waybill>(x => x.Car.VehicleId == VehicleId.Value));
            }
         }
         if( waybill == null ) return null;


         /*if( waybill.WaybillState < 2 ) {

            var tasks = WaybillTask.FindAll(Expression.Where<WaybillTask>(x => x.WaybillId == waybill.WaybillId));

            foreach( var task in tasks ) {
               task.CheckDefaultIncreases();
               task.CheckWinter();
            }
                     
         }*/


         return waybill.FullInfo();

      }




      






      [DirectMethod]
      [ParseAsJson]
      public Temperature GetTemperature(JObject o)
      {
         DateTime? date;
         int ownerId;

         JToken v;

         if( o.TryGetValue("date", out v) ) {
            date = v.Value<DateTime?>();
            if( o.TryGetValue("ownerId", out v) && date != null ) {
               ownerId = v.Value<int>();

               return Temperature.FindFirst(
                  Order.Desc("Date"),
                     Expression.Where<Temperature>(t => t.Date <= date && t.Date > Kdn.DateUtils.TodayStart(date.Value) && t.OwnerId == ownerId)
                );
            }
         }

         return null;   
      }


      [DirectMethod]
      [ParseAsJson] 
      public Temperature GetCurrentTemperature(JObject o) {
         /*var direct = new Transport.Direct.Direct();
         direct.ReplicateWeather(new JObject());*/
           
         var temp = Temperature.FindFirst(
            Order.Desc(Projections.Property<Temperature>(x=>x.key.Date)),
            Expression.Where<Temperature>(t =>  t.key.OwnerId == 1)
         );

         return temp;

      }



      [DirectMethod]
      [ParseAsJson]
      public JObject SaveWaybill(JObject o) {

         var waybill = JsonConvert.DeserializeObject<Waybill>(o.ToString());

         if( waybill.WaybillId == 0 ) {
            waybill.Position = Waybill.GetMaxPosition(waybill.Car.VehicleId);
            waybill.WaybillState = 1;
            waybill.SaveAndFlush();
            waybill.SetPosition();
         }
         else {
            waybill.SaveAndFlush();
         }

          if (waybill.WaybillState == 2)
          {
              waybill.ClearWorkingTime();
              waybill.CalcWorkingTime();
          }


         var JO = JObject.FromObject(waybill);

         JO["isLast"] = waybill.isLast();
         JO["isCurrent"] = waybill.isCurrent();
         return JO;
          
      }

      [DirectMethod]
      [ParseAsJson]
      public JObject CloseWaybill(JObject o) {

         JToken p;

         JObject JO = new JObject();

         if( o.TryGetValue("WaybillId", out p) && p.Value<int?>() != null ) {
            var waybill = Waybill.Find(p.Value<int>());
            waybill.DispClose();

            JO = JObject.FromObject(waybill);
            JO["isLast"] = waybill.isLast();
            JO["isCurrent"] = waybill.isCurrent();
         }

         return JO;
      
      }

      [DirectMethod]
      [ParseAsJson]
      public JObject OpenWaybill(JObject o) {

         JToken p;

         JObject JO = new JObject();

         if( o.TryGetValue("WaybillId", out p) && p.Value<int?>() != null ) {
            var waybill = Waybill.Find(p.Value<int>());
            waybill.DispOpen();

            JO = JObject.FromObject(waybill);
            JO["isLast"] = waybill.isLast();
            JO["isCurrent"] = waybill.isCurrent();
         }

         return JO;

      }

      [DirectMethod]
      [ParseAsJson]
      public string DeleteWaybill(JObject o) {

         JToken p;
         if( o.TryGetValue("WaybillId", out p) && p.Value<int?>() != null ) {
            var waybill = Waybill.Find(p.Value<int>());
            waybill.DeleteWaybill();
         }
         return "";
      }


      [DirectMethod]
      [ParseAsJson]
      public JObject TransferWaybill(JObject o)
      {
         JToken w;
         if (o.TryGetValue("WaybillId", out w) && w.Value<int?>() != null)
         {
            JToken d;
            if (o.TryGetValue("Date", out d) && d.Value<DateTime?>() != null)
            {

               var waybill = Waybill.Find(w.Value<int>());
               var date = d.Value<DateTime>();


               if (Waybill.Exists(Expression.Where<Waybill>(x => x.Car.VehicleId == waybill.Car.VehicleId && x.WaybillState > 1 && x.DepartureDate >= date)))
               {
                  throw new Exception("Указана неверная дата. Существуют закрытые путевые листы!");
               }

               TimeSpan time = date - waybill.DepartureDate;
               
               waybill.DepartureDate = date;
               waybill.ReturnDate = waybill.ReturnDate.AddDays(time.Days);

               var tasks = WaybillTask.FindAll(Expression.Where<WaybillTask>(x => x.WaybillId == w.Value<int>()));
                
               tasks.ForEach(x =>
               {
                   x.TaskDepartureDate = x.TaskDepartureDate.AddDays(time.Days);
                   x.SaveAndFlush();
               });

               var savePosition = waybill.Position;

               waybill.Save();
               waybill.SetPosition();

               if (waybill.Position != savePosition)
               {
                  var query = String.Format(
                    @" UPDATE WaybillFuelRemain SET DepartureRemain = null, ReturnRemain = null WHERE WaybillId={0}",
                    waybill.WaybillId
                 );
                  var s = ActiveRecordMediator.GetSessionFactoryHolder().CreateSession(typeof(Waybill));

                  s.CreateQuery(query).ExecuteUpdate();
                  s.Flush();

                  query = String.Format(
                     @" UPDATE WaybillCounter SET Departure = null, Return = null WHERE WaybillId={0}",
                     waybill.WaybillId
                  );

                  s.CreateQuery(query).ExecuteUpdate();
                  s.Flush();

                  var lastClose = Waybill.LastClose(waybill.Car.VehicleId);
                  if (lastClose != null)
                  {
                     var lastCloseNext = lastClose.Next();
                     if (lastCloseNext != null)
                     {
                        lastClose.MoveRemains(lastCloseNext);
                     }
                  }
               }               

               var obj = new JObject();

               obj["WaybillId"] = waybill.WaybillId;
               obj["Direction"] = 0;
               obj["VehicleId"] = 0;

               return LoadWaybill(obj);
            }
         }

         return new JObject() { };
      }


      


   }
}
