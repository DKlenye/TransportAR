using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

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
