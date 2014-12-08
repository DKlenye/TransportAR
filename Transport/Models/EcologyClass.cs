using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models {
   [Model, ActiveRecord]
   public class EcologyClass : ActiveRecordBase<EcologyClass> {
      [IdProperty, PrimaryKey]
      public int EcologyClassId { get; set; }
      [Property(Length = 50)]
      public string EcologyClassName { get; set; }
   }
}
