using Kdn.Ext.Attributes;
using Castle.ActiveRecord;

namespace Transport.Models.limit
{
    [ActiveRecord,Model]
    public class VehicleKmLimits:ActiveRecordBase<VehicleKmLimits>
    {
        [PrimaryKey,IdProperty]
        public int Id { get; set; }
        [BelongsTo("VehicleId")]
        public BaseVehicle Car { get; set; }
        [Property]
        public int Period { get; set; }
        [Property]
        public int KmLimit { get; set; }
    }
}
