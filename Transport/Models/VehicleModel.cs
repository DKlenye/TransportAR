using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models
{
    [ActiveRecord,Model]
    public class VehicleModel:ActiveRecordBase<VehicleModel>
    {
        [PrimaryKey,IdProperty]
        public int VehicleModelId { get; set; }
        [Property]
        public string VehicleModelName { get; set; }
    }
}
