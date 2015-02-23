using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Transport.Models
{
    public class OilStandartConsuption
    {
        public string OilGroupName { get; set; }
        public DateTime DateOilChange { get; set; }

        public decimal Quantity { get; set; }
        public int Duration { get; set; }

        public int OilWear { get; set; }
        public decimal OilNorm { get; set; }

        public decimal FuelConsumption { get; set; }

        public decimal OilConsumptionNorm { get; set; }
        public decimal OilConsumptionFact { get; set; }
    }
}
