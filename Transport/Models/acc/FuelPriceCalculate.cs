using System;


namespace Transport.Models
{

   public class FuelPriceCalculate
   {
      public int AccountingId { get; set; }
      public int? FuelId { get; set; }
      public int? AccPeriod { get; set; }

      public decimal RemainQuantity { get; set; }
      public decimal RemainCost { get; set; }
      public decimal Diff { get; set; }
      public decimal RefuellingQuantity { get; set; }
      public decimal FilledCost { get; set; }
      public decimal CalculatePrice { get; set; }     

      public string id {
         get { 
            return String.Join("_",new string[]{
               AccPeriod.ToString(),   
               AccountingId.ToString(),
               FuelId.ToString()
            });
         }
      }

   }

}
