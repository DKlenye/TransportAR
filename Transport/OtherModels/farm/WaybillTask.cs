using System;
using Kdn.Ext;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;

namespace Transport.OtherModels.farm
{

    public class WaybillTask
    {
        [IdProperty]
        public int TaskId { get; set; }

        [JsonIgnore]
        public Waybill Waybill { get; set; }

        public int CustomerId { get; set; }
        public DateTime TaskDate { get; set; }

        public int VehicleNormId { get; set; }
        public int FuelId { get; set; }

        public decimal WorkAmount { get; set; }
        public decimal? WeightKm { get; set; }
        public decimal? Weight { get; set; }
        public bool isUnaccounted { get; set; }
        

        public string CostCode { get; set; }
        public decimal? NormConsumption { get; set; }
        public decimal? FactConsumption { get; set; }

        public ICollection<int> WaybillTaskNormIncreases { get; set; }

    }


}

