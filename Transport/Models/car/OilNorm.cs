using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models
{
    [ActiveRecord,Model]
    public class OilNorm:ActiveRecordBase<OilNorm>
    {
        [IdProperty,PrimaryKey]
        public int OilNormId { get; set; }
        [Property]
        public int VehicleOilGroupId { get; set; }
        [Property]
        public int OilGroupId { get; set; }
        [Property]
        public int PetrolGroupId { get; set; }
        [Property]
        public decimal Norm { get; set; }
    }
}
