using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models.tire
{
    [Model,ActiveRecord]
    public class TireRemoveReason:ActiveRecordBase<TireRemoveReason>
    {
        [IdProperty, PrimaryKey]
        public int TireRemoveReasonId { get; set; }
        [Property]
        public string TireRemoveReasonName { get; set; }
        [Property]
        public bool isWriteOff { get; set; }

        [BelongsTo("TireTechStateId"), AllowBlank]
        public TireTechState State { get; set; }

    }
}
