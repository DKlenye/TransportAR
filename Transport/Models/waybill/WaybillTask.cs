using System;
using System.Collections.Generic;
using System.Linq;
using Castle.ActiveRecord;
using Castle.ActiveRecord.Queries;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using NHibernate.Criterion;
using Transport.Models.car;

namespace Transport.Models
{
    [Model, ActiveRecord]
    public class WaybillTask : ActiveRecordBase<WaybillTask>
    {
        public static int WinterIncreaseId = 2;
        public static int MhUnitId = 2;
        public static int KmUnitId = 1;
        public static decimal TonneKilometerConsumption = 1;
        public static int TkmWorkId = 4;

        public WaybillTask()
        {
            TaskIncreases = new List<WaybillTaskIncrease>();
        }

        [IdProperty, AllowBlank, PrimaryKey]
        public int TaskId { get; set; }

        [Property]
        public int WaybillId { get; set; }

        [AllowBlank, BelongsTo("CustomerId")]
        public Customer Customer { get; set; }

        [Property]
        public int? TrailerId { get; set; }

        [Property]
        public DateTime TaskDepartureDate { get; set; }

        public DateTime? TaskReturnDate { get; set; }

        [Property]
        public int? NormConsumptionId { get; set; }

        [Property]
        public int? NormId { get; set; }

        [Property]
        public int? FuelId { get; set; }

        [Property]
        public decimal? WorkAmount { get; set; }

        [Property]
        public decimal? WeightKm { get; set; }

        [Property]
        public decimal? Weight { get; set; }

        [Property]
        public int? Passengers { get; set; }

        [Property]
        public bool? isUnaccounted { get; set; }

        [Property]
        public bool? isTruck { get; set; }

        [Property]
        public bool? isLoad { get; set; }

        [AllowBlank, Property]
        public string CostCode { get; set; }

        [Property]
        public decimal? Temperature { get; set; }

        [Property]
        public decimal? Consumption { get; set; }

        //Пробег по Беларуси, если null то весь пробег по Беларуси (WorkAmount)
        [Property]
        public decimal? BYkm { get; set; }

        //маршрут
        [Property]
        public int? SrcRoutPoint { get; set; }

        [Property]
        public int? DstRoutPoint { get; set; }

        //груз
        [AllowBlank, Property]
        public string CargoName { get; set; }

        [Property]
        public decimal? WeightOnTrailer { get; set; }

        [Property]
        public int? WorkHour { get; set; }

        [AllowBlank,
         HasMany(Table = "WaybillTaskIncrease", ColumnKey = "TaskId", Inverse = true,
             Cascade = ManyRelationCascadeEnum.AllDeleteOrphan, Fetch = FetchEnum.SubSelect)]
        public ICollection<WaybillTaskIncrease> TaskIncreases { get; set; }

        [Property]
        public int? ReplicationId { get; set; }

        [Property]
        public ReplicationSource? ReplicationSource { get; set; }

        public void CheckWinter()
        {


            if (NormConsumptionId == null) return;

            // var normCounsumption = NormConsumption.Find(NormConsumptionId);
            var norm = Norm.Find(NormConsumptionId);

            var query = new ScalarQuery<DateTime>(typeof (Waybill),
                @" SELECT DepartureDate
               FROM Waybill
               WHERE WaybillId = ?",
                WaybillId
                );
            var DepartureDate = query.Execute();

            var OwnerId = new ScalarQuery<int>(typeof (Waybill),
                @" SELECT c.OwnerId
               FROM Car as c, Waybill as w
               WHERE c.VehicleId = w.Car.VehicleId AND w.WaybillId = ?",
                WaybillId
                ).Execute();

            var targetDate = new DateTime(TaskDepartureDate.Year, TaskDepartureDate.Month, TaskDepartureDate.Day,
                DepartureDate.Hour, DepartureDate.Minute, 0);

            var temperature = Models.Temperature.FindFirst(
                Order.Desc(Projections.Property<Temperature>(x => x.key.Date)),
                Expression.Where<Temperature>(
                    t =>
                        t.key.Date <= targetDate && t.key.Date > Kdn.DateUtils.TodayStart(targetDate) &&
                        t.key.OwnerId == OwnerId)
                );

            //  if( Temperature != null && Temperature.Value == temperature.Temp ) return;

            Temperature = temperature == null ? null : (decimal?) temperature.Temp;
            var winterIncrease = Increase.Find(WinterIncreaseId);

            WaybillTaskIncrease taskWinterIncrease = null;


            if (TaskIncreases != null)
            {
                foreach (var i in TaskIncreases)
                {
                    if (i.IncreaseId == WinterIncreaseId)
                    {
                        taskWinterIncrease = i;
                    }
                }
            }

            var targetWinterDate = new DateTime(2014, 11, 1);

            if (Temperature != null && Temperature < 0 && norm.isMain &&
                (TaskDepartureDate.Month <= 3 || TaskDepartureDate > targetWinterDate))
            {
                if (taskWinterIncrease == null)
                {

                    if (TaskIncreases == null) TaskIncreases = new List<WaybillTaskIncrease>();

                    TaskIncreases.Add(new WaybillTaskIncrease()
                    {
                        IncreaseId = winterIncrease.IncreaseId,
                        TaskId = TaskId,
                        Prcn = winterIncrease.Prcn
                    });
                }
            }
            else
            {
                if (taskWinterIncrease != null)
                {
                    TaskIncreases.Remove(taskWinterIncrease);
                }
            }


            SaveAndFlush();

        }

        public decimal? CalculateConsumption()
        {

            decimal? CONSUMPTION = null;

            if (isUnaccounted != null && isUnaccounted.Value)
            {
                CONSUMPTION = 0;
                return CONSUMPTION;
            }

            if (NormConsumptionId != null && FuelId != null && WorkAmount != null)
            {

                //var normCounsumption = NormConsumption.Find(NormConsumptionId);
                var norm = Norm.Find(NormConsumptionId);
                var workType = WorkType.Find(norm.WorkTypeId);
                var workUnit = WorkUnit.Find(workType.WorkUnitId);

                var increaseMap = Increase.getMap();

                int increasePrcn = 0;
                int increasePrcnWeight = 0;


                if (TaskIncreases != null)
                {
                    foreach (var increase in TaskIncreases)
                    {
                        increasePrcn += increase.Prcn;
                        var i = increaseMap[increase.IncreaseId];
                        if (!i.isNormConstant) increasePrcnWeight += increase.Prcn;
                    }
                }

                decimal increaseK = (decimal) 1.0 + (decimal) (increasePrcn/100.0);
                decimal increaseKWeight = (decimal) 1.0 + (decimal) (increasePrcnWeight/100.0);

                var consumption = norm.Consumption;

                if (workUnit.WorkUnitId != KmUnitId)
                {
                    if (TaskDepartureDate < DateTime.Parse("01.09.2013"))
                    {
                        var MTMk = norm.MotoToMachineKoef ?? 1;
                        consumption = Decimal.Round((consumption/MTMk), 2, MidpointRounding.AwayFromZero);
                        decimal consumption100 = Decimal.Round((consumption*increaseK), 2, MidpointRounding.AwayFromZero);
                        CONSUMPTION = WorkAmount/workUnit.Coefficient*consumption100;
                    }
                    else
                    {
                        var MTMk = norm.MotoToMachineKoef ?? 1;
                        var MH = decimal.Round((WorkAmount.Value/MTMk), 3, MidpointRounding.AwayFromZero);
                        decimal consumption100 = Decimal.Round((consumption*increaseK), 2, MidpointRounding.AwayFromZero);
                        CONSUMPTION = decimal.Round(MH*consumption100, 2, MidpointRounding.AwayFromZero);
                    }
                }
                else
                {
                    decimal consumption100 = Decimal.Round((consumption*increaseK), 2, MidpointRounding.AwayFromZero);
                    CONSUMPTION = WorkAmount/workUnit.Coefficient*consumption100;
                }


                if (workUnit.WorkUnitId == KmUnitId)
                {

                    decimal weightConsumption = 0;
                    decimal trailerConsumption = 0;
                    decimal tkmConsumption = TonneKilometerConsumption;


                    var VehicleId = new ScalarQuery<int>(typeof (Waybill),
                        @" SELECT c.VehicleId
                     FROM Car as c, Waybill as w
                     WHERE c.VehicleId = w.Car.VehicleId AND w.WaybillId = ?",
                        WaybillId
                        ).Execute();

                    var tkmNorm =
                        Norm.FindActualNorms(VehicleId, TaskDepartureDate)
                            .FirstOrDefault(x => x.WorkTypeId == TkmWorkId);

                    if (tkmNorm != null)
                    {
                        tkmConsumption = tkmNorm.Consumption;
                    }


                    if (isTruck != null && isTruck.Value)
                    {

                        var Qv = new ScalarQuery<decimal>(typeof (Waybill),
                            @" SELECT c.CapacityTonns
                        FROM FullCar as c, Waybill as w
                        WHERE c.VehicleId = w.Car.VehicleId AND w.WaybillId = ?",
                            WaybillId
                            ).Execute();

                        if (TrailerId != null)
                        {

                            var trailer = FullTrailer.Find(TrailerId);
                            var trailerWeight = trailer.SelfMass ?? 0;
                            var Qt = trailer.CapacityTonns ?? 0;

                            CONSUMPTION = this.calculateTruckWithTrailerConsumption(consumption, trailerWeight, Qt,
                                WorkAmount ?? 0, WeightKm ?? 0, Qv, Weight ?? 0, tkmConsumption, increaseK);
                            return CONSUMPTION;
                        }


                        CONSUMPTION = this.calculateTruckConsumption(consumption, (WorkAmount ?? 0), Qv, (Weight ?? 0),
                            (WeightKm ?? 0), tkmConsumption, increaseK);
                        return CONSUMPTION;

                    }

                    weightConsumption = ((WeightKm ?? 0)*(Weight ?? 0))*(tkmConsumption/(decimal) 100.0)*increaseKWeight;

                    if (TrailerId != null)
                    {
                        var TrailerWeight = new ScalarQuery<decimal?>(typeof (FullTrailer),
                            @" SELECT t.SelfMass
                        FROM FullTrailer as t WHERE t.VehicleId = ?",
                            TrailerId
                            ).Execute();

                        trailerConsumption = (WorkAmount ?? 0)*(TrailerWeight ?? 0)*(tkmConsumption/(decimal) 100.0)*
                                             increaseKWeight;

                    }

                    CONSUMPTION += weightConsumption + trailerConsumption;
                }
            }

            if (CONSUMPTION != null) CONSUMPTION = Decimal.Round(CONSUMPTION.Value, 2, MidpointRounding.AwayFromZero);
            return CONSUMPTION;

        }

        public decimal calculateTruckConsumption(decimal H, decimal L, decimal q, decimal m, decimal S, decimal c,
            decimal increaseK)
        {
            /* var H,//Линейная норма расхода топлива
             L,//Общий пробег автомобиля за смену
             q,//Грузоподъёмность самосвала
             m,//Масса груза
             S,//Пробег с грузом
             c,//Норма на транспортную работу,
             increase;
             */

            var Pfact = S*m;
            var P05 = q*((decimal) 0.5)*L;
            var Vavt = ((decimal) 0.01*(S*m - q*((decimal) 0.5)*L)*c);

            var rezult = ((decimal) 0.01)*H*L*increaseK + Vavt;

            return Decimal.Round(rezult, 2, MidpointRounding.AwayFromZero);
        }

        public decimal calculateTruckWithTrailerConsumption(decimal H, decimal Mt, decimal Qt, decimal L, decimal S,
            decimal q, decimal m, decimal c, decimal increaseK)
        {
            var Pfact = S*m;
            var P05 = Qt*((decimal) 0.5)*L;
            var Vap = ((decimal) 0.01*(Pfact - P05)*c);

            var rezult = ((decimal) 0.01)*(H + (Mt + Qt*(decimal) 0.5)*c)*L*increaseK + Vap;
            return Decimal.Round(rezult, 2, MidpointRounding.AwayFromZero);
        }

        public decimal calculateTruckTrailerConsumption(decimal H, decimal Mt, decimal Qt, decimal L, decimal S,
            decimal q, decimal m, decimal c, decimal increaseK)
        {

            /*
      var H,//Линейная норма расхода топлива
          Mt,//Масса прицепа
          Qt,//Грузоподъёмность прицепа
          L,//Общий пробег автомобиля за смену
          S,//Пробег с грузом
          q,//Грузоподъёмность самосвала
          m,//Масса груза
          c,//Норма на транспортную работу
          increase
          */

            var rez = H + c*(Mt + (decimal) 0.5*Qt);

            rez = (decimal) 0.01*rez*L;

            var Lx = L - S;

            var Q1 = (decimal) 0.01*Lx*(decimal) 0.5*(q + Qt)*c;
            var Q2 = (decimal) 0.01*S*(m - (q + Qt))*c;

            rez = (rez - Q1 + Q2)*increaseK;
            return Decimal.Round(rez, 2, MidpointRounding.AwayFromZero);
        }


        public decimal? CalculateAmount()
        {
            decimal? AMOUNT = null;

            if (NormConsumptionId != null && FuelId != null && Consumption != null)
            {

                // var normCounsumption = NormConsumption.Find(NormConsumptionId);
                var norm = Norm.Find(NormConsumptionId);
                var workType = WorkType.Find(norm.WorkTypeId);
                var workUnit = WorkUnit.Find(workType.WorkUnitId);

                var increaseMap = Increase.getMap();

                int increasePrcn = 0;
                int increasePrcnWeight = 0;


                if (TaskIncreases != null)
                {
                    foreach (var increase in TaskIncreases)
                    {
                        increasePrcn += increase.Prcn;
                        var i = increaseMap[increase.IncreaseId];
                        if (!i.isNormConstant) increasePrcnWeight += increase.Prcn;
                    }
                }

                decimal increaseK = (decimal) 1.0 + (decimal) (increasePrcn/100.0);
                decimal increaseKWeight = (decimal) 1.0 + (decimal) (increasePrcnWeight/100.0);

                var consumption = norm.Consumption;

                if (workUnit.WorkUnitId != KmUnitId)
                {
                    var MTMk = norm.MotoToMachineKoef ?? 1;
                    var MH = decimal.Round((WorkAmount.Value/MTMk), 3, MidpointRounding.AwayFromZero);
                    decimal consumption100 = Decimal.Round((consumption*increaseK), 2, MidpointRounding.AwayFromZero);
                    AMOUNT = Consumption.Value/consumption100*MTMk;
                }
                else
                {
                    decimal weightConsumption = 0;
                    decimal TrailerWeight = 0;
                    decimal tkmConsumption = TonneKilometerConsumption;


                    var VehicleId = new ScalarQuery<int>(typeof (Waybill),
                        @" SELECT c.VehicleId
                     FROM Car as c, Waybill as w
                     WHERE c.VehicleId = w.Car.VehicleId AND w.WaybillId = ?",
                        WaybillId
                        ).Execute();


                    var tkmNorm =
                        Norm.FindActualNorms(VehicleId, TaskDepartureDate)
                            .FirstOrDefault(x => x.WorkTypeId == TkmWorkId);

                    if (tkmNorm != null)
                    {
                        tkmConsumption = tkmNorm.Consumption;
                    }

                    weightConsumption = ((WeightKm ?? 0)*(Weight ?? 0))*(tkmConsumption/(decimal) 100.0)*increaseKWeight;

                    if (TrailerId != null)
                    {
                        TrailerWeight = new ScalarQuery<decimal?>(typeof (FullTrailer),
                            @" SELECT t.SelfMass
                        FROM FullTrailer as t WHERE t.VehicleId = ?",
                            TrailerId
                            ).Execute() ?? 0;

                    }
                    decimal consumption100 = Decimal.Round((consumption*increaseK), 2, MidpointRounding.AwayFromZero);
                    AMOUNT = (Consumption.Value - weightConsumption)*workUnit.Coefficient/
                             (consumption100 + TrailerWeight*(tkmConsumption/(decimal) 100.0)*increaseKWeight);
                    //AMOUNT = Consumption.Value*workUnit.Coefficient/consumption100;
                }

            }

            if (AMOUNT != null) AMOUNT = Decimal.Round(AMOUNT.Value, 1, MidpointRounding.AwayFromZero);
            return AMOUNT;

        }


        public void CheckDefaultIncreases()
        {

            if (NormConsumptionId != null)
            {
                var norm = Norm.Find(NormConsumptionId);
                var normIncreases = NormIncrease.FindByNorm(norm.NormId);
                var taskMap = new Dictionary<int, WaybillTaskIncrease>();
                var increaseMap = Increase.getMap();

                var removeList = new Dictionary<int, WaybillTaskIncrease>();

                if (TaskIncreases == null) TaskIncreases = new List<WaybillTaskIncrease>();
                foreach (var i in TaskIncreases)
                {
                    if (increaseMap[i.IncreaseId].isNormConstant)
                    {
                        removeList.Add(i.IncreaseId, i);
                    }

                    taskMap.Add(i.IncreaseId, i);
                }

                foreach (var i in normIncreases)
                {
                    if ((i.Const != null && i.Const.Value) || (i.Force != null && i.Force.Value))
                    {
                        if (taskMap.ContainsKey(i.IncreaseId))
                        {
                            if (removeList.ContainsKey(i.IncreaseId))
                            {
                                removeList[i.IncreaseId].Prcn = i.Prcn; //Если поменялась надбавка
                                removeList.Remove(i.IncreaseId);
                            }
                        }
                        else
                        {
                            var newIncrease = new WaybillTaskIncrease()
                            {
                                IncreaseId = i.IncreaseId,
                                TaskId = TaskId,
                                Prcn = i.Prcn
                            };
                            newIncrease.SaveAndFlush();
                            TaskIncreases.Add(newIncrease);
                        }
                    }
                }

                foreach (var i in removeList)
                {
                    TaskIncreases.Remove(i.Value);
                }


                Save();

            }
        }
    }



    [Serializable]
    public class WaybillTaskIncreaseKey
    {
        [KeyProperty]
        public int TaskId { get; set; }

        [KeyProperty]
        public int IncreaseId { get; set; }

        public override int GetHashCode()
        {
            return TaskId ^ IncreaseId;
        }

        public override bool Equals(object obj)
        {
            if (this == obj)
            {
                return true;
            }
            var key = obj as WaybillTaskIncreaseKey;
            if (key == null)
            {
                return false;
            }
            if (TaskId != key.TaskId || IncreaseId != key.IncreaseId)
            {
                return false;
            }
            return true;
        }
    }

    [Model, ActiveRecord]
    public class WaybillTaskIncrease : ActiveRecordBase<WaybillTaskIncrease>
    {

        [CompositeKey, JsonIgnore]
        public WaybillTaskIncreaseKey key { get; set; }

        public int TaskId
        {
            get { return key.TaskId; }
            set
            {
                if (key == null) key = new WaybillTaskIncreaseKey();
                key.TaskId = value;
            }
        }

        [IdProperty]
        public int IncreaseId
        {
            get { return key.IncreaseId; }
            set
            {
                if (key == null) key = new WaybillTaskIncreaseKey();
                key.IncreaseId = value;
            }
        }

        [Property]
        public short Prcn { get; set; }
    }
}

