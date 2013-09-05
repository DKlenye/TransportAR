using System;
using Kdn.Ext;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Transport.OtherModels.farm
{

    public class Fuel
    {
        public const string FieldsMapping = @"[
            'FuelId',
            'FuelName'   
        ]";


        [IdProperty]
        public int FuelId { get; set; }
        public string FuelName { get; set; }

        public decimal? TkmCoeff { get; set; }
        public bool? Hide { get; set; }
        public decimal? WeightCoeff { get; set; }

    }
}
