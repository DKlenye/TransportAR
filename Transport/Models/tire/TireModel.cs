using Castle.ActiveRecord;
using Kdn.Ext.Attributes;


namespace Transport.Models
{
   [Model, ActiveRecord]
   public class TireModel : ActiveRecordBase<TireModel>
   {
      [IdProperty, PrimaryKey]
      public int TireModelId { get; set; }
      [Property(Length=50)]
      public string TireModelName { get; set; }
      
       [Property(Length = 50),AllowBlank]
       public string Description { get; set; }

       [Property]
      public int? TireMakerId { get; set; }
      [Property]
      public int? TireStandardId { get; set; }
      
      //public int WeightIndex { get; set; } //норма слойности или индекс грузоподъёмности 

      [Property(Length = 20)]
      public string Size { get; set; }

      [Property]
      public int? Season { get; set; }

      [Property]
      public int? KmNorm { get; set; }
      [Property]
      public int? MonthNorm { get; set; }

       [AllowBlank]
       public string TireMakerName
       {
           get
           {
               if (TireMakerId == null) return null;
               return TireMaker.Find(TireMakerId).TireMakerName;
           }
       }


   }

   #region NHibernate relation

   [ActiveRecord("TireModel")]
   public class relation_TireModel
   {
      [PrimaryKey]
      public int TireModelId { get; set; }
      [BelongsTo("TireMakerId")]
      public TireMaker TireMaker { get; set; }
   }

   #endregion




}
