using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models
{
    [Model, ActiveRecord]
    public class RequestType : ActiveRecordBase<RequestType>
    {
        [IdProperty, PrimaryKey]
        public int RequestTypeId { get; set; }

        [Property]
        public string RequestTypeName { get; set; }
    }

}
