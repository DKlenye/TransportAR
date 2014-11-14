using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models
{

    [Model,ActiveRecord]
    public class ReportGroup : ActiveRecordBase<ReportGroup>
    {
        [IdProperty,PrimaryKey]
        public int ReportGroupId { get; set; }
        [Property(Length = 100)]
        public string ReportGroupName { get; set; }     
        
    }
}
