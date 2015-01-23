using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models.request
{
    [Model]
    public class VehicleOrderDTO
    {
        public VehicleOrderDTO()
        {
            Customers = new List<VehicleOrderCustomer>();
            Drivers = new List<VehicleOrderDriver>();
        }

        [IdProperty]
        public int VehicleOrderId { get; set; }
        public DateTime DepartureDate { get; set; }
        public DateTime? ReturnDate { get; set; }
        public BaseVehicle Vehicle { get; set; }
        public int? VehicleOrderTypeId { get; set; }
        public int? WaybillId { get; set; }
        public int ScheduleId { get; set; }
        public Int16 Shift { get; set; }
        
        [AllowBlank]
        public string Description { get; set; }

        [AllowBlank]
        public string DestRoutePoint { get; set; }

        [AllowBlank]
        public ICollection<VehicleOrderCustomer> Customers { get; set; }
        [AllowBlank]
        public ICollection<VehicleOrderDriver> Drivers { get; set; }
        public bool IsInMaintenance { get; set; }
        
        [Property]
        public DateTime? BusinessTripDepartureDate { get; set; }
    }
}
