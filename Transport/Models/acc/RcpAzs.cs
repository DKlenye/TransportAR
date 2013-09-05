using System;
using System.Collections.Generic;
using System.Text;
using Kdn.Ext.Attributes;


namespace Transport.Models
{

   public class RcpAzs
   {
      public string AccName { get; set; }
      public int CardCode { get; set; }
      public decimal RealDose { get; set; }
      public int Price { get; set; }
      public decimal NDSValue { get; set; }
      public int SaleSum { get; set; }
      public DateTime DocDate { get; set; }
      public string MarkName { get; set; }

   }

}
