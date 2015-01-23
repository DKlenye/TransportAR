using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models {

   //Группы по бухгалтерии
   [Model, ActiveRecord(Table = "GroupAcc_New")]
    public class AccGroupNew : ActiveRecordBase<AccGroupNew>
    {
      [IdProperty, PrimaryKey(Column = "GroupAccId")]
      public int AccGroupNewId { get; set; }
      [Property(Column = "GroupAccName")]
      public string AccGroupName { get; set; }
   }
}
