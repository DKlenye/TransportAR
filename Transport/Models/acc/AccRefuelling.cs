using System;

namespace Transport.Models {

   public class AccRefuelling {

      public int? AccPeriod { get; set; }
      public string CardNumber { get; set; }
     
      public int DriverId { get; set; }
      public int FuelId { get; set; }
      public string FuelName { get; set; }
      public decimal Quantity { get; set; }
      public int WaybillId { get; set; }
      public DateTime RefuellingDate { get; set; }
      public int RefuellingId { get; set; }
      public int RefuellingPlaceId { get; set; }

      public int SheetNumber { get; set; }
      public int VehicleId { get; set; }
      public int GarageNumber { get; set; }
      public string FIO { get; set; }

      public int? TrkId { get; set; }
      public int? TankId { get; set; }
      public int? SheetId { get; set; }


   }

      


}
