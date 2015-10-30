using Castle.ActiveRecord;
using Kdn.Ext.Attributes;
using Transport.Models.battery;

namespace Transport.Models
{
   [ActiveRecord, Model]
    public class BatteryRemoveReason : ActiveRecordBase<BatteryRemoveReason>
    {
       [IdProperty,PrimaryKey]
       public int BatteryRemoveReasonId { get; set; }
       [Property]
       public string BatteryRemoveReasonName { get; set; }
       [Property]
       public bool isWriteOff { get; set; }

       [BelongsTo("BatteryTechStateId"),AllowBlank]
       public BatteryTechState State { get; set; }
    }
}
