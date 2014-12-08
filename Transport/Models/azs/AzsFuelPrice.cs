using System;


namespace Transport.Models
{

   public class AzsFuelPrice
   {
      public int AccMonth { get; set; }
      public int AccYear { get; set; }

      public int FuelId { get; set; }
      public string  FuelName { get; set; }


      public decimal StartRemainLiter { get; set; }
       public decimal StartRemainKg { get; set; }
       public decimal StartSummRemain { get; set; }
       public decimal IncomeVolume { get; set; }
       public decimal IncomeMass { get; set; }
       public decimal IncomeCost { get; set; }
        public decimal Excise { get; set; }
        public decimal PriceLiter { get; set; }
        public decimal PriceKg { get; set; }
      
      public string id {
         get { 
            return String.Join("_",new string[]{
               FuelId.ToString()
            });
         }
      }

   }

}