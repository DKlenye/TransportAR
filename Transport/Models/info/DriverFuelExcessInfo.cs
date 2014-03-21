using System;

namespace Transport.Models.info
{
    public class DriverFuelExcessInfo
    {
        public int WaybillId { get; set; }
        public DateTime WorkDate { get; set; }
        public int GarageNumber { get; set; }
        public decimal NormConsumption { get; set; }
        public decimal FactConsumption { get; set; }
        public decimal Excess { get; set; }
    }
}
