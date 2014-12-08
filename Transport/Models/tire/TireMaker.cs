using Castle.ActiveRecord;
using Kdn.Ext.Attributes;


namespace Transport.Models
{

   [Model, ActiveRecord]
   public class TireMaker : ActiveRecordBase<TireMaker>
   {
      [IdProperty, PrimaryKey]
      public int TireMakerId { get; set; }
      [Property(Length=50)]
      public string TireMakerName { get; set; }
   }
}
