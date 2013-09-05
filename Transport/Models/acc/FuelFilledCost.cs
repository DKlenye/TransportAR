using System;
using System.Collections.Generic;
using System.Text;
using Kdn.Ext.Attributes;


namespace Transport.Models
{

   public class FuelFilledCost
   {
      public int AccountingId { get; set; }
      public int? FuelId { get; set; }
      public int? RefuellingPlaceId { get; set; }
      public decimal Cost { get; set; }
      public decimal? Quantity { get; set; }
      public decimal Diff { get; set; }
      public int? AccPeriod { get; set; }


      public string id {
         get { 
            return String.Join("_",new string[]{
               AccPeriod.ToString(),   
               AccountingId.ToString(),
               RefuellingPlaceId.ToString(),
               FuelId.ToString()
            });
         }
      }

   }

}
