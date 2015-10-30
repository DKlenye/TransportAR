using System;

namespace Transport.Models
{
   public class BatteryCard
    {
      public string VehicleString { get; set; }
      public DateTime? InstallDate { get; set; }
      public DateTime? RemoveDate { get; set; }
      public string mName { get; set; }
      public int? y { get; set; }
      public decimal? WorkKm { get; set; }
      public decimal? SummaryWorkKm { get; set; }

      public decimal? WorkMh { get; set; }
      public decimal? SummaryWorkMh { get; set; }
    }
}
