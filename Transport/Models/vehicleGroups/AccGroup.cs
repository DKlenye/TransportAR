using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models {

   //Группы по бухгалтерии
   [Model, ActiveRecord]
   public class AccGroup : ActiveRecordBase<AccGroup> {
      [IdProperty, PrimaryKey]
      public int AccGroupId { get; set; }
      [Property]
      public string AccGroupName { get; set; }
      [Property]
      public string CostCode { get; set; }
   }
}
