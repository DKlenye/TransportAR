using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using System.Text;
using Kdn.Ext.Attributes;

namespace Transport.Models {
   [Model, ActiveRecord]
   public class Refuelling:ActiveRecordBase<Refuelling> {

      [IdProperty, PrimaryKey]
      public int RefuellingId { get; set; }

      [Property]
      public int FuelId { get; set; }

      [Property]
      public DateTime RefuellingDate { get; set; }
      
      [Property]
      public decimal Quantity { get; set; }
            
      [Property]
      public int? SheetNumber { get; set; }

      [Property]
      public int EmployeeId { get; set; }

      [Property(Index="idx_ReplicationId")]
      public int? ReplicationId { get; set; }
      [Property]
      public ReplicationSource? ReplicationSource { get; set; }


   }

      


}
