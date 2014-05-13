using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using System.Text;
using Kdn.Ext.Attributes;
using NHibernate.Criterion;
using Transport.Models.tire;


namespace Transport.Models
{
   [Model, ActiveRecord]
   public class TireModel : ActiveRecordBase<TireModel>
   {
      [IdProperty, PrimaryKey]
      public int TireModelId { get; set; }
      [Property(Length=50)]
      public string TireModelName { get; set; }
      [Property]
      public int? TireMakerId { get; set; }
      [Property]
      public int? TireStandardId { get; set; }

      [Property]
      public int WeightIndex { get; set; } //норма слойности или индекс грузоподъёмности 

      [Property(Length = 20)]
      public string Size { get; set; }

      [Property]
      public TireSeason Season { get; set; }

      [Property]
      public int KmNorm { get; set; }

   }

   #region NHibernate relation

   [ActiveRecord("TireModel")]
   public class relation_TireModel
   {
      [PrimaryKey]
      public int TireModelId { get; set; }
      [BelongsTo("TireMakerId")]
      public TireMaker TireMaker { get; set; }
      [BelongsTo("TireStandardId")]
      public TireStandard TireStandard { get; set; }
   }

   #endregion




}
