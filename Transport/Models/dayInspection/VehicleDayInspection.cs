using System;
using System.Collections.Generic;

namespace Transport.Models.dayInspection
{
    public class DriverInspection
    {
        public String Fio { get; set; }
        public DateTime? Licence { get; set; }
        public DateTime? Medical { get; set; }
    }

    public class VehicleDayInspection
    {

        public VehicleDayInspection()
        {
            Drivers = new List<DriverInspection>();
        }

        public int WaybillId { get; set; }
        public DateTime DepartureDate { get; set; }
        public DateTime ReturnDate { get; set; }
        public short Shift { get; set; }
        public int GarageNumber { get; set; }
        public string Model { get; set; }
        public string RegistrationNumber { get; set; }
        public DateTime? Inspection { get; set; }
        public DateTime? Insurance { get; set; }
        public DateTime? CheckCO { get; set; }
        public List<DriverInspection> Drivers { get; set; }
    }
}