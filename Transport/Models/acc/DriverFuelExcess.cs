using System;
using System.Collections.Generic;
using System.Text;
using Kdn.Ext.Attributes;


namespace Transport.Models
{

   public class DriverFuelExcess
   {
      public int AccountingId { get; set; }
      public int AccPeriod { get; set; }
      public int DriverId { get; set; }

      public string Department { get; set; }
      public string EmployeeNumber { get; set; }

      public string Fio { get; set; }
      public decimal Cost { get; set; }
      public int AccCost { get; set; }
      public int? SalaryPeriod { get; set; }


      public string id {
         get { 
            return String.Join("_",new string[]{
               AccPeriod.ToString(),   
               AccountingId.ToString(),
               DriverId.ToString()
            });
         }
      }

   }

}
