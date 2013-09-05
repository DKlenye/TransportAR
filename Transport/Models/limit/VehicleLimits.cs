using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Transport.Models.limit
{
    public class VehicleLimits
    {
        public int VehicleId { get; set; }
        public int AccPeriod { get; set; }
        public int FuelLimit { get; set; }
        public int KmLimit { get; set; }
    }
}
