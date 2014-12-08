using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models
{

    [Model,ActiveRecord]
    public class ServiceGroup : ActiveRecordBase<ServiceGroup>
    {
        [IdProperty,PrimaryKey]
        public int ServiceGroupId { get; set; }
        [Property]
        public string ServiceGroupName { get; set; }     
        
    }
}
