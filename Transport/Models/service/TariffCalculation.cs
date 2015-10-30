using System;
using System.Collections.Generic;
using System.Linq;
using Castle.ActiveRecord;
using Kdn.Ext.Attributes;
using NHibernate.Criterion;
using PetaPoco;
using Transport.Models.waybill;
using Expression = NHibernate.Criterion.Expression;

namespace Transport.Models.service
{
    public class AmmortizationDto
    {
        public string inventory { get; set; }
        public int year { get; set; }
        public int idArm { get; set; }
        public decimal Am1 { get; set; }
        public decimal Am2 { get; set; }
        public decimal Am3 { get; set; }
        public decimal Am4 { get; set; }
        public decimal Am5 { get; set; }
        public decimal Am6 { get; set; }
        public decimal Am7 { get; set; }
        public decimal Am8 { get; set; }
        public decimal Am9 { get; set; }
        public decimal Am10 { get; set; }
        public decimal Am11 { get; set; }
        public decimal Am12 { get; set; }
    }

    [ActiveRecord,Model]
    public class TariffCalculation:ActiveRecordBase<TariffCalculation>
    {
        [IdProperty,Castle.ActiveRecord.PrimaryKey]
        public int TariffCalculationId { get; set; }

        [BelongsTo("CarId")]
        public BaseVehicle Car { get; set; }

        [Property]
        public decimal CarNorm { get; set; }
        [Property]
        public decimal TkmNorm { get; set; }

        [Property]
        public decimal CargoWeight { get; set; }

        [BelongsTo("PetrolId")]
        public Petrol Petrol { get; set; }
        
        [Property]
      public int? TrailerId { get; set; }

        [Property]
        public DateTime Date { get; set; }
        [BelongsTo("DriverId"),AllowBlank]
        public Driver Driver { get; set; }

        #region Зарплата водителей

        /// <summary>
        /// Коэффициент доплат к зарплате с премией
        /// </summary>
        [Property]
        public decimal Surcharge { get; set; }


        /// <summary>
        /// Делать расчёт на 2 водителя
        /// </summary>
        [Property]
        public bool IsDoubleDriver { get; set; }

        #endregion


        #region Страховые взносы

        /// <summary>
        /// Коэффициент отчисления в ФСЗН
        /// </summary>
        [Property]
        public decimal SocialInsurance { get; set; }

        /// <summary>
        /// Коэффициент отчисления в Белгосстрах
        /// </summary>
        [Property]
        public decimal BgsInsurance { get; set; }

        #endregion

        /// <summary>
        /// Индекс цен производителей промышленной продукции
        /// </summary>
        [Property]
        public decimal ProducerPriceIndex { get; set; }

        /// <summary>
        /// Продолжительность рабочей смены
        /// </summary>
        [Property]
        public decimal ScheduleDuration { get; set; }

        /// <summary>
        /// Среднемесячная норма рабочего времени
        /// </summary>
        [Property]
        public decimal MonthWorkNorm { get; set; }


        /// <summary>
        /// Процент общепроизводственных расходов к сумме основных затрат по цеху за год.
        /// </summary>
        [Property]
        public decimal OverheadProc { get; set; }

        /// <summary>
        /// Процент управленческих расходов к сумме основных затрат по цеху за год
        /// </summary>
        [Property]
        public decimal ManagementProc { get; set; }

        /// <summary>
        /// Процент рентабельности
        /// </summary>
        [Property]
        public decimal ProfitProc { get; set; }

        /// <summary>
        /// Ставка НДС
        /// </summary>
        [Property]
        public decimal VATRate { get; set; }



        #region Параметры для вкючения блоков в расчёт

        /// <summary>
        /// Включить в расчёт основную ЗП
        /// </summary>
        [Property]
        public bool IsSalaryInclude { get; set; }

        /// <summary>
        /// Включить в расчёт Прицеп
        /// </summary>
        [Property]
        public bool IsTrailerInclude { get; set; }

        /// <summary>
        /// Включить в расчёт основную ЗП
        /// </summary>
        [Property]
        public bool IsFuelInclude { get; set; }

        #endregion



        #region Результаты расчёта

        /// <summary>
        /// средний пробег за 6 месяцев
        /// </summary>
        [Property]
        public int SixMonthRun { get; set; }

        public int RunFromStartCar { get; set; }
        public int RunFromStartTrailer { get; set; }

        /// <summary>
        /// ставка первого разряда
        /// </summary>
        [Property]
        public decimal FirstCategoryRate { get; set; }

        /// <summary>
        /// оклад водителя
        /// </summary>
        [Property]
        public decimal SalaryDriver { get; set; }

        /// <summary>
        /// Дневной тариф 
        /// </summary>
        [Property]
        public decimal DayTariff { get; set; }

        /// <summary>
        /// Расходы на зароботнцю плату персонала
        /// </summary>
        [Property]
        public decimal Salary { get; set; }

        /// <summary>
        /// Расходы на зароботнцю плату ремонтного и вспомогательного персонала
        /// </summary>
        [Property]
        public decimal AdditionalSalary { get; set; }

        /// <summary>
        /// Расходы на страховые взносы
        /// </summary>
        [Property]
        public decimal Insurance { get; set; }


        [Property]
        public int FuelPrice { get; set; }
        [Property]
        public decimal PetrolConsumption { get; set; }

        [Property]
        public decimal OilConsumption { get; set; }

        [Property]
        public decimal Repair { get; set; }

        [Property]
        public decimal CarAmortization { get; set; }

        [Property]
        public decimal TrailerAmortization { get; set; }


        [Property]
        public decimal Tires { get; set; }


        /// <summary>
        /// Общепроизводственные расходы
        /// </summary>
        [Property]
        public decimal Amortization { get; set; }

        [Property]
        public decimal OverHead { get; set; }

        /// <summary>
        /// Управленческиу расходы
        /// </summary>

        [Property]
        public decimal Management { get; set; }

        /// <summary>
        /// Себестоимость перевозок
        /// </summary>

        [Property]
        public decimal CostPrice { get; set; }

        /// <summary>
        /// Прибыль
        /// </summary>
        
        [Property]
        public decimal Profit { get; set; }

        /// <summary>
        /// Выручка
        /// </summary>

        [Property]
        public decimal Proceeds { get; set; }

        #region Тарифы для услуг


        /// <summary>
        /// Тариф на 1 км пробега
        /// </summary>
        [Property]
        public decimal KmTariff { get; set; }
        public decimal KmTariff1
        {
            get { return decimal.Round(KmTariff * ProfitProc / 100 + KmTariff,MidpointRounding.AwayFromZero); }
        }

        /// <summary>
        /// Тариф на 1 км перевозки
        /// </summary>
        [Property]
        public decimal KmRunTariff { get; set; }
        /// <summary>
        /// Тариф за 1 час работы
        /// </summary>
        [Property]
        public decimal HourTariff { get; set; }

        public decimal HourTariff1 {
            get { return decimal.Round(HourTariff*ProfitProc/100 + HourTariff,MidpointRounding.AwayFromZero); }
        }
        #endregion


        #endregion
        
        /// <summary>
        /// Примечание
        /// </summary>
        [Property,AllowBlank]

        public string Description { get; set; }


        //Коэффициенты из постановления Минтранса
        [Property, AllowBlank]
        public decimal CarZP { get; set; }
        [Property, AllowBlank]
        public decimal CarMZ { get; set; }
        [Property, AllowBlank]
        public decimal CarSM { get; set; }
        [Property, AllowBlank]
        public decimal TrailerZP { get; set; }
        [Property, AllowBlank]
        public decimal TrailerMZ { get; set; }

        [Property, AllowBlank]
        public int TireCost { get; set; }
        [Property, AllowBlank]
        public int TireNorm { get; set; }
        [Property, AllowBlank]
        public int TireCount { get; set; }

        
        public void Calculate()
        {

            var transportDb = new Database("db2");
            var shnDb = new Database("shn");


            var car = (FullCar) FullCar.Find(Car.VehicleId);
            var carTariffCostItems = TariffCostItem.FindAll(Expression.Where<TariffCostItem>(x=>x.Model.VehicleModelId==car.VehicleModelId));

            var date = Date;

            SixMonthRun = transportDb.ExecuteScalar<int>(String.Format(@"
                    SELECT Cast(Round(sum(ww.Km) / sum(DATEDIFF(DAY,w.DepartureDate,w.ReturnDate)+1),0) as Int) dayKm  FROM Waybill w
                    INNER JOIN WaybillWork ww ON w.WaybillId = ww.WaybillId AND w.VehicleId = ww.VehicleId
                    INNER JOIN Vehicle v ON v.VehicleId = w.VehicleId AND v.VehicleId = {0}
                    WHERE ww.WorkDate BETWEEN '{1}' AND '{2}'", Car.VehicleId, date.AddMonths(-6).ToString("dd.MM.yyyy"),
                date.ToString("dd.MM.yyyy")));

            
            RunFromStartCar =
                (int)
                    WaybillWork.FindAll(Expression.Where<WaybillWork>(x => x.key.VehicleId == car.VehicleId))
                        .Sum(x => x.Km);

            
            CarMZ = GetCostItem(carTariffCostItems, TariffCostItemType.МЗ,RunFromStartCar) ?? 0;
            CarSM = GetCostItem(carTariffCostItems, TariffCostItemType.СМ, RunFromStartCar) ?? 0;
            CarZP = GetCostItem(carTariffCostItems, TariffCostItemType.ЗП, RunFromStartCar) ?? 0;

            var trailer = ( FullTrailer) FullTrailer.FindFirst(Expression.Where<FullTrailer>(x=>x.VehicleId==TrailerId));

            
            if (IsTrailerInclude && TrailerId != null)
            {

                RunFromStartTrailer = (int)
                    WaybillWork.FindAll(Expression.Where<WaybillWork>(x => x.key.VehicleId == trailer.VehicleId))
                        .Sum(x => x.Km);


                var trailerTariffCostItems =
                    TariffCostItem.FindAll(
                        Expression.Where<TariffCostItem>(x => x.Model.VehicleModelId == trailer.VehicleModelId));

                TrailerMZ = GetCostItem(trailerTariffCostItems, TariffCostItemType.МЗ,RunFromStartTrailer) ?? 0;
                TrailerZP = GetCostItem(trailerTariffCostItems, TariffCostItemType.ЗП, RunFromStartTrailer) ?? 0;

                CarSM = CarSM*(decimal)1.2;

            }
            else
            {
                TrailerMZ = 0;
                TrailerZP = 0;
            }

           
            




            DayTariff = shnDb.ExecuteScalar<int>(String.Format("SELECT okl FROM vOkl46 WHERE id_men = {0}", Driver.Employee.id_men));
            FirstCategoryRate = shnDb.ExecuteScalar<int>("SELECT top 1 bokl FROM vOkl46");

            Salary = CalculateSalary();
            AdditionalSalary = CalculateAdditionalSalary();


            Insurance = CalculateInsurance();

            //Находим цену на топливо (цены вводятся вручную Кривко?)
            FuelPrice = TariffPetrolPrice.FindFirst(Expression.Where<TariffPetrolPrice>(x => x.Petrol == Petrol && x.Period == date.Year*100+date.Month)).Price;

            PetrolConsumption = CalculatePetrolConsumption();
            OilConsumption = CalculateOilConsumption();

            Repair = CalculateRepairCost();


            var carAmmortization = transportDb.Query<AmmortizationDto>(@"EXECUTE db1.fond.dbo.spu_AmInfo_inventory @year,@inventory ", new
            {
                year = date.Year,
                inventory = car.InventoryNumber
            });

            var ammortization1 = carAmmortization.FirstOrDefault(x => x.idArm == 0);

            CarAmortization = (decimal) ammortization1.GetType().GetProperty("Am" + date.Month).GetValue(ammortization1, null);


            TrailerAmortization = 0;
            if (IsTrailerInclude && TrailerId != null)
            {
                var trailerAmmortization =
                    transportDb.Query<AmmortizationDto>(@"EXECUTE db1.fond.dbo.spu_AmInfo_inventory @year,@inventory ",
                        new
                        {
                            year = date.Year,
                            inventory = trailer.InventoryNumber
                        });

                var ammortization2 = trailerAmmortization.FirstOrDefault(x => x.idArm == 0);

                TrailerAmortization =
                    (decimal) ammortization2.GetType().GetProperty("Am" + date.Month).GetValue(ammortization2, null);
            }

            Amortization = CalculateAmortization();

            Tires = CalculateTires();
            
            OverHead = CalculateOverHeadCost();



            /*  Для расчёта Управленческих расходов нам необходимо сначала расчитать выручку
                Выручка зависит от Прибыли и Себестоимости
                Себестоимость зависит от Управленческих расходов
                
                Таким образом получаем циклическую ссылку. Производим расчёт управленческих расходов пока система не уравновесится
            */

            while (true)
            {
                CostPrice = CalculateCostPrice();
               Profit = CalculateProfit();
                Proceeds = CalculateProceeds();

                var _management = CalculateManagmentCost();
                if (_management > Management)
                {
                    Management = _management;
                }
                else
                {
                    break;
                }
            }

           KmTariff = CalculateKmTariff();
           HourTariff = CalculateHourTariff();
           KmRunTariff = CalculateKmRunTariff();



        }

        /// <summary>
        /// Расчёт расходов на зар. плату.
        /// </summary>
        /// <returns></returns>
        decimal CalculateSalary()
        {
            if (!IsSalaryInclude)
            {
                return 0;
            }

            decimal driversCountCoefficient = IsDoubleDriver ? (decimal)1.5 : 1;
            return decimal.Round((DayTariff + DayTariff * Surcharge) / MonthWorkNorm * ScheduleDuration * driversCountCoefficient, MidpointRounding.AwayFromZero);
        }

        /// <summary>
        /// Расчёт расходов на зар. плату вспомогательного персонала
        /// </summary>
        /// <returns></returns>
        private decimal CalculateAdditionalSalary()
        {

            if (!IsSalaryInclude)
            {
                return 0;
            }

            var additionalSalaryNorm = (CarZP + TrailerZP) * FirstCategoryRate / MonthWorkNorm;
            return decimal.Round(SixMonthRun * additionalSalaryNorm / 1000, MidpointRounding.AwayFromZero);
        }

        /// <summary>
        /// Расчёт расходов на страховые взносы
        /// </summary>
        /// <returns></returns>
        private decimal CalculateInsurance()
        {
            var s = Salary + AdditionalSalary;
            var fszn = Decimal.Round(s * SocialInsurance / 100, MidpointRounding.AwayFromZero);
            var bgs = Decimal.Round(s * BgsInsurance / 100, MidpointRounding.AwayFromZero);
            return fszn + bgs;
        }

        /// <summary>
        /// Расчёт расходов на автомобильное топливо
        /// </summary>
        /// <returns></returns>
        private decimal CalculatePetrolConsumption()
        {
            if (!IsFuelInclude) return 0;

            decimal trailerWeight = 0;
            
            var carConsumption = (CarNorm * SixMonthRun * FuelPrice) / 100;
            decimal trailerConsumption = 0;
            if (IsTrailerInclude && TrailerId != null)
            {

                var trailer = (FullTrailer) FullTrailer.Find(TrailerId);
                trailerWeight = trailer.SelfMass ?? 0;
            }

            trailerConsumption = ((trailerWeight+CargoWeight) * TkmNorm * SixMonthRun * FuelPrice) / 100;


            return Decimal.Round((carConsumption + trailerConsumption), MidpointRounding.AwayFromZero);
        }

        /// <summary>
        /// Расчёт расходов на смазочные материалы
        /// </summary>
        /// <returns></returns>
        private decimal CalculateOilConsumption()
        {
            return Decimal.Round((PetrolConsumption * CarSM ) / 100, MidpointRounding.AwayFromZero);
        }

        /// <summary>
        /// Расчёт расходов на ТО и ремонт
        /// </summary>
        /// <returns></returns>
        decimal CalculateRepairCost()
        {
            return decimal.Round((CarMZ + TrailerMZ) * SixMonthRun / 1000 * ProducerPriceIndex, MidpointRounding.AwayFromZero);
        }

        /// <summary>
        /// Расчёт затрат на аммортизацию основных средств
        /// </summary>
        /// <returns></returns>
        decimal CalculateAmortization()
        {
            return (CarAmortization + TrailerAmortization) / MonthWorkNorm * ScheduleDuration;
        }

        decimal CalculateTires()
        {
            //Выбрать шины по авто
            var carTires = TireMoving.FindAll(Expression.Where<TireMoving>(x=>x.RemoveDate==null && x.Vehicle==Car && !x.IsSpare.Value));
            //Выбрать шины по прицепу
            var trailerTires = new List<TireMoving>();

            if (IsTrailerInclude && TrailerId != null)
            {
                var trailer = Trailer.Find(TrailerId);

                trailerTires = TireMoving.FindAll(Expression.Where<TireMoving>(x => x.RemoveDate == null && x.Vehicle == trailer  && !x.IsSpare.Value)).ToList();
            }


            int kmNorm = 0;
            int cost = 0;

            carTires.ToList().ForEach(x =>
            {
                var tire = Tire.Find(x.TireId);
                kmNorm += tire.KmNorm ?? 0;
                cost += tire.Cost ?? 0;
            });

            trailerTires.ToList().ForEach(x =>
            {
                var tire = Tire.Find(x.TireId);
                kmNorm += tire.KmNorm ?? 0;
                cost += tire.Cost ?? 0;
            });

            var tireCount = carTires.Count() + trailerTires.Count;

            //Подсчитать среднюю норму по пробегу среднюю
            var averageKmNorm = kmNorm / tireCount;
            //Подсчитать среднюю стоимость шины
            var averageCost = cost / tireCount;

            TireCount = tireCount;
            TireNorm = averageKmNorm;
            TireCost = averageCost;

            return averageCost * SixMonthRun / averageKmNorm * tireCount;
        }

        

        /// <summary>
        /// Расчёт общепроизводственных расходов
        /// </summary>
        /// <returns></returns>
        private decimal CalculateOverHeadCost()
        {
            return
                decimal.Round(
                    (Salary + AdditionalSalary + Insurance + Repair + Tires + Amortization) * OverheadProc /
                    100, MidpointRounding.AwayFromZero);
        }

        /// <summary>
        /// Расчёт управленческих расходов
        /// </summary>
        /// <returns></returns>
        decimal CalculateManagmentCost()
        {
            return decimal.Round(Proceeds * ManagementProc / 100, MidpointRounding.AwayFromZero);
        }

        /// <summary>
        /// Расчёт себестоимости перевозок
        /// </summary>
        /// <returns></returns>
        decimal CalculateCostPrice()
        {
            return decimal.Round(Salary + AdditionalSalary + Insurance + PetrolConsumption + OilConsumption + Repair + Tires +
                   Amortization + OverHead + Management, MidpointRounding.AwayFromZero);
        }

        /// <summary>
        /// Расчёт прибыли
        /// </summary>
        /// <returns></returns>
        decimal CalculateProfit()
        {
            return decimal.Round(CostPrice * ProfitProc / 100, MidpointRounding.AwayFromZero);
        }

        /// <summary>
        /// Расчёт выручки
        /// </summary>
        /// <returns></returns>
        decimal CalculateProceeds()
        {
            return CostPrice + Profit;
        }

        decimal CalculateKmRunTariff()
        {
            return decimal.Round(
                Proceeds / SixMonthRun
                , MidpointRounding.AwayFromZero);
        }


        decimal CalculateKmTariff()
        {
            return decimal.Round(
                (AdditionalSalary + AdditionalSalary * BgsInsurance / 100 + AdditionalSalary * SocialInsurance / 100 + PetrolConsumption + OilConsumption + Tires + Repair) / SixMonthRun
                , MidpointRounding.AwayFromZero);
        }

        private decimal CalculateHourTariff()
        {
            return decimal.Round(
                (Salary - (AdditionalSalary * SocialInsurance / 100) -
                 (AdditionalSalary * BgsInsurance / 100) + Insurance + Amortization + OverHead + Management) /
                ScheduleDuration
                , MidpointRounding.AwayFromZero);
        }


        decimal? GetCostItem(IEnumerable<TariffCostItem> items, TariffCostItemType type, int kmFromStart)
        {
            var item = items.FirstOrDefault(x => x.CostItemType == type);

            if (item != null)
            {
                int lastKm = -1;
                decimal? coefficient = null;
                item.GetType().GetProperties().Where(x => x.Name.StartsWith("Km")).ToList().ForEach(prop =>
                {
                    var km = int.Parse(prop.Name.Substring(2))*1000;
                    if (kmFromStart >= km && lastKm < km)
                    {
                        coefficient = (decimal?)prop.GetValue(item, null);
                    }
                });
                return coefficient ?? 0;
            }

            return null;
        }

        public static TariffCalculation findLastCalculation()
        {
            return FindFirst(Order.Desc(Projections.Property<TariffCalculation>(x => x.TariffCalculationId)));
        }
    }
}
