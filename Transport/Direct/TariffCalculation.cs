using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.UI.WebControls;
using Castle.Core;
using Castle.DynamicProxy.Generators.Emitters.SimpleAST;
using Ext.Direct;
using Kdn.Direct;
using Transport.Models;
using Transport.Models.service;
using Transport.OtherModels.tdbf;
using Expression = NHibernate.Criterion.Expression;

namespace Transport.Direct
{
    public partial class Direct
    {
        [DirectMethod]
        public TariffCalculation PrepareWithVehicle(TariffCalculation calculation)
        {

            calculation.TrailerId = null;
            calculation.Driver = null;
            calculation.CarNorm = 0;
            calculation.TkmNorm = 0;
            calculation.Petrol = null;


            var norms = Norm.FindActualNorms(calculation.Car.VehicleId, calculation.Date);
            var norm = norms.First(x=>x.isMain=true && x.WorkTypeId == 5);
            var petrol = (Petrol)Petrol.Find(norm.NormFuels.FirstOrDefault());


            var Car = (FullCar) FullCar.Find(calculation.Car.VehicleId);
            calculation.TrailerId = Car.TrailerId;
            calculation.Driver = Car.ResponsibleDriver;
            calculation.CarNorm = norm.Consumption;
            calculation.Petrol = petrol;
            var firstOrDefault = norms.FirstOrDefault(x => x.WorkTypeId == 4 || x.WorkTypeId == 233);
            if (firstOrDefault != null)
                calculation.TkmNorm = firstOrDefault.Consumption;


            var lastCalculation = TariffCalculation.findLastCalculation();
            if (lastCalculation != null)
            {
                calculation.VATRate = lastCalculation.VATRate;
                calculation.ManagementProc = lastCalculation.ManagementProc;
                calculation.ProducerPriceIndex = lastCalculation.ProducerPriceIndex;
                calculation.MonthWorkNorm = lastCalculation.MonthWorkNorm;
                calculation.Surcharge = lastCalculation.Surcharge;
                calculation.SocialInsurance = lastCalculation.SocialInsurance;
                calculation.BgsInsurance = lastCalculation.BgsInsurance;
                calculation.ScheduleDuration = lastCalculation.ScheduleDuration;
                calculation.ProfitProc = lastCalculation.ProfitProc;
                calculation.OverheadProc = lastCalculation.OverheadProc;
            }




            return calculation;
        }

        [DirectMethod]
        public TariffCalculation CalculateTariff(TariffCalculation calculation)
        {
            calculation.Calculate();
            calculation.SaveAndFlush();
            return calculation;
        }

        public class Params
        {
            public DateTime period { get; set; }
        }


        [DirectMethod]
        public DataSerializer TariffPetrolPriceRead(Params p)
        {

            var petrols = Petrol.FindAll();
            var Prices =
                TariffPetrolPrice.FindAll(
                    Expression.Where<TariffPetrolPrice>(x => x.Period == p.period.Year*100 + p.period.Month));


            var rezult = new List<TariffPetrolPrice>();

            petrols.ForEach(petrol =>
            {
                if (petrol.GetType() == typeof (Petrol))
                {

                    var price = Prices.FirstOrDefault(x => x.Petrol == petrol);

                    if (price == null)
                    {
                        price = new TariffPetrolPrice()
                        {
                            Period = p.period.Year*100 + p.period.Month,
                            Petrol = (Petrol) petrol,
                            Price = 0
                        };

                        price.SaveAndFlush();
                    }

                    rezult.Add(price);
                }
            });
            

            return new DataSerializer(rezult);
        }


    }
}
