using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using System.Text;
using Kdn.Ext.Attributes;
using NHibernate.Criterion;

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
