using System;
using System.Collections.Generic;
using System.Linq;
using Castle.ActiveRecord;
using Castle.Core;
using Kdn.Ext.Attributes;
using NHibernate.Criterion;
using Newtonsoft.Json;

namespace Transport.Models
{
    [ActiveRecord]
    public class VehicleOrderType : ActiveRecordBase<VehicleOrderType>
    {
        [PrimaryKey]
        public int VehicleOrderTypeId { get; set; }
        [Property]
        public int VehicleOrderTypeName { get; set; }
    }


    [Model, ActiveRecord("t_VehicleOrder")]
    public class VehicleOrder : ActiveRecordBase<VehicleOrder>
    {
        public VehicleOrder()
        {
            Customers = new List<VehicleOrderCustomer>();
            Drivers = new List<VehicleOrderDriver>();
        }

        [IdProperty,PrimaryKey]
        public int VehicleOrderId { get; set; }
        [Property]
        public DateTime DepartureDate { get; set; }
        [Property]
        public DateTime? ReturnDate { get; set; }
        
        [BelongsTo("VehicleId")]
        public BaseVehicle Vehicle { get; set; }

        [Property]
        public int? VehicleOrderTypeId { get; set; }

        //Путевой лист выданный на основании разнарядки
        [Property]
        public int? WaybillId { get; set; }

        [Property]
        public int ScheduleId { get; set; }
        
        [Property]
        public Int16 Shift { get; set; }
        
        [AllowBlank,Property]
        public string Description { get; set; }

        [Property,AllowBlank]
        public string DestRoutePoint { get; set; }

        [AllowBlank, HasMany(Table = "VehicleOrderCustomers", ColumnKey = "VehicleOrderId",Inverse=true,  Fetch = FetchEnum.SubSelect, Cascade=ManyRelationCascadeEnum.AllDeleteOrphan, OrderBy = "DepartureTime")]
        public ICollection<VehicleOrderCustomer> Customers { get; set; }

        [AllowBlank, HasMany(Table = "VehicleOrderDrivers", ColumnKey = "VehicleOrderId", Inverse=true,  Cascade = ManyRelationCascadeEnum.AllDeleteOrphan,  Fetch = FetchEnum.SubSelect)]
        public ICollection<VehicleOrderDriver> Drivers { get; set; }

        public bool IsInMaintenance { get; set; }
        [Property]
        public DateTime? BusinessTripDepartureDate { get; set; }


        public static VehicleOrder[] FindAllByDate(DateTime date)
        {
               return FindAll(Expression.Where<VehicleOrder>(x => x.DepartureDate > date && x.DepartureDate < date.AddDays(1)));
        }


        public static VehicleOrder[] FindBusinessTripForDate(DateTime date)
        {
            return FindAll(
                Expression.Where<VehicleOrder>(
                    x => x.ScheduleId == 6 && x.DepartureDate < date && x.ReturnDate.Value > date));
        }


        public static VehicleOrder[] FindLastOrders(DateTime date)
        {

            var lastOrderDate = FindFirst(Order.Desc(Projections.Property<VehicleOrder>(x=>x.DepartureDate)),Expression.Where<VehicleOrder>(x => x.DepartureDate < date)).DepartureDate;
            return FindAllByDate(lastOrderDate.Date);
        }

        public static void Create(DateTime date)
        {

            //создаём разнарядку если она не существует
            var order = 
            FindFirst(
                Expression.Where<VehicleOrder>(x => x.DepartureDate > date && x.DepartureDate < date.AddDays(1)));
            if (order != null) return;
            
            /*
            var query1 = @"delete VehicleOrderCustomer where VehicleOrderId in (select VehicleOrderId from VehicleOrder where DepartureDate between :date1 and :date2)";
            var query2 = @"delete from VehicleOrderDrivers where VehicleOrderId in (select VehicleOrderId from t_VehicleOrder where DepartureDate between :date1 and :date2)";  
            var query = @"Delete VehicleOrder where DepartureDate between :date1 and :date2";

            var s = ActiveRecordMediator.GetSessionFactoryHolder().CreateSession(typeof(VehicleOrder));

            s.CreateQuery(query1)
                .SetDateTime("date1", date)
                .SetDateTime("date2", date.AddDays(1))
                .ExecuteUpdate();

            s.CreateSQLQuery(query2)
                .SetDateTime("date1", date)
                .SetDateTime("date2", date.AddDays(1))
                .ExecuteUpdate();

            s.CreateQuery(query)
                .SetDateTime("date1",date)
                .SetDateTime("date2",date.AddDays(1))
                .ExecuteUpdate();
             * */

          var lastOrder = FindLastOrders(date);
          var lastOrderVehicleMap = new List<int>();
          lastOrder.ForEach(x=>lastOrderVehicleMap.Add(x.Vehicle.VehicleId));

          var businessTrip =  FindBusinessTripForDate(date);
          var businessTripMap = new List<int>();
          businessTrip.ForEach(x => businessTripMap.Add(x.Vehicle.VehicleId));

          var vehicles = FullCar.FindAll(Expression.Where<FullCar>(x => x.GroupRequestId != null && x.OwnerId == 1 && x.WriteOffDate == null));
            
          foreach (var v in vehicles)
          {
              if (lastOrderVehicleMap.Count == 0 || lastOrderVehicleMap.Contains(v.VehicleId))
              {
                  var last = lastOrder.First(x => x.Vehicle.VehicleId == v.VehicleId);
                  var car = (FullCar) v;

                  TimeSpan departureTime;
                  TimeSpan returnTime;

                  TimeSpan.TryParse(car.StartWork, out departureTime);
                  TimeSpan.TryParse(car.EndWork, out returnTime);

                  var o = new VehicleOrder()
                  {
                      DepartureDate = date.Add(departureTime.Hours == 0 ? TimeSpan.Parse("08:00") : departureTime),
                      ReturnDate = date.Add(returnTime.Hours == 0 ? TimeSpan.Parse("16:45") : returnTime),
                      ScheduleId = car.ScheduleId == null ? 1 : car.ScheduleId.Value,
                      Vehicle = new BaseVehicle() {VehicleId = v.VehicleId},
                      Shift = 1
                  };

                  o.Save();

                  if (businessTripMap.Contains(v.VehicleId))
                  {
                      var trip = businessTrip.First(x => x.Vehicle.VehicleId == v.VehicleId);
                      o.Description = trip.Description;
                      o.BusinessTripDepartureDate = trip.DepartureDate;
                      o.DestRoutePoint = trip.DestRoutePoint;
                      o.WaybillId = trip.WaybillId;
                      o.ScheduleId = trip.ScheduleId;
                      o.ReturnDate = trip.ReturnDate;

                      trip.Drivers.ForEach(
                          x =>
                              o.Drivers.Add(new VehicleOrderDriver()
                              {
                                  VehicleOrderId = o.VehicleOrderId,
                                  Driver = x.Driver
                              }));
                      trip.Customers.ForEach(
                          x =>
                              o.Customers.Add(new VehicleOrderCustomer()
                              {
                                  VehicleOrderId = o.VehicleOrderId,
                                  Customer = x.Customer,
                                  DepartureTime = x.DepartureTime,
                                  RequestId = x.RequestId,
                                  Description = x.Description,
                              }));

                      o.BusinessTripDepartureDate = trip.DepartureDate;

                  }
                  else
                  {

                      last.Drivers.ForEach(x =>
                             o.Drivers.Add(new VehicleOrderDriver()
                             {
                                 VehicleOrderId = o.VehicleOrderId,
                                 Driver = x.Driver
                             }));


                      if (car.Customer != null)
                      {
                          o.Customers.Add(new VehicleOrderCustomer()
                          {
                              Customer = car.Customer,
                              VehicleOrderId = o.VehicleOrderId,
                              DepartureTime = o.DepartureDate.TimeOfDay.ToString().Substring(0, 5)
                          });
                      }

                      /*if (car.ResponsibleDriver != null)
                      {
                          o.Drivers.Add(new VehicleOrderDriver()
                          {
                              Driver = car.ResponsibleDriver,
                              VehicleOrderId = o.VehicleOrderId
                          });
                      }*/
                  }
                  
                  o.Save();
              }
          }
            
        }
        public override void UpdateAndFlush()
        {
            var CustomerMap = new List<int>();
            foreach (var c in Customers)
            {
                CustomerMap.Add(c.Id);
            }
            var customers = VehicleOrderCustomer.FindAll(
                    Expression.Where<VehicleOrderCustomer>(x => x.VehicleOrderId == VehicleOrderId),
                    Expression.Not(Expression.In(Projections.Property<VehicleOrderCustomer>(x => x.Id), CustomerMap))
                    );
            foreach (var c in customers)
            {
                c.DeleteAndFlush();
            }

            var DriverMap = new List<Driver>();
            foreach (var d in Drivers)
            {
                DriverMap.Add(d.Driver);
            }
            var drivers = VehicleOrderDriver.FindAll(
                    Expression.Where<VehicleOrderDriver>(x => x.key.VehicleOrderId == VehicleOrderId),
                    Expression.Not(Expression.In(Projections.Property<VehicleOrderDriver>(x => x.Driver), DriverMap))
                    );
            foreach (var d in drivers)
            {
                d.DeleteAndFlush();
            }
            base.UpdateAndFlush();
        }
    }


    [ActiveRecord("VehicleOrderCustomers")]
    public class VehicleOrderCustomer : ActiveRecordBase<VehicleOrderCustomer>
    {
        [PrimaryKey]
        public int Id { get; set; }
        [Property]
        public int VehicleOrderId { get; set; }
        [AllowBlank,BelongsTo("CustomerId")]
        public Customer Customer { get; set; }
        [Property]
        public int? RequestId { get; set; }
        [Property, AllowBlank]
        public string DepartureTime { get; set; }
        [Property]
        public string ReturnTime { get; set; }
        [Property,AllowBlank]
        public string Description { get; set; }

    }


    [Serializable]
    public class VehicleOrderDriverKey
    {
        [KeyProperty]
        public int VehicleOrderId { get; set; }
        [KeyProperty]
        public int DriverId { get; set; }


        public override int GetHashCode()
        {
            return VehicleOrderId ^ DriverId;
        }

        public override bool Equals(object obj)
        {
            if (this == obj)
            {
                return true;
            }
            VehicleOrderDriverKey key = obj as VehicleOrderDriverKey;
            if (key == null)
            {
                return false;
            }
            if (VehicleOrderId != key.VehicleOrderId || DriverId != key.DriverId)
            {
                return false;
            }
            return true;
        }
    }


    [ActiveRecord("VehicleOrderDrivers")]
    public class VehicleOrderDriver : ActiveRecordBase<VehicleOrderDriver>
    {

        [CompositeKey, JsonIgnore]
        public VehicleOrderDriverKey key { get; set; }

        [JsonIgnore]
        private Driver _Driver;

        [Property]
        public DateTime? IsHoliday { get; set; }

        [Property,AllowBlank]
        public bool? IsSick { get; set; }

        public int VehicleOrderId
        {
            get { return key.VehicleOrderId; }
            set { if (key == null) key = new VehicleOrderDriverKey(); key.VehicleOrderId = value; }
        }

        [BelongsTo("DriverId", Update = false, Insert = false)]
        public Driver Driver
        {
            get
            {
                return _Driver;
            }
            set
            {
                _Driver = value;
                if (key == null) key = new VehicleOrderDriverKey();
                key.DriverId = value.DriverId;
            }
        }

        public string id
        {
            get
            {
                return key.DriverId.ToString()+"_"+key.VehicleOrderId.ToString();
            }
        }

    }






}
