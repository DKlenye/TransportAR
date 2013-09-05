using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using System.Text;
using Kdn.Ext.Attributes;

namespace Transport.Models {
   [Model, ActiveRecord]
   public class RefuellingSheet : ActiveRecordBase<RefuellingSheet> {

      [IdProperty, PrimaryKey]
      public int SheetNumber { get; set; }
      [Property]
      public int FuelId { get; set; }
      [Property]
      public int RefuellingGroupId { get; set; }
      [Property]
      public int RefuellingPlaceId { get; set; }
      [Property(ColumnType="Date")]
      public DateTime RefuellingDate { get; set; }
      
   }
}
