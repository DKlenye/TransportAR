using System;
using System.Collections.Generic;
using Kdn.Ext.Attributes;

namespace Transport.Models
{
    [Model]
    public class VehicleOrderDTO
    {
        public VehicleOrderDTO()
        {
            Requests = new List<v_Request>();
        }

        public int? VehicleOrderId { get; set; }       
        [IdProperty]
        public int VehicleId { get; set; }
        public int GarageNumber { get; set; }
        [AllowBlank]
        public string RegistrationNumber { get; set; }
        [AllowBlank]
        public string Model { get; set; }
        [AllowBlank]
        public int ColumnId { get; set; }
        public int? GroupRequestId { get; set; }
        public decimal? LimitDiff { get; set; }
        public DateTime? BusinessTripDate { get; set; }
        public DateTime OrderDate { get; set; }

        [PetaPoco.Ignore,AllowBlank]
        public Customer Customer { get; set; }
        [AllowBlank]
        public v_Driver Driver { get; set; }
        [PetaPoco.Ignore,AllowBlank]
        public List<v_Request> Requests { get; set; }
        
        
        
    }
}

