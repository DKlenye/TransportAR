using Kdn.Ext.Attributes;

namespace Transport.OtherModels.tdbf
{
    public class Fuel
    {
        [IdProperty]
        public int fuelId { get; set; }
        public string fuelName { get; set; }
        public decimal k_weight { get; set; }
    }



}
