using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Castle.ActiveRecord;
using Castle.ActiveRecord.Queries;
using Castle.Core;
using Kdn.Ext.Attributes;
using NHibernate.Criterion;
using Newtonsoft.Json.Linq;
using Transport.Models.waybill;
using Expression = NHibernate.Criterion.Expression;

namespace Transport.Models
{

    public enum WaybillState
    {
        Open,
        DispClose,
        AccClose
    }

    [Model, ActiveRecord]
    public class Waybill : ActiveRecordBase<Waybill>, Interfaces.IOwnered
    {

        [IdProperty, PrimaryKey]
        public int WaybillId { get; set; }

        [BelongsTo("VehicleId", UniqueKey = "VehiclePosition_idx")]
        public BaseVehicle Car { get; set; }

        [Property(UniqueKey = "VehiclePosition_idx")]
        public int Position { get; set; }

        [BelongsTo("DriverId")]
        public Driver ResponsibleDriver { get; set; }

        [Property]
        public DateTime DepartureDate { get; set; }

        [Property]
        public DateTime ReturnDate { get; set; }

        [AllowBlank, Property(Length = 20)]
        public string FormNumber { get; set; }

        [AllowBlank, Property(Update = false, Insert = false)]
        public int? WaybillNumber { get; set; }

        [Property]
        public int WaybillTypeId { get; set; }

        [Property]
        public int? PackageId { get; set; }

        [Property]
        public int? ScheduleId { get; set; }

        [Property]
        public short Shift { get; set; }

        [Property]
        public string Way { get; set; }

        [Property]
        public int? TrailerId { get; set; }

        //Состояние путевого листа
        [Property]
        public short? WaybillState { get; set; }

        [Property]
        public int? AccPeriod { get; set; }

        [Property]
        public int? UserClose { get; set; }

        [Property]
        public DateTime? WhenClose { get; set; }

        [Property]
        public DateTime? OrderDate { get; set; }

        [Property, AllowBlank]
        public string OrderNumber { get; set; }


        #region Owner

        public void setOwner(int OwnerId)
        {
        }

        public void readWithOwner(DetachedCriteria c, int owner)
        {
            c.CreateAlias("Car", "Car").Add(Expression.Eq("Car.OwnerId", owner));
        }

        #endregion


        [Property(Index = "idx_ReplicationId", Length = 30, Update = false, Insert = false)]
        public string ReplicationId { get; set; }

        [Property(Update = false, Insert = false)]
        public ReplicationSource? ReplicationSource { get; set; }



        //Установка позиции путевого листа
        public void SetPosition()
        {
            //Если путёвка вставляется между существующими путёвками, то NewPosition будет иметь значение
            int NewPosition = GetMinPosition(Car.VehicleId, DepartureDate);
            int OldPosition = Position;
            bool maxFlag = false;

            //Если NewPosition=0, то это означает, что путёвка будет устанавливаться в последнюю позицию,
            // т.е. дата путевого листа максимальная и она должна быть последней в списке
            if (NewPosition == 0)
            {
                NewPosition = GetMaxPosition(Car.VehicleId);
                //устанавливаем флаг , того что путёвка максимальная по позиции
                maxFlag = true;
            }

            if (OldPosition < NewPosition)
            {
                --NewPosition;
                if (OldPosition < NewPosition)
                {

                    Position = -1;
                    Update();

                    DecrementPosition(Car.VehicleId, OldPosition, NewPosition);

                    Position = NewPosition;
                    Update();
                }
            }
            else if (OldPosition > NewPosition)
            {

                Position = -1;
                Update();

                IncrementPosition(Car.VehicleId, NewPosition, OldPosition);

                Position = NewPosition;
                Update();
            }

        }

        public static void IncrementPosition(int VehicleId, int Start, int End)
        {
            SetWaybillsPosition("+", VehicleId, Start, End);
        }

        public static void DecrementPosition(int VehicleId, int Start, int End)
        {
            SetWaybillsPosition("-", VehicleId, Start, End);
        }

        private static void SetWaybillsPosition(string operation, int VehicleId, int Start, int End)
        {
            var query = String.Format(
                @" UPDATE Waybill SET Position = Position{0}1 WHERE VehicleId={1} AND Position BETWEEN {2} AND {3} ",
                operation,
                VehicleId,
                Start,
                End
                );

            var s = ActiveRecordMediator.GetSessionFactoryHolder().CreateSession(typeof (Waybill));
            s.CreateQuery(query).ExecuteUpdate();
        }

        public static Waybill FirstOpen(BaseVehicle Vehicle)
        {
            return FirstOpen(Vehicle.VehicleId);
        }

        public static Waybill FirstOpen(int VehicleId)
        {

            return FindFirst(
                Asc("Position"),
                Expression.Where<Waybill>(
                    x =>
                        x.Car.VehicleId == VehicleId &&
                        x.WaybillState == 1
                    )
                );

        }

        public static Waybill LastClose(int VehicleId)
        {

            return FindFirst(
                Desc("Position"),
                Expression.Where<Waybill>(
                    x =>
                        x.Car.VehicleId == VehicleId &&
                        x.WaybillState > 1
                    )
                );

        }

        public Waybill Next()
        {

            return FindFirst(
                Asc("Position"),
                Expression.Where<Waybill>(
                    x =>
                        x.Position > this.Position &&
                        x.Car.VehicleId == this.Car.VehicleId
                    )
                );

        }

        public Waybill Prev()
        {

            return FindFirst(
                Desc("Position"),
                Expression.Where<Waybill>(
                    x =>
                        x.Position < this.Position &&
                        x.Car.VehicleId == this.Car.VehicleId
                    )
                );

        }

        public bool isLast()
        {
            return !Exists(Expression.Where<Waybill>(x => x.Position > Position && x.Car == Car));
        }

        public bool isCurrent()
        {
            return WaybillState == 1 &&
                   !Exists(Expression.Where<Waybill>(x => x.Position < Position && x.Car == Car && x.WaybillState == 1));
        }


        //Поиск максимальной позиции в путевых листах
        public static int GetMaxPosition(int VehicleId)
        {

            var query = new ScalarQuery<int>(typeof (Waybill),
                @" SELECT max(Position) 
               FROM Waybill
               WHERE VehicleId = ?",
                VehicleId);
            int position = query.Execute();
            return ++position;

        }

        //Поиск минимальной позиции в путёвках с большей датой
        public static int GetMinPosition(int VehicleId, DateTime DepartureDate)
        {

            var query = new ScalarQuery<int>(typeof (Waybill),
                @" SELECT min(Position)
               FROM Waybill
               WHERE VehicleId = ? AND DepartureDate > ?",
                VehicleId,
                DepartureDate
                );
            return query.Execute();

        }




        public JObject FullInfo()
        {
            string[] details = new string[]
            {
                "WaybillCounter",
                "WaybillFuelRemain",
                "WaybillDriver",
                "WaybillTask",
                "VehicleRefuelling",
                "WaybillCustomerWorkingTime",
                "WaybillInvoice"
            };
            JObject obj = Info(details);

            obj["isLast"] = isLast();
            obj["isCurrent"] = isCurrent();
            return obj;
        }


        public JObject Info(params string[] details)
        {
            JObject obj = JObject.FromObject(this);

            Action<string> action = delegate(string s)
            {
                var type = Type.GetType("Transport.Models." + s);

                if (type.GetMethod("findByWaybillId") != null)
                {
                    var list = type.GetMethod("findByWaybillId").Invoke(null, new object[] {WaybillId});
                    JArray a = JArray.FromObject(list);
                    obj.Add(s, a);
                }
                else
                {
                    var list = ActiveRecordMediator.FindAllByProperty(type, "WaybillId", WaybillId);
                    JArray a = JArray.FromObject(list);
                    obj.Add(s, a);
                }



            };

            foreach (var detail in details) action(detail);
            return obj;

        }


        public void SetRemains()
        {

            var destRemains = WaybillFuelRemain.findByWaybillId(WaybillId);
            var destCounters = WaybillCounter.findByWaybillId(WaybillId);

            var remainsMap = new Dictionary<int, WaybillFuelRemain>();
            var countersMap = new Dictionary<int, WaybillCounter>();

            foreach (var rem in destRemains)
            {
                remainsMap.Add(rem.FuelId, rem);
            }

            foreach (var cou in destCounters)
            {
                countersMap.Add(cou.CounterId, cou);
            }

            var norms = Norm.FindAll(Expression.Where<Norm>(x => x.Car == this.Car));

            foreach (var norm in norms)
            {
                foreach (var fuel in norm.NormFuels)
                {
                    if (!remainsMap.ContainsKey(fuel))
                    {
                        var remain = new WaybillFuelRemain()
                        {
                            WaybillId = WaybillId,
                            FuelId = fuel,
                            DepartureRemain = 0
                        };

                        remainsMap.Add(fuel, remain);
                        remain.SaveAndFlush();
                    }
                }

                if (norm.CounterId != null)
                {
                    if (!countersMap.ContainsKey(norm.CounterId.Value))
                    {
                        var counter = new WaybillCounter()
                        {
                            WaybillId = WaybillId,
                            CounterId = norm.CounterId.Value,
                            Departure = 0,
                            isBroken = false
                        };
                        countersMap.Add(norm.CounterId.Value, counter);
                        counter.SaveAndFlush();
                    }
                }
            }



        }

        public void MoveRemains(Waybill targetWaybill)
        {
            MoveRemains(targetWaybill, false);
        }

        public void MoveRemains(Waybill targetWaybill, bool setEmpty)
        {

            var destRemains = WaybillFuelRemain.findByWaybillId(WaybillId);
            var destCounters = WaybillCounter.findByWaybillId(WaybillId);

            var targetRemains = WaybillFuelRemain.findByWaybillId(targetWaybill.WaybillId);
            var targetCounters = WaybillCounter.findByWaybillId(targetWaybill.WaybillId);

            var remainsMap = new Dictionary<int, WaybillFuelRemain>();
            var countersMap = new Dictionary<int, WaybillCounter>();

            foreach (var rem in targetRemains)
            {
                remainsMap.Add(rem.FuelId, rem);
            }

            foreach (var cou in targetCounters)
            {
                countersMap.Add(cou.CounterId, cou);
            }

            foreach (var rem in destRemains)
            {

                if (!remainsMap.ContainsKey(rem.FuelId))
                {

                    new WaybillFuelRemain()
                    {
                        WaybillId = targetWaybill.WaybillId,
                        FuelId = rem.FuelId,
                        DepartureRemain = setEmpty ? null : rem.ReturnRemain
                    }.SaveAndFlush();
                }
                else
                {
                    remainsMap[rem.FuelId].DepartureRemain = setEmpty ? null : rem.ReturnRemain;
                    remainsMap[rem.FuelId].SaveAndFlush();
                }
            }

            foreach (var cou in destCounters)
            {

                if (!countersMap.ContainsKey(cou.CounterId))
                {

                    new WaybillCounter()
                    {
                        WaybillId = targetWaybill.WaybillId,
                        CounterId = cou.CounterId,
                        Departure = setEmpty ? null : cou.Return,
                        isBroken = false
                    }.SaveAndFlush();
                }
                else
                {
                    countersMap[cou.CounterId].Departure = setEmpty ? null : cou.Return;
                    countersMap[cou.CounterId].SaveAndFlush();
                }
            }


        }

        public void DispClose()
        {

            var tasks = WaybillTask.FindByWaybill(WaybillId).ToList();

            if (tasks.Count > 1)
            {
                if (tasks.Any(x => x.Consumption == null))
                {
                    throw new Exception(
                        "Найдены выполненные работы, в которых нет расхода топлива, если эти строки не отображаются на экране обновите путевой лист и отредактируйте задания, после чего закройте путевой лист");
                }
            }


            var next = Next();
            if (next != null)
            {
                MoveRemains(next);
            }
            WaybillState = 2;
            UserClose = (User.GetCurrent()).UserId;
            WhenClose = DateTime.Now;
            CalcWorkingTime();
            CalcWaybillWork();
            CalcFactConsumption();
            SaveAndFlush();



            var db = new PetaPoco.Database("db2");


            var listDetailId = db.Fetch<int>(
                "SELECT listDetailId FROM DistributionListWaybills dlw WHERE dlw.WaybillId = @0",
                WaybillId);
            if (listDetailId.Count > 0)
            {
                var detail = DistributionListDetails.Find(listDetailId.First());
                detail.Customers.Where(x => x.RequestId != null).ForEach(x =>
                {
                    var request = Request.Find(x.RequestId);
                    request.Executed();
                });
            }
        }


        public void DispOpen()
        {
            var nextWaybills =
                Waybill.FindAll(
                    Expression.Where<Waybill>(x => x.WaybillState == 2 && x.Position > Position && x.Car == Car));

            foreach (var next in nextWaybills)
            {
                next.WaybillState = 1;
                next.ClearWorkingTime();
                next.ClearWaybillWork();
                next.SaveAndFlush();
            }

            WaybillState = 1;
            ClearWorkingTime();
            ClearWaybillWork();
            SaveAndFlush();

        }

        public void DeleteWaybill()
        {

            if (WaybillState > 1)
            {
                throw new Exception("Путевой лист закрыт. Удалять можно только открытые путевые листы.");
            }


            var prev = Prev();
            var next = Next();
            var position = Position;

            DeleteAndFlush();

            if (next != null)
            {

                if (prev.WaybillState > 1)
                {
                    prev.MoveRemains(next);
                }

                var query = String.Format(
                    @" UPDATE Waybill SET Position = Position-1 WHERE VehicleId={0} AND Position > {1} ",
                    next.Car.VehicleId,
                    position
                    );

                var s = ActiveRecordMediator.GetSessionFactoryHolder().CreateSession(typeof (Waybill));
                s.CreateQuery(query).ExecuteUpdate();
                s.Flush();
            }


        }


        public static Waybill GetPolymirWaybill(string id)
        {
            return Waybill.FindFirst(
                Expression.Where<Waybill>(
                    x =>
                        x.ReplicationId == id &&
                        x.ReplicationSource == Transport.ReplicationSource.dbfPolymir
                    )
                );
        }


        public static Waybill GetPolymirWaybill(string id, DateTime dvy)
        {
            return Waybill.FindFirst(
                Expression.Where<Waybill>(
                    x =>
                        x.ReplicationId == id &&
                        x.ReplicationSource == Transport.ReplicationSource.dbfPolymir &&
                        x.DepartureDate == dvy
                    )
                );
        }


        public void ClearWorkingTime()
        {
            var query = String.Format(
                @" Delete from WaybillWorkingTime where WaybillId = {0} ",
                WaybillId
                );

            var s = ActiveRecordMediator.GetSessionFactoryHolder().CreateSession(typeof (Waybill));
            s.CreateQuery(query).ExecuteUpdate();
        }

        public void ClearWaybillWork()
        {
            var query = String.Format(
                @" Delete from WaybillWork where WaybillId = {0} and ReplicationSource is null ",
                WaybillId
                );

            var s = ActiveRecordMediator.GetSessionFactoryHolder().CreateSession(typeof (Waybill));
            s.CreateQuery(query).ExecuteUpdate();
        }


        public int GetWorkingTimeMinutes()
        {
            int rezultMinutes = 0;

            var minutes = (int) (ReturnDate - DepartureDate).TotalMinutes;
            var daycount = (int) (ReturnDate - DepartureDate).TotalDays;

            var returnTime = TimeSpan.Parse("16:45");
            var departureTime = TimeSpan.Parse("08:00");

            var lunch8 = 45;
            var lunch12 = 60;

            var lunchMinutes = ((FullCar) FullCar.Find(Car.VehicleId)).DinnerMinutes;

            if (lunchMinutes != null)
            {
                lunch8 = lunchMinutes.Value;
                lunch12 = lunchMinutes.Value;
            }


            if (ScheduleId != null)
            {
                if (ScheduleId == 6)
                {
                    if (minutes < 60*20)
                    {
                        rezultMinutes += minutes;
                    }
                    else
                    {
                        var i = 0;
                        while (i <= daycount)
                        {
                            var min = 8*60;

                            if (i == 0)
                            {
                                if (DepartureDate.TimeOfDay > returnTime)
                                {
                                    min = (int) (DepartureDate.AddDays(1).Date - DepartureDate).TotalMinutes;
                                }
                                else
                                {
                                    min = (int) (DepartureDate.Date.Add(returnTime) - DepartureDate).TotalMinutes -
                                          lunch8;
                                }
                            }
                            else if (i == daycount)
                            {
                                if (ReturnDate.TimeOfDay < departureTime)
                                {
                                    min = (int) (ReturnDate - ReturnDate.Date).TotalMinutes;
                                }
                                else
                                {
                                    min = (int) (ReturnDate - ReturnDate.Date.Add(departureTime)).TotalMinutes - lunch8;
                                }
                            }

                            rezultMinutes += min;
                            i++;
                        }
                    }
                }

                else if (ScheduleId == 3 || ScheduleId == 4)
                {
                    if (minutes < 60*20)
                    {
                        rezultMinutes += minutes - (minutes >= 12*60 ? lunch12 : 0);
                    }
                    else
                    {
                        var Dates = new List<DateTime>();

                        CollectionExtensions.ForEach(
                            WaybillTask.FindAll(Expression.Where<WaybillTask>(x => x.WaybillId == WaybillId)), x =>
                            {
                                if (!Dates.Contains(x.TaskDepartureDate))
                                {
                                    rezultMinutes += 12*60;
                                    Dates.Add(x.TaskDepartureDate);
                                }
                            });
                    }
                }

                else if (ScheduleId == 1 || ScheduleId == 7)
                {
                    if (minutes < 60*20)
                    {
                        rezultMinutes += minutes - (minutes >= 525 ? lunch8 : 0);
                    }
                    else
                    {
                        var Dates = new List<DateTime>();

                        CollectionExtensions.ForEach(
                            WaybillTask.FindAll(Expression.Where<WaybillTask>(x => x.WaybillId == WaybillId)), x =>
                            {
                                var _date = x.TaskDepartureDate.Date;

                                if (!Dates.Contains(_date))
                                {
                                    rezultMinutes += 8*60;
                                    Dates.Add(_date);
                                }
                            });
                    }
                }

                else if (ScheduleId == 5)
                {
                    rezultMinutes += 12*60;
                }
            }

            return rezultMinutes;

        }


        public void CalcWorkingTime()
        {
            var minutes = (int) (ReturnDate - DepartureDate).TotalMinutes;
            var daycount = (int) (ReturnDate - DepartureDate).TotalDays;

            var _return = ReturnDate;
            var _departure = DepartureDate;

            var returnTime = TimeSpan.Parse("16:45");
            var departureTime = TimeSpan.Parse("08:00");

            var lunch8 = 45;
            var lunch12 = 60;

            var lunchMinutes = ((FullCar) FullCar.Find(Car.VehicleId)).DinnerMinutes;

            if (lunchMinutes != null)
            {
                lunch8 = lunchMinutes.Value;
                lunch12 = lunchMinutes.Value;
            }


            if (ScheduleId != null)
            {
                if (ScheduleId == 6)
                {
                    if (minutes < 60*20)
                    {
                        new WaybillWorkingTime(WaybillId, DepartureDate, minutes).SaveAndFlush();
                    }
                    else
                    {
                        var i = 0;
                        while (i <= daycount)
                        {
                            var min = 8*60;

                            if (i == 0)
                            {
                                if (DepartureDate.TimeOfDay > returnTime)
                                {
                                    min = (int) (DepartureDate.AddDays(1).Date - DepartureDate).TotalMinutes;
                                }
                                else
                                {
                                    min = (int) (DepartureDate.Date.Add(returnTime) - DepartureDate).TotalMinutes -
                                          lunch8;
                                }
                            }
                            else if (i == daycount)
                            {
                                if (ReturnDate.TimeOfDay < departureTime)
                                {
                                    min = (int) (ReturnDate - ReturnDate.Date).TotalMinutes;
                                }
                                else
                                {
                                    min = (int) (ReturnDate - ReturnDate.Date.Add(departureTime)).TotalMinutes - lunch8;
                                }
                            }

                            new WaybillWorkingTime(WaybillId, DepartureDate.Date.AddDays(i), min).SaveAndFlush();
                            i++;
                        }
                    }
                }

                else if (ScheduleId == 3 || ScheduleId == 4)
                {
                    if (minutes < 60*20)
                    {
                        new WaybillWorkingTime(WaybillId, DepartureDate, minutes - (minutes >= 12*60 ? lunch12 : 0))
                            .SaveAndFlush();
                    }
                    else
                    {
                        var Dates = new List<DateTime>();

                        CollectionExtensions.ForEach(
                            WaybillTask.FindAll(Expression.Where<WaybillTask>(x => x.WaybillId == WaybillId)), x =>
                            {
                                if (!Dates.Contains(x.TaskDepartureDate.Date))
                                {
                                    new WaybillWorkingTime(WaybillId, x.TaskDepartureDate, 12*60).SaveAndFlush();
                                    Dates.Add(x.TaskDepartureDate.Date);
                                }
                            });
                    }
                }

                else if (ScheduleId == 1 || ScheduleId == 7)
                {
                    if (minutes < 60*20)
                    {
                        new WaybillWorkingTime(WaybillId, DepartureDate, minutes - (minutes >= 525 ? lunch8 : 0))
                            .SaveAndFlush();
                    }
                    else
                    {
                        var Dates = new List<DateTime>();

                        CollectionExtensions.ForEach(
                            WaybillTask.FindAll(Expression.Where<WaybillTask>(x => x.WaybillId == WaybillId)), x =>
                            {
                                var _date = x.TaskDepartureDate.Date;

                                if (!Dates.Contains(_date))
                                {
                                    new WaybillWorkingTime(WaybillId, _date, 8*60).SaveAndFlush();
                                    Dates.Add(_date);
                                }
                            });
                    }
                }

                else if (ScheduleId == 5)
                {
                    new WaybillWorkingTime(WaybillId, DepartureDate, 12*60).SaveAndFlush();
                }
            }
        }





        public void CalcWaybillWork()
        {
            var Work = new Dictionary<int, WaybillWork>();

            var getWork = new Func<int, WaybillWork>(VehicleId =>
            {
                if (Work.ContainsKey(VehicleId))
                {
                    return Work[VehicleId];
                }
                var work = new WaybillWork()
                {
                    key = new WaybillWorkKey()
                    {
                        VehicleId = VehicleId,
                        WaybillId = WaybillId
                    },
                    WorkDate = ReturnDate,
                    Km = 0,
                    FactConsumption = 0,
                    MachineHour = 0,
                    MotoHour = 0,
                    NormConsumption = 0
                };

                Work.Add(VehicleId, work);
                return work;
            });


            var Tasks = WaybillTask.FindByWaybill(WaybillId);
            if (Tasks.Length == 0) return;


            var workTypeMap = WorkType.getMap();
            var workUnitMap = WorkUnit.getMap();
            var Norms = Norm.FindAll(Expression.Where<Norm>(x => x.Car == Car));
            var NormsMap = new Dictionary<int, Norm>();
            CollectionExtensions.ForEach(Norms, x => NormsMap.Add(x.NormId, x));

            CollectionExtensions.ForEach(Tasks, x =>
            {
                // var consumption = NormConsumption.FindByPrimaryKey(x.NormConsumptionId);

                if (x.NormConsumptionId != null)
                {
                    var waybillWork = getWork(Car.VehicleId);
                    var norm = NormsMap[x.NormConsumptionId.Value];
                    var workType = workTypeMap[norm.WorkTypeId];
                    var workUnit = workUnitMap[workType.WorkUnitId];

                    if (workUnit.WorkUnitId == 1)
                    {
                        waybillWork.Km += (x.WorkAmount ?? 0);
                    }
                    else if (workUnit.WorkUnitId == 2 || workUnit.WorkUnitId == 3)
                    {
                        var isMotoHour = norm.MotoToMachineKoef != null && norm.MotoToMachineKoef < 1;

                        if (isMotoHour)
                        {
                            waybillWork.MotoHour += (x.WorkAmount ?? 0);
                            waybillWork.MachineHour += (x.WorkAmount ?? 0)/norm.MotoToMachineKoef.Value;
                        }
                        else
                        {
                            waybillWork.MachineHour += (x.WorkAmount ?? 0);
                            waybillWork.MotoHour += (x.WorkAmount ?? 0);
                        }
                    }
                    waybillWork.NormConsumption += x.Consumption ?? 0;

                    if (x.TrailerId != null)
                    {
                        var trailerWork = getWork(x.TrailerId.Value);
                        if (workUnit.WorkUnitId == 1)
                        {
                            trailerWork.Km += (x.WorkAmount ?? 0);
                        }
                    }
                }
            });

            var departureRemain = WaybillFuelRemain.findByWaybillId(WaybillId).Sum(x => x.DepartureRemain ?? 0);
            var returnRemain = WaybillFuelRemain.findByWaybillId(WaybillId).Sum(x => x.ReturnRemain ?? 0);
            var refuelling =
                VehicleRefuelling.FindAll(Expression.Where<VehicleRefuelling>(x => x.WaybillId == WaybillId))
                    .Sum(x => x.Quantity);
            getWork(Car.VehicleId).FactConsumption = departureRemain + refuelling - returnRemain;
            CollectionExtensions.ForEach(Work, x => x.Value.SaveAndFlush());
        }

        //Рассчитать фактический расход топлива по каждому заданию
        public void CalcFactConsumption()
        {
            var remains = WaybillFuelRemain.findByWaybillId(WaybillId).ToList();
            var refuelling =
                VehicleRefuelling.FindAll(Expression.Where<VehicleRefuelling>(x => x.WaybillId == WaybillId));
            var factConsumption = new Dictionary<int, decimal>();
            var normConsumption = new Dictionary<int, decimal>();
            var tasks = WaybillTask.FindByWaybill(WaybillId).ToList();

            remains.ForEach(remain =>
            {

                if (remain.ReturnRemain == null)
                {
                    remain.ReturnRemain = 0;
                    remain.SaveAndFlush();
                }

                if (remain.DepartureRemain == null)
                {
                    remain.DepartureRemain = 0;
                    remain.SaveAndFlush();
                }

                factConsumption.Add(remain.FuelId,
                    remain.DepartureRemain.Value +
                    refuelling.Where(x => x.FuelId == remain.FuelId).Sum(x => x.Quantity) -
                    remain.ReturnRemain.Value
                    );

                normConsumption.Add(remain.FuelId,
                    tasks.Where(x => x.FuelId == remain.FuelId)
                        .Sum(x => x.Consumption != null ? x.Consumption.Value : 0)
                    );
            });


            tasks.ForEach(task =>
            {
                if (task.FuelId != null)
                {
                    var fuel = task.FuelId.Value;
                    if (task.Consumption != null && normConsumption.ContainsKey(fuel) && normConsumption[fuel] != null &&
                        normConsumption[fuel] != 0 && factConsumption.ContainsKey(fuel))
                    {
                        var k = factConsumption[fuel]/normConsumption[fuel];
                        task.FactConsumption = Decimal.Round(task.Consumption.Value*k, 2, MidpointRounding.AwayFromZero);
                        task.SaveAndFlush();
                    }
                }
            });

            foreach (var fact in factConsumption)
            {
                var tasksFact = tasks.Where(x => x.FuelId == fact.Key).Sum(x => x.FactConsumption);
                var factDiff = fact.Value - tasksFact;
                if (factDiff != 0)
                {
                    var firstTaskDiffFact = tasks.First(x => x.FuelId == fact.Key && x.FactConsumption != null);
                    firstTaskDiffFact.FactConsumption += factDiff;
                    firstTaskDiffFact.SaveAndFlush();
                }
            }
        }

        /// <summary>
        /// Поиск пересекающихся по дате путевых листов
        /// </summary>
        /// <returns>список путевых листов</returns>
        public Waybill[] FindIntersectionWaybills()
        {
            return FindAll(
                Restrictions.Where<Waybill>(
                    x =>
                        x.Car == Car && x.WaybillId != WaybillId &&
                        (
                            (x.DepartureDate >= DepartureDate && x.DepartureDate < ReturnDate) ||
                            (x.ReturnDate > DepartureDate && x.ReturnDate <= ReturnDate) ||
                            (x.DepartureDate <= DepartureDate && x.ReturnDate >= ReturnDate)
                            )
                    )
                );
        }

    }
}