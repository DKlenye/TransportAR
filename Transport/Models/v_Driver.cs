using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using System.Text;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using Kdn.Direct;

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
