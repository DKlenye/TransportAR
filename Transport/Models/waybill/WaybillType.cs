using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models {
   [Model, ActiveRecord]
   public class WaybillType : ActiveRecordBase<WaybillType> {
      [IdProperty, PrimaryKey]
      public int WaybillTypeId { get; set; }
      [Property]
      public string WaybillTypeName { get; set; }
      [AllowBlank,Property]
      public string UrlTemplate { get; set; }
      [Property]
      public bool notActual { get; set; }

       
      [Property]
      public int? ReplicationId { get; set; }
      [Property]
      public ReplicationSource? ReplicationSource { get; set; }


   }
}
