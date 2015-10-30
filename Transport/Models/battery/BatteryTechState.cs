using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models.battery
{
    [ActiveRecord,Model]
    public class BatteryTechState:ActiveRecordBase<BatteryTechState>
    {
        [PrimaryKey,IdProperty]
        public int BatteryTechStateId { get; set; }
        [Property]
        public string BatteryTechStateName { get; set; }
    }
}
