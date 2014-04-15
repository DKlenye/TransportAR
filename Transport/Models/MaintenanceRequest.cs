using System;
using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models
{
    [ActiveRecord,Model]
    public class MaintenanceRequest:ActiveRecordBase<MaintenanceRequest>
    {
        [PrimaryKey,IdProperty]
        public int MaintenanceRequestId { get; set; }
        [BelongsTo("VehicleId")]
        public BaseVehicle Car { get; set; }
        [Property]
        public DateTime? RequestDate { get; set; }
        [Property, AllowBlank]
        public bool TO1 { get; set; }
        [Property, AllowBlank]
        public bool TO2 { get; set; }
        [Property, AllowBlank]
        public bool SO { get; set; }
        [Property,AllowBlank]
        public bool TR { get; set; }
        [Property, AllowBlank]
        public bool OilReplace { get; set; }
        [Property, AllowBlank]
        public decimal FuelRemain { get; set; }
        [Property, AllowBlank]
        public int Km { get; set; }
        [BelongsTo("DriverId")]
        public Driver Driver { get; set; }
        [Property]
        public DateTime? EndRequest { get; set; }
        [BelongsTo("DepartmentId")]
        public Department Department { get; set; }
    }
}
