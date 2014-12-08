using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models {
   [Model, ActiveRecord]
   public class RefuellingGroup : ActiveRecordBase<RefuellingGroup> {
      
      [IdProperty,PrimaryKey(Generator=PrimaryKeyType.Assigned)]
      public int RefuellingGroupId { get; set; }
      [Property(Length=30)]
      public string RefuellingGroupName { get; set; }
      [Property(Length = 20)]
      public string groupAccCode { get; set; }
      [Property]
      public bool? oilReplacingReport { get; set; }
      [Property(Length = 10)]
      public string debit { get; set; }
      [Property(Length = 10)]
      public string oilDebit { get; set; }
   }
}
