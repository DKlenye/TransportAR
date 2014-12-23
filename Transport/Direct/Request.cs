using System;
using System.Collections.Generic;
using System.Linq;
using Castle.Core;
using Ext.Direct;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NHibernate.Criterion;
using Kdn.Direct;
using Transport.Models;

namespace Transport.Direct
{
    public partial class Direct
    {



        [DirectMethod]
        [ParseAsJson]
        public DataSerializer VehicleOrderUpdate(JObject o)
        {

            var type = typeof (VehicleOrder);
            var models = getModels(o);
            var rezult = new List<object>();

            foreach (var model in models)
            {
                var instance = (VehicleOrder)JsonConvert.DeserializeObject(model.ToString(), type);
                

                instance.Customers.ForEach(x =>
                {
                    if (String.IsNullOrEmpty(x.DepartureTime))
                    {
                        x.DepartureTime = instance.DepartureDate.TimeOfDay.ToString().Substring(0,5);
                    }
                });

                instance.UpdateAndFlush();
                instance.Refresh();
                rezult.Add(instance);
            }

            return new DataSerializer(rezult);
        }

        /*
      [DirectMethod]
      [ParseAsJson]
       public DataSerializer RequestRead(JObject o)
       {
           JToken p;           
           
          var start = o["start"].Value<int>();
          var limit = o["limit"].Value<int>();
          
          var db = new PetaPoco.Database("db2");
           var rez = db.Query<RequestDTO>(@"
            select 
	            r.Status,
	            r.UserFio,
	            r.RequestId,
	            r.RequestDate,
	            r.PublishDate,
                c.CustomerName,
	            case when rc.RequestId is not null then 'Кран' when rf.RequestId is not null then 'Грузовой' else 'Пассажирский' end RequestType
            from Request r
            left join RequestCrane rc on rc.RequestId = r.RequestId
            left join RequestFreight rf on rf.RequestId = r.RequestId
            left join RequestPassengers rp on rp.RequestId = r.RequestId
            left join Customer c on c.CustomerId = r.CustomerId
            where r.IsDeleted = 0 order by r.RequestId desc
           ");
           return new DataSerializer(new List<RequestDTO>(rez));
       }*/


        [DirectMethod]
        [ParseAsJson]
        public DataSerializer RequestLoad(JObject o)
        {
            var id = o["id"].Value<int>();
            var request = Request.Find(id);

            return new DataSerializer(new List<object>() {request});
        }


        [DirectMethod]
        [ParseAsJson]
        public DataSerializer RefreshRequests(JObject o)
        {
            var list = new List<object>();
            var requests = o["requests"].Value<JArray>();

            foreach (var r in requests)
            {
                var obj = JsonConvert.DeserializeObject<v_Request>(r.ToString());
                obj.Refresh();
                list.Add(obj);
            }

            return new DataSerializer(list);
        }


        [DirectMethod]
        [ParseAsJson]
        public DataSerializer ConfirmRequests(JObject o)
        {
            var a = getModels(o);
            var isAccept = o["isAccept"].Value<bool>();
            var message = o["message"].Value<string>();

            var list = new List<object>();

            foreach (var _a in a)
            {
                var dto = JsonConvert.DeserializeObject<v_Request>(_a.ToString());
                var request = Request.Find(dto.RequestId);

                var status = isAccept ? RequestStatus.Confirm : RequestStatus.Return;

                request.Status = status;
                request.Events.Add(new RequestEvent()
                {
                    EventDate = DateTime.Now,
                    Message = message,
                    Status = status,
                    Request = request
                });

                request.SaveAndFlush();

                dto.Status = status;

                //dto.Refresh();

                list.Add(dto);
            }

            return new DataSerializer(list);
        }



        [DirectMethod]
        [ParseAsJson]
        public DataSerializer CreateOrders(JObject o)
        {
            var date = o["date"].Value<DateTime>();
            VehicleOrder.Create(date);
            return new DataSerializer(new List<object>());
        }




        public class AddOrderDto
        {
            public GroupRequest GroupRequest { get; set; }
            public BaseVehicle Vehicle { get; set; }
            public DateTime Date { get; set; }
        }

        [DirectMethod]
        public VehicleOrder AddOrder(AddOrderDto dto)
        {

           var o =  VehicleOrder.FindFirst(
                Expression.Where<VehicleOrder>(
                    x =>
                        x.Vehicle.VehicleId == dto.Vehicle.VehicleId &&
                        (x.DepartureDate >= dto.Date && x.DepartureDate <= dto.Date.AddDays(1))));

            if (o == null)
            {
                var car = (FullCar)FullCar.Find(dto.Vehicle.VehicleId);

                
                if (car.GroupRequestId == null)
                {
                    car.GroupRequestId = dto.GroupRequest.GroupRequestId;
                    car.SaveAndFlush();
                }

                TimeSpan departureTime;
                TimeSpan returnTime;

                TimeSpan.TryParse(car.StartWork, out departureTime);
                TimeSpan.TryParse(car.EndWork, out returnTime);

                o = new VehicleOrder()
                {
                    DepartureDate = dto.Date.Add(departureTime.Hours == 0 ? TimeSpan.Parse("08:00") : departureTime),
                    ReturnDate = dto.Date.Add(returnTime.Hours == 0 ? TimeSpan.Parse("16:45") : returnTime),
                    ScheduleId = car.ScheduleId == null ? 1 : car.ScheduleId.Value,
                    Vehicle = BaseVehicle.Find(dto.Vehicle.VehicleId), 
                    Shift = 1
                };

                o.Save();

                if (car.Customer != null)
                {
                    o.Customers.Add(new VehicleOrderCustomer()
                    {
                        Customer = car.Customer,
                        VehicleOrderId = o.VehicleOrderId
                    });
                }

                if (car.ResponsibleDriver != null)
                {
                    o.Drivers.Add(new VehicleOrderDriver()
                    {
                        Driver = car.ResponsibleDriver,
                        VehicleOrderId = o.VehicleOrderId
                    });
                }

                o.Save();

            }


            if (
                MaintenanceRequest.FindVehicleInMaintenance(dto.Date).Any(x => x.Car.VehicleId == o.Vehicle.VehicleId))
            {
                o.IsInMaintenance = true;
            }
            
            return o;
        }

        [DirectMethod]
        [ParseAsJson]
        public DataSerializer OrderRead(JObject o)
        {
            var date = o["date"].Value<DateTime>();
            var orders =
                VehicleOrder.FindAll(
                    Expression.Where<VehicleOrder>(x => x.DepartureDate >= date && x.DepartureDate <= date.AddDays(1)));


            var maintenance = MaintenanceRequest.FindVehicleInMaintenance(date);
            var maintenanceMap = maintenance.Select(m => m.Car.VehicleId).ToList();
            
            orders.ForEach(x =>
            {
                x.IsInMaintenance = maintenanceMap.Contains(x.Vehicle.VehicleId);
            });
            
            return new DataSerializer(orders);
        }




        [DirectMethod]
        public Waybill InsertWaybillByOrder(int VehicleOrderId)
        {
            var order = VehicleOrder.Find(VehicleOrderId);
            var car = (FullCar)FullCar.Find(order.Vehicle.VehicleId);
            
            var waybill = new Waybill()
            {
                WaybillId = 0,
                Position = Waybill.GetMaxPosition(order.Vehicle.VehicleId),
                WaybillState = 1,
                WaybillTypeId = car.WaybillTypeId.Value,
                Car = order.Vehicle,
                TrailerId = car.TrailerId,
                DepartureDate = order.DepartureDate,
                ReturnDate = order.ReturnDate.Value,
                ScheduleId = order.ScheduleId,
                Shift = order.Shift
            };

            waybill.Save();
            waybill.SetPosition();
            order.WaybillId = waybill.WaybillId;
            order.SaveAndFlush();

            var prevWaybill = waybill.Prev();
            if (prevWaybill != null)
            {
                prevWaybill.MoveRemains(waybill, prevWaybill.WaybillState < 2);
            }
            else
            {
                waybill.SetRemains();
            }

            order.Drivers.ForEach(x =>
            {
                var waybillDriver = new WaybillDriver()
                {
                    WaybillId = waybill.WaybillId,
                    Driver = x.Driver
                };
                waybillDriver.Save();

                waybill.ResponsibleDriver = waybillDriver.Driver;

            });

            var norm = Norm.FindActualNorms(waybill.Car.VehicleId, waybill.DepartureDate).FirstOrDefault(x => x.isMain);
            int fuelId = 0;
            if (norm != null)
            {
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


                order.Customers.ForEach(customer =>
                {
                    var task = new WaybillTask()
                    {
                        WaybillId = waybill.WaybillId,
                        TaskDepartureDate = waybill.DepartureDate,
                        Customer = customer.Customer,
                        NormConsumptionId = norm.NormId,
                        FuelId = fuelId,
                        TrailerId = waybill.TrailerId,
                        isTruck = waybill.Car.isTruck()
                    };

                    task.Save();
                    task.CheckDefaultIncreases();

                });

            }

            return waybill;
        }



    }

}
