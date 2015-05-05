using System;
using System.Collections.Generic;
using System.Linq;
using Castle.Core;
using Ext.Direct;
using Kdn.Direct;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Transport.Models;
using Transport.Models.request;
using Expression = NHibernate.Criterion.Expression;

namespace Transport.Direct
{
    public static class EnumerableExtensions
    {
        public static Dictionary<TKey, T> Map<TKey, T>(this IEnumerable<T> collection, Func<T, TKey> keyfunc)
        {
            var d = new Dictionary<TKey, T>();
            collection.ForEach(x =>
            {
                var key = keyfunc(x);
                if (!d.ContainsKey(key))
                {
                    d.Add(keyfunc(x), x);
                }
            });
            return d;
        }
    }


    public class WaybillInsertDto
    {
        public int ListDetailId { get; set; }
        public BaseVehicle Vehicle { get; set; }
        public DateTime DepartureDate { get; set; }
        public DateTime ReturnDate { get; set; }
        public int ScheduleId { get; set; }
        public short Shift { get; set; }
        public int? TrailerId { get; set; }
        public int WaybillTypeId { get; set; }

        public int? DstRoutePoint { get; set; }
        public int? SrcRoutePoint { get; set; }

        public Driver[] Drivers { get; set; }
        public Customer[] Customers { get; set; }
    }




    [Model]
    public class DistributionListDto
    {
        public DistributionListDto()
        {
            Customers = new List<DistributionCustomerDto>();
            Drivers = new List<DistributionDriverDto>();
        }

        [IdProperty]
        public int ListDetailId { get; set; }

        public int ListId { get; set; }
        public BaseVehicle Vehicle { get; set; }
        public DateTime DepartureDate { get; set; }
        public DateTime ReturnDate { get; set; }
        public int ScheduleId { get; set; }
        public short Shift { get; set; }
         [AllowBlank]
        public int[] Waybills { get; set; }
        public int? TrailerId { get; set; }

        [AllowBlank]
        public string Description { get; set; }

        [AllowBlank]
        public string DestRoutePoint { get; set; }

        [AllowBlank]
        public ICollection<DistributionCustomerDto> Customers { get; set; }

        [AllowBlank]
        public ICollection<DistributionDriverDto> Drivers { get; set; }

        public bool? IsInMaintenance { get; set; }

        public DateTime? LastChange { get; set; }
        [AllowBlank]
        public int[] ApproveWaybills { get; set; }
    }

    public class DistributionCustomerDto
    {
        public int Id { get; set; }
        public int? ListDetailId { get; set; }
        public Customer Customer { get; set; }
        public int? RequestId { get; set; }
        public string DepartureTime { get; set; }
        public string ReturnTime { get; set; }
        public string Description { get; set; }
        public string WorkObject { get; set; }
    }


    public class DistributionDriverDto
    {
        public Driver Driver { get; set; }
        public string Description { get; set; }
        public OutOfWorkCause Cause { get; set; }
        public DateTime? Start { get; set; }
        public DateTime? End { get; set; }
    }

    public class DriversVacation
    {
        public int DriverId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }


    public partial class Direct
    {
        [DirectMethod]
        [ParseAsJson]
        public DataSerializer DistributionListRead(JObject o)
        {
            var date = o["date"].Value<DateTime>();

            var maintenanceMap = MaintenanceRequest.FindVehicleInMaintenance(date).Map(x => x.Car.VehicleId);
            var businessTripMap = DistributionList.FindBusinessTripDetailsForDate(date).Map(x => x.Car.VehicleId);
            var vacationMap =
                db.Query<DriversVacation>(";EXEC DriversVacation_Select @0 ,@1", date, 0).Map(x => x.DriverId);
            var outOfWorkMap = DriverOutOfWork.FindByDate(date).Map(x => x.Driver.DriverId);

            var list = DistributionList.FinByDate(date);
            if (list != null)
            {
                var details = list.FindDetails();
                return new DataSerializer(details.Select(x =>
                {
                    var dto = new DistributionListDto()
                    {
                        ListDetailId = x.ListDetailId,
                        ListId = list.ListId,
                        Description = x.Description,
                        Vehicle = x.Car,
                        ReturnDate = x.ReturnDate,
                        DepartureDate = list.ListDate.Add(TimeSpan.Parse(x.DepartureTime)),
                        Shift = x.Shift,
                        ScheduleId = x.ScheduleId,
                        DestRoutePoint = x.DestRoutePoint,
                        Waybills = x.Waybills.ToArray(),
                        ApproveWaybills = x.ApproveWaybills.ToArray(),
                        LastChange = x.LastChange,
                        TrailerId = x.TrailerId
                    };

                    if (businessTripMap != null && businessTripMap.ContainsKey(x.Car.VehicleId))
                    {
                        var b = businessTripMap[x.Car.VehicleId];

                        dto.ListDetailId = b.ListDetailId;
                        dto.DepartureDate = DistributionList.Find(b.ListId)
                            .ListDate.Add(TimeSpan.Parse(b.DepartureTime));
                        dto.ReturnDate = b.ReturnDate;
                        dto.ScheduleId = b.ScheduleId;
                        dto.Description = b.Description;
                        dto.DestRoutePoint = b.DestRoutePoint;

                        b.Customers.ForEach(customer => dto.Customers.Add(new DistributionCustomerDto()
                        {
                            Id = customer.Id,
                            Customer = customer.Customer,
                            DepartureTime = customer.DepartureTime,
                            Description = customer.Description,
                            WorkObject = customer.WorkObject,
                            ListDetailId = customer.ListDetailId,
                            RequestId = customer.RequestId,
                            ReturnTime = customer.ReturnTime
                        }));
                        b.Drivers.ForEach(driver =>
                        {
                            var driverDto = new DistributionDriverDto()
                            {
                                Driver = driver.Driver,
                                Description = driver.Description
                            };

                            if (vacationMap.ContainsKey(driver.Driver.DriverId))
                            {
                                var v = vacationMap[driver.Driver.DriverId];
                                driverDto.Cause = OutOfWorkCause.Vacation;
                                driverDto.Start = v.StartDate;
                                driverDto.End = v.EndDate;
                            }

                            if (outOfWorkMap.ContainsKey(driver.Driver.DriverId))
                            {
                                var oow = outOfWorkMap[driver.Driver.DriverId];
                                driverDto.Cause = oow.Cause;
                                driverDto.Start = oow.StartDate;
                                driverDto.End = oow.EndDate;
                            }

                            dto.Drivers.Add(driverDto);

                        });

                        return dto;

                    }

                    x.Drivers.ForEach(d =>
                    {
                        var driverDto = new DistributionDriverDto() {Driver = d.Driver,Description = d.Description};

                        if (vacationMap.ContainsKey(d.Driver.DriverId))
                        {
                            var v = vacationMap[d.Driver.DriverId];
                            driverDto.Cause = OutOfWorkCause.Vacation;
                            driverDto.Start = v.StartDate;
                            driverDto.End = v.EndDate;
                        }

                        if (outOfWorkMap.ContainsKey(d.Driver.DriverId))
                        {
                            var oow = outOfWorkMap[d.Driver.DriverId];
                            driverDto.Cause = oow.Cause;
                            driverDto.Start = oow.StartDate;
                            driverDto.End = oow.EndDate;
                        }

                        dto.Drivers.Add(driverDto);

                    });

                    if (maintenanceMap != null && maintenanceMap.ContainsKey(x.Car.VehicleId))
                    {
                        var m = maintenanceMap[x.Car.VehicleId];
                        dto.IsInMaintenance = true;
                        dto.DepartureDate = m.RequestDate.Value;
                        
                    }

                    x.Customers.ForEach(customer => dto.Customers.Add(new DistributionCustomerDto()
                    {
                        Id = customer.Id,
                        Customer = customer.Customer,
                        DepartureTime = customer.DepartureTime,
                        Description = customer.Description,
                        WorkObject = customer.WorkObject,
                        ListDetailId = customer.ListDetailId,
                        RequestId = customer.RequestId,
                        ReturnTime = customer.ReturnTime
                    }));

                    return dto;
                }).ToList());
            }

            return new DataSerializer(new object[] {});
        }

        [DirectMethod]
        public DistributionListDto DistributionListDetailRead(int listDetailId)
        {

            var dto = new DistributionListDto();
            var detail = DistributionListDetails.Find(listDetailId);
            var list = DistributionList.Find(detail.ListId);


            var maintenance = MaintenanceRequest.FindByVehicle(detail.Car, list.ListDate);
            var businessTrip = DistributionList.FindBusinessTripVehicleDetailsForDate(detail.Car, list.ListDate);
            var vacationMap =
                db.Query<DriversVacation>(";EXEC DriversVacation_Select @0 ,@1", list.ListDate, 0).Map(x => x.DriverId);
            var outOfWorkMap = DriverOutOfWork.FindByDate(list.ListDate).Map(x => x.Driver.DriverId);


            dto.ListDetailId = detail.ListDetailId;
            dto.ListId = detail.ListId;
            dto.Vehicle = detail.Car;
            dto.Description = detail.Description;
            dto.ScheduleId = detail.ScheduleId;
            dto.Shift = detail.Shift;
            dto.ReturnDate = detail.ReturnDate;
            dto.DepartureDate = list.ListDate.Add(TimeSpan.Parse(detail.DepartureTime));
            dto.DestRoutePoint = detail.DestRoutePoint;
            dto.Waybills = detail.Waybills.ToArray();
            dto.ApproveWaybills = detail.ApproveWaybills.ToArray();
            dto.LastChange = detail.LastChange;
            dto.TrailerId = detail.TrailerId;

            if (businessTrip != null)
            {
                dto.ListDetailId = businessTrip.ListDetailId;
                dto.DepartureDate =
                    DistributionList.Find(businessTrip.ListId).ListDate.Add(TimeSpan.Parse(businessTrip.DepartureTime));
                dto.ScheduleId = businessTrip.ScheduleId;
                dto.Description = businessTrip.Description;
                dto.DestRoutePoint = businessTrip.DestRoutePoint;
                dto.ReturnDate = businessTrip.ReturnDate;

                businessTrip.Customers.ForEach(customer => dto.Customers.Add(new DistributionCustomerDto()
                {
                    Id = customer.Id,
                    Customer = customer.Customer,
                    DepartureTime = customer.DepartureTime,
                    WorkObject = customer.WorkObject,
                    Description = customer.Description,
                    ListDetailId = customer.ListDetailId,
                    RequestId = customer.RequestId,
                    ReturnTime = customer.ReturnTime
                }));
                businessTrip.Drivers.ForEach(d =>
                {
                    var driverDto = new DistributionDriverDto() { Driver = d.Driver, Description = d.Description };

                    if (vacationMap.ContainsKey(d.Driver.DriverId))
                    {
                        var v = vacationMap[d.Driver.DriverId];
                        driverDto.Cause = OutOfWorkCause.Vacation;
                        driverDto.Start = v.StartDate;
                        driverDto.End = v.EndDate;
                    }

                    if (outOfWorkMap.ContainsKey(d.Driver.DriverId))
                    {
                        var oow = outOfWorkMap[d.Driver.DriverId];
                        driverDto.Cause = oow.Cause;
                        driverDto.Start = oow.StartDate;
                        driverDto.End = oow.EndDate;
                    }

                    dto.Drivers.Add(driverDto);
                });

                return dto;

            }

            detail.Drivers.ForEach(d =>
            {
                var driverDto = new DistributionDriverDto() {Driver = d.Driver,Description = d.Description};

                if (vacationMap.ContainsKey(d.Driver.DriverId))
                {
                    var v = vacationMap[d.Driver.DriverId];
                    driverDto.Cause = OutOfWorkCause.Vacation;
                    driverDto.Start = v.StartDate;
                    driverDto.End = v.EndDate;
                }

                if (outOfWorkMap.ContainsKey(d.Driver.DriverId))
                {
                    var oow = outOfWorkMap[d.Driver.DriverId];
                    driverDto.Cause = oow.Cause;
                    driverDto.Start = oow.StartDate;
                    driverDto.End = oow.EndDate;
                }

                dto.Drivers.Add(driverDto);
            });

            if (maintenance != null)
            {
                dto.IsInMaintenance = true;
                dto.DepartureDate = maintenance.RequestDate.Value;
                
            }

            detail.Customers.ForEach(customer => dto.Customers.Add(new DistributionCustomerDto()
            {
                Id = customer.Id,
                Customer = customer.Customer,
                DepartureTime = customer.DepartureTime,
                Description = customer.Description,
                WorkObject = customer.WorkObject,
                ListDetailId = customer.ListDetailId,
                RequestId = customer.RequestId,
                ReturnTime = customer.ReturnTime
            }));

            return dto;

        }


        [DirectMethod]
        [ParseAsJson]
        public DataSerializer DistributionListUpdate(JObject o)
        {
            var models = getModels(o);
            var rezult = new List<object>();

            foreach (var model in models)
            {
                var dto = JsonConvert.DeserializeObject<DistributionListDto>(model.ToString());

                var detail = DistributionListDetails.Find(dto.ListDetailId);

                detail.Car = dto.Vehicle;
                detail.DepartureTime = dto.DepartureDate.ToString("HH:mm");
                detail.ReturnDate = dto.ReturnDate;
                detail.Description = dto.Description;
                detail.DestRoutePoint = dto.DestRoutePoint;
                detail.ScheduleId = dto.ScheduleId;
                detail.Shift = dto.Shift;
                detail.TrailerId = dto.TrailerId;

                var customersMap = detail.Customers.Map(x => x.Id);

                dto.Customers.ForEach(x =>
                {
                    if (customersMap.ContainsKey(x.Id))
                    {
                        var customer = customersMap[x.Id];
                        customer.RequestId = x.RequestId;
                        customer.ReturnTime = x.ReturnTime;
                        customer.DepartureTime = x.DepartureTime;
                        customer.WorkObject = x.WorkObject;
                        customer.Customer = x.Customer;
                        customer.Description = x.Description;

                        customersMap.Remove(x.Id);
                    }
                    else
                    {
                        detail.Customers.Add(
                            new DistributionCustomers()
                            {
                                Customer = x.Customer,
                                DepartureTime = x.DepartureTime,
                                WorkObject = x.WorkObject,
                                Description = x.Description,
                                ListDetailId = detail.ListDetailId,
                                RequestId = x.RequestId,
                                ReturnTime = x.ReturnTime
                            });
                    }
                });

                customersMap.ForEach(x => detail.Customers.Remove(x.Value));


                var driversMap = detail.Drivers.Map(x => x.Driver.DriverId);

                dto.Drivers.ForEach(x =>
                {
                    if (driversMap.ContainsKey(x.Driver.DriverId))
                    {
                        var driver = driversMap[x.Driver.DriverId];
                        driver.Description = x.Description;
                        driversMap.Remove(x.Driver.DriverId);
                    }
                    else
                    {
                        detail.Drivers.Add(
                            new DistributionDrivers()
                            {
                                Driver = x.Driver,
                                Description = x.Description,
                                ListDetailId = detail.ListDetailId
                            });
                    }
                });

                driversMap.ForEach(x => detail.Drivers.Remove(x.Value));

                detail.LastChange = DateTime.Now;

                detail.ApproveWaybills.Clear();

                detail.SaveAndFlush();
                detail.Refresh();

                var listDto = DistributionListDetailRead(detail.ListDetailId);
                rezult.Add(listDto);
            }

            return new DataSerializer(rezult);
        }

        [DirectMethod]
        public DataSerializer DistributionListCreate(DateTime date)
        {
            DistributionList.CreateList(date);
            return new DataSerializer(new Object[] {});
        }

        [DirectMethod]
        [ParseAsJson]
        public DataSerializer DistributionListDestroy(JObject o)
        {
            var models = getModels(o);

            foreach (var model in models)
            {
                var dto = JsonConvert.DeserializeObject<DistributionListDto>(model.ToString());
                var detail = DistributionListDetails.Find(dto.ListDetailId);

                db.Execute("delete from DistributionDrivers where ListDetailId = @0", detail.ListDetailId);
                db.Execute("delete from DistributionCustomers where ListDetailId = @0", detail.ListDetailId);
                db.Execute("delete from DistributionListDetails where ListDetailId = @0", detail.ListDetailId);

            }

            return new DataSerializer(new Object[] {});
        }
        
        public class AddOrderDto
        {
            public GroupRequest GroupRequest { get; set; }
            public BaseVehicle Vehicle { get; set; }
            public DateTime Date { get; set; }
        }

        [DirectMethod]
        public DistributionListDto DistributionListAdd(AddOrderDto dto)
        {

            var list = DistributionList.FinByDate(dto.Date);
            var detail =
                DistributionListDetails.FindFirst(
                    Expression.Where<DistributionListDetails>(
                        x => x.ListId == list.ListId && x.Car.VehicleId == dto.Vehicle.VehicleId));

            if (detail == null)
            {
                var car = (FullCar) FullCar.Find(dto.Vehicle.VehicleId);

                if (car.GroupRequestId == null)
                {
                    car.GroupRequestId = dto.GroupRequest.GroupRequestId;
                    car.SaveAndFlush();
                }

                TimeSpan departureTime;
                TimeSpan returnTime;

                TimeSpan.TryParse(car.StartWork, out departureTime);
                TimeSpan.TryParse(car.EndWork, out returnTime);


                detail = new DistributionListDetails()
                {
                    ListId = list.ListId,
                    DepartureTime =
                        dto.Date.Add(departureTime.Hours == 0 ? TimeSpan.Parse("08:00") : departureTime)
                            .ToString("HH:mm"),
                    ReturnDate = dto.Date.Add(returnTime.Hours == 0 ? TimeSpan.Parse("16:45") : returnTime),
                    ScheduleId = car.ScheduleId == null ? 1 : car.ScheduleId.Value,
                    Car = BaseVehicle.Find(dto.Vehicle.VehicleId),
                    Shift = 1
                };

                detail.Save();

                if (car.Customer != null)
                {
                    detail.Customers.Add(new DistributionCustomers()
                    {
                        ListDetailId = detail.ListDetailId,
                        Customer = car.Customer,
                        DepartureTime = detail.DepartureTime
                    });

                }

                if (car.ResponsibleDriver != null)
                {
                    detail.Drivers.Add(new DistributionDrivers(){Driver = car.ResponsibleDriver});
                }

                detail.SaveAndFlush();

            }

            return DistributionListDetailRead(detail.ListDetailId);

        }

        [DirectMethod]
        public DataSerializer JoinRequests(int listDetailId, string requests)
        {

            var detail = DistributionListDetails.Find(listDetailId);
            var requestMap = detail.Customers.Map(x=>x.RequestId??0);
            
            var r = requests.Split(',');
            r.ForEach(x =>
            {
                var request = Request.Find(int.Parse(x));

                if (request.Status != RequestStatus.Confirm)
                {
                    request.Confirm("");
                    request.SaveAndFlush();
                }

                if (!requestMap.ContainsKey(request.RequestId))
                {
                    var customer = new DistributionCustomers()
                    {
                        Customer = request.Customer,
                        ListDetailId = detail.ListDetailId,
                        RequestId = request.RequestId,
                        DepartureTime = detail.DepartureTime
                    };
                    customer.Save();
                    detail.Customers.Add(customer);
                    detail.LastChange = DateTime.Now;
                }
            });

            return new DataSerializer(new Object[] { });
        }


        [DirectMethod]
        public Waybill InsertWaybillByDetail(WaybillInsertDto dto)
        {

           
            var car = (FullCar)FullCar.Find(dto.Vehicle.VehicleId);
            var detail = DistributionListDetails.Find(dto.ListDetailId);

            var waybill = new Waybill()
            {
                WaybillId = 0,
                Position = Waybill.GetMaxPosition(car.VehicleId),
                WaybillState = 1,
                WaybillTypeId = car.WaybillTypeId.Value,
                Car = dto.Vehicle,
                TrailerId = dto.TrailerId,
                DepartureDate = dto.DepartureDate,
                ReturnDate = dto.ReturnDate,
                ScheduleId = dto.ScheduleId,
                Shift = dto.Shift,
                
            };

            waybill.Save();
            waybill.SetPosition();
            
            detail.Waybills.Add(waybill.WaybillId);
            detail.ApproveWaybills.Add(waybill.WaybillId);
            detail.SaveAndFlush();



            var prevWaybill = waybill.Prev();
            if (prevWaybill != null)
            {
                prevWaybill.MoveRemains(waybill, prevWaybill.WaybillState < 2);
            }
            else
            {
                waybill.SetRemains();
            }

            dto.Drivers.ForEach(d =>
            {
                    var waybillDriver = new WaybillDriver()
                    {
                        WaybillId = waybill.WaybillId,
                        Driver = d
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


                dto.Customers.ForEach(customer =>
                {
                    var task = new WaybillTask()
                    {
                        WaybillId = waybill.WaybillId,
                        TaskDepartureDate = waybill.DepartureDate,
                        Customer = customer,
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

        
        [DirectMethod]
        public void ApproveWaybill(int waybillId, int listDetailId)
        {
            var detail = DistributionListDetails.Find(listDetailId);
            if (detail.ApproveWaybills.Contains(waybillId))
            {
                detail.ApproveWaybills.Remove(waybillId);
            }
            else
            {
                detail.ApproveWaybills.Add(waybillId);
            }
            detail.SaveAndFlush();
        }


    }
}
