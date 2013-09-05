using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Transport.Models
{
    public class FuelLimits
    {
        public int VehicleId { get; set; }
        public int GarageNumber { get; set; }
        public string Model { get; set; }
        public string RegistrationNumber { get; set; }
        
        public int FuelLimit { get; set; }

        public decimal Quantity { get; set; }        
        public decimal Consumption { get; set; }
        public decimal Diff { get; set; }
    }
}
