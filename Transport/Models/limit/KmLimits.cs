namespace Transport.Models
{
    public class KmLimits
    {
        public int VehicleId { get; set; }
        public int GarageNumber { get; set; }
        public string Model { get; set; }
        public string RegistrationNumber { get; set; }
        
        public int KmLimit { get; set; }

        public decimal Km { get; set; }        
        public decimal TripKm { get; set; }
        public decimal Diff { get; set; }
    }
}
