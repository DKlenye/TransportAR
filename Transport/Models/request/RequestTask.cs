using System;
using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models
{
    [Model,ActiveRecord]
    public class RequestTask : ActiveRecordBase<RequestTask>
    {
        [IdProperty,PrimaryKey]
        public int RequestTaskId { get; set; }
        [Property]
        public DateTime TaskDate { get; set; }
        [Property]
        public int VehicleId { get; set; }
        [Property]
        public int RequestId { get; set; }
    }
}
