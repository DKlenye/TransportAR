using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models
{
   [ActiveRecord, Model]
   public class BatteryType : ActiveRecordBase<BatteryType>
   {
      [PrimaryKey, IdProperty]
      public int BatteryTypeId { get; set; }

      [Property]
      public string BatteryTypeName { get; set; }

      //Гарантия мес.
      [Property]
      public short? Warrantly { get; set; }

      //Норма на пробег
      [Property]
      public int? KmNorm { get; set; }

      //Норма на моточасы
      [Property]
      public int? MhNorm { get; set; }
   }
}
