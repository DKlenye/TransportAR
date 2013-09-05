using System;
using System.Collections.Generic;
using System.Text;
using Kdn.Ext.Attributes;


namespace Transport.Models
{

   public class AccPosting
   {
      public int AccountingId { get; set; }
      public int AccPeriod { get; set; }
      public string Debet { get; set; }
      public string Credit { get; set; }
      public decimal Summ { get; set; }
    
      public string id {
         get { 
            return String.Join("_",new string[]{
               AccPeriod.ToString(),   
               AccountingId.ToString(),
               Debet,
               Credit
            });
         }
      }

   }

}
