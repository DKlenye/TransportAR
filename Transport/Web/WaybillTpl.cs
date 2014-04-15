﻿using System;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Collections;
using System.Collections.Specialized;
using System.Collections.Generic;
using System.Data;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using NHibernate;
using NHibernate.Cfg;
using NHibernate.Criterion;
using Transport.Models;
using Castle.ActiveRecord;



namespace Transport.Web
{

    public class WaybillTpl : System.Web.UI.Page
    {

        protected Waybill waybill;
        protected WaybillTask task; 
        protected Vehicle vehicle;
        protected Trailer trailer;
        protected IList<WaybillFuelRemain> remains;
        protected WaybillFuelRemain remain = null;
        protected IList<WaybillCounter> counters;
        protected IList<WaybillDriver> waybillDrivers;

        int _WaybillId = 0;

        protected void Page_Load(object sender, EventArgs e)
        {            
            try
            {
                NameValueCollection par = Context.Request.QueryString;
                _WaybillId = int.Parse(par["WaybillId"].ToString());

            }
            catch (Exception ex) { }


            if( _WaybillId != 0 ) {
               waybill = Waybill.Find(_WaybillId);
            }

            if( waybill != null ) {
               vehicle = Vehicle.Find(waybill.Car.VehicleId);

               if( waybill.TrailerId != null ) trailer = (Trailer)Trailer.Find(waybill.TrailerId.Value);

               remains = WaybillFuelRemain.FindAll(Order.Desc(Projections.Property<WaybillFuelRemain>(x=>x.key.FuelId)), Expression.Where<WaybillFuelRemain>(x => x.key.WaybillId == waybill.WaybillId));
                              
               foreach (var rem in remains)
               {
                  if( rem.FuelId == 7 ) continue; //Не печатаем керосин

                     remain = rem;
                     break;
               }               
               
               counters = WaybillCounter.findByWaybillId(waybill.WaybillId);
               waybillDrivers = WaybillDriver.findByWaybillId(waybill.WaybillId);
               task = WaybillTask.FindFirst(Order.Asc("TaskId"), Expression.Where<WaybillTask>(x => x.WaybillId == waybill.WaybillId));


            }

        }

        
        public string WaybillNumber()
        {
            if (waybill!=null) return waybill.WaybillId.ToString();
            return "";
        }

        public string CustomerName() {
           if( waybill != null ) {
              var task = WaybillTask.FindFirst(Order.Asc("TaskDepartureDate"), Expression.Where<WaybillTask>(x => x.WaybillId == waybill.WaybillId));
               
              if( task != null && task.Customer != null ) {
                 return String.Format("[{0}] {1}", task.Customer.CustomerId, task.Customer.CustomerName);
              }
           }
           return "";
        }


        public string ScheduleName() {
           if( waybill != null && waybill.ScheduleId!=null ) {             
               return Schedule.Find(waybill.ScheduleId).ScheduleName;
           }
           return "";
        }

        public string CargoName()
        {
           if (waybill != null)
           {

              if (task != null && task.CargoName != null)
              {
                 return task.CargoName;
              }
           }
           return "";
        }

        public string DstRoutPoint() {

           if( waybill != null ) {
              if( task != null && task.DstRoutPoint != null ) {
                 return RoutePoint.Find(task.DstRoutPoint).RoutePointName;
              }
           }
           return "";

        }

        public string SrcRoutePoint() {

           if( waybill != null ) {
              if( task != null && task.SrcRoutPoint != null ) {
                 return RoutePoint.Find(task.SrcRoutPoint).RoutePointName;
              }
           }
           return "";

        }

        public string RouteKm() {

           if( waybill != null ) {
              if( task != null && task.SrcRoutPoint != null && task.DstRoutPoint !=null ) {


                 var route = Route.FindFirst(Expression.Where<Route>(x => x.DestinationPoint.RoutePointId == task.DstRoutPoint && x.SourcePoint.RoutePointId == task.SrcRoutPoint));

                 if( route != null ) {

                    var distance = route.Distance + 0; //"попросили прибавлять + 10 км" , потом борейко сказала убрать до выяснения
                    return distance.ToString();
                 }
              }
           }
           return "";

        }


        public string DepartureDate(string format) { return DepartureDate(format, false); }

        public string DepartureDate(string format, bool withBreak)
        {
            if (waybill != null)
            {
                string d = waybill.DepartureDate.ToString(format, CultureInfo.CreateSpecificCulture("ru-RU"));
                if (withBreak) { d = d.Replace(" ", "<br/>"); }
                return d;
            }
            return "";
        }

        public string ReturnDate(string format) { return ReturnDate(format, false); }
        public string ReturnDate(string format, bool withBreak)
        {
            if (waybill != null)
            {
                string d = waybill.ReturnDate.ToString(format, CultureInfo.CreateSpecificCulture("ru-RU"));
                if (withBreak) { d = d.Replace(" ", "<br/>"); }
                return d;
            }
            return "";
        }


        public string DepartureKm()
        {
            if (waybill != null)
            {
               foreach( var c in counters ) {
                  if( c.CounterId == 1 && c.Departure !=null ) {
                     return c.Departure.Value.ToString("#####.##");
                  }
               }

            }
            return "";
        }

        public string DepartureMh()
        {
           if( waybill != null ) {
              foreach( var c in counters  ) {
                 if( c.CounterId != 1 && c.Departure != null ) {
                    return c.Departure.Value.ToString("#####.##");
                 }
              }

           }
           return "";
        }

        public string WaybillCode()
        {
            return "";
        }

        public string VehicleModel()
        {
            if (waybill != null)
            {
               return vehicle.Model;
            }
            return "";
        }
        public string VehicleRegistrationNumber()
        {
            if (waybill != null)
            {
                return vehicle.RegistrationNumber;
            }
            return "";
            
        }
        public string VehicleGarageNumber()
        {
            if (waybill != null)
            {
                return vehicle.GarageNumber.ToString();
            }
            return "";
            
        }

        public string DriverFio(int i)
        {

            if (waybill != null)
            {
                if (waybillDrivers.Count >= i)
                {
                    var d = waybillDrivers[i - 1].Driver.Employee;
                    return String.Format("{0} {1} {2}", d.LastName, d.FirstName, d.MiddleName);
                }
            }
            return "";

        }

        public string DriverFioShort(int i)
        {

            if (waybill != null)
            {
                if (waybillDrivers.Count >= i)
                {
                    var d = waybillDrivers[i - 1].Driver.Employee;
                    return String.Format("{0} {1}. {2}.", d.LastName, d.FirstName[0], d.MiddleName[0]);
                }
            }
            return "";

        }

        public string DriverLicence(int i)
        {           
            if (waybill != null)
            {
                if (waybillDrivers.Count >= i)
                {
                    var d = waybillDrivers[i - 1].Driver;

                    var l = Transport.Models.DriverLicence.FindFirst(Order.Asc("DateOfTerm"), Expression.Where<Transport.Models.DriverLicence>(x => x.Driver == d && (x.DateOfTerm > waybill.DepartureDate || x.DateOfTerm==null)));

                    if( l != null ) {
                       return String.Format("{0} {1}", l.Serial, l.Number);
                    }

                }
            }
            return "";


        }

        public string DriverTab(int i)
        {
            if (waybill != null)
            {
                if (waybillDrivers.Count >= i)
                {
                    var d = waybillDrivers[i - 1].Driver.Employee;
                    return d.EmployeeNumber;
                }
            }
            return "";
        }



        public string Way()
        {
            if (waybill != null)
            {
                return waybill.Way;
            }
            return "";
        }


        public string FuelName()
        {
            if (waybill != null && remain !=null ){
               return Fuel.Find(remain.FuelId).FuelName;                              
            }
            return "";
        }

        public string AllFuelName()
        {
            if (waybill != null && remain != null)
            {
                var r = new List<string>();
                foreach (var rem in remains)
                {
                    if (rem.DepartureRemain != null)
                    {
                        var fuelName = Fuel.Find(rem.FuelId).FuelName;
                        r.Add(fuelName);
                    }
                }
                return String.Join("<br/>", r.ToArray());
            }
            return "";
        }

        public string FuelRemains()
        {
           if (waybill != null && remain != null)
            {
               if (remain.DepartureRemain != null) 
                  return remain.DepartureRemain.Value.ToString("#####.##");  
            }
            return "";
        }

        public string AllFuelRemains(bool withName)
        {
            var r = new List<string>();

            if (waybill != null && remains != null)
            {
                foreach (var rem in remains)
                {
                    //if (rem.FuelId == 7) continue; //Не печатаем керосин

                    if (rem.DepartureRemain != null)
                    {
                        var fuelName = "";
                        if (withName)
                        {
                            fuelName = Fuel.Find(rem.FuelId).FuelName;
                        }
                        r.Add(String.Format("{0} {1}", fuelName, rem.DepartureRemain.Value.ToString("#####.##")));
                    }
                }
            }
            return String.Join("<br/>", r.ToArray());
        }


        public string TrailerModel()
        {
           return trailer==null?"":trailer.Model;
        }

        public string TrailerGarageNumber()
        {
           return trailer == null ? "" : trailer.GarageNumber.ToString();
        }

        public string TrailerRegNumber()
        {
           return trailer == null ? "" : trailer.RegistrationNumber;
        }

        public string Phone()
        {
            return "59-83-09";
        }

        public String Stamp()
        {
            return String.Format("{0}{1}<br/>{2}<br/>{3}<br/>{4},{5}{6}",
                    "<div style=\"border: 2px solid #88A1C0; text-align: center; font: normal 12px Times New Roman;z-index:10000; width:170pt;\">",
                    "Открытое акционерное общество",
                    "\"НАФТАН\"",
                    "Республика Беларусь,Витебская обл.",
                    "211440,г.Новополоцк ",
                    "тел. " + Phone(),
                    "</div>"                
                );
        }
        
    }
}
