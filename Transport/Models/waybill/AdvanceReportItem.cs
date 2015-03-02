using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models
{
    [ActiveRecord,Model]
    public class AdvanceReportItem:ActiveRecordBase<AdvanceReportItem>
    {
        [IdProperty,PrimaryKey]
        public int Id { get; set; }
        [Property]
        public string ItemName { get; set; }
    }
}
