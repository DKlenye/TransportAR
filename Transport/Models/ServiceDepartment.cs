using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models
{
    [ActiveRecord,Model]
    public class ServiceDepartment : ActiveRecordBase<ServiceDepartment>
    {
        [PrimaryKey,IdProperty]
        public int DepartmentId { get; set; }

        [Property]
        public string DepartmentName { get; set; }
    }

}