using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using System.Text;
using Kdn.Ext.Attributes;
using NHibernate.Criterion;
using Newtonsoft.Json;

namespace Transport.Models.request
{
    [ActiveRecord,Model]
    public class RequestApprover:ActiveRecordBase<RequestApprover>
    {
        [IdProperty, PrimaryKey(Generator=PrimaryKeyType.Assigned)]
        public int EmployeeId { get; set; }

        [BelongsTo("EmployeeId",Update=false,Insert=false)]
        public Employee Employee { get; set; }

        public override void SaveAndFlush()
        {
            EmployeeId = Employee.EmployeeId;

            base.SaveAndFlush();
        }
    }
}
