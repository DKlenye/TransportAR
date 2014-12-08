using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models
{
    [ActiveRecord,Model]
    public class v_Driver:ActiveRecordBase<v_Driver>,Interfaces.IOwnered
    {
        [PrimaryKey,IdProperty]
        public int DriverId { get; set; }

        [Property]
        public int OwnerId { get; set; }
        [Property]
        public string EmployeeNumber { get; set; }
        [Property]
        public string Department { get; set; }
        [Property]
        public string Fio { get; set; }

        [Property]
        public string LastName { get; set; }
        [Property]
        public string FirstName { get; set; }
        [Property]
        public string MiddleName { get; set; }

        public void setOwner(int owner){
            OwnerId=owner;
        }

    }
}
