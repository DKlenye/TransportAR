using System;

namespace Transport.Models
{
   public class TireCard
    {
      public string VehicleString { get; set; }
      public DateTime? InstallDate { get; set; }
      public DateTime? RemoveDate { get; set; }
      public string mName { get; set; }
      public int? y { get; set; }
      public decimal? Work { get; set; }
      public decimal? SummaryWork { get; set; }

      public decimal? _work { get; set; }
      public decimal? _summary { get; set; }
    }
}
