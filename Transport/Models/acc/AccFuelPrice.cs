using System;
using System.Collections.Generic;
using System.Text;
using Kdn.Ext.Attributes;


namespace Transport.Models
{

   public class AccFuelPrice
   {
      public int AccountingId { get; set; }
      public int FuelId { get; set; }
      public int AccPeriod { get; set; }
      public decimal Price { get; set; }
      public decimal RetailPrice { get; set; }
      
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
