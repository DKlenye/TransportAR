using Kdn.Ext.Attributes;

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
