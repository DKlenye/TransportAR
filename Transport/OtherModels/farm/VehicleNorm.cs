using System;
using Kdn.Ext.Attributes;
using System.Collections.Generic;

namespace Transport.OtherModels.farm
{

    public class VehicleNorm
    {

        [IdProperty]
        public int VehicleNormId { get; set; }
        public int VehicleId { get; set; } 
        public WorkType WorkType { get; set; }
        public bool isMain { get; set; }
        public decimal Consumption { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public Decimal? MachineHourCoef { get; set; }
                
        public virtual ICollection<Fuel> VehicleNormFuels { get; set; }
        public virtual ICollection<int> VehicleNormIncreases { get; set; }
        
    }
}