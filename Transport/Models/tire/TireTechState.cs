using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models.tire
{
    [ActiveRecord,Model]
    public class TireTechState:ActiveRecordBase<TireTechState>
    {
        [PrimaryKey,IdProperty]
        public int TireTechStateId { get; set; }
        [Property]
        public string TireTechStateName { get; set; }
    }
}
