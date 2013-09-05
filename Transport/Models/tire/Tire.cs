using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using System.Text;
using Kdn.Ext.Attributes;
using NHibernate.Criterion;


namespace Transport.Models
{
   [Model, ActiveRecord]
   public class Tire : ActiveRecordBase<Tire>,Interfaces.IOwnered
   {
      [IdProperty, PrimaryKey]
      public int TireId { get; set; }

      [Property,AllowBlank]
      public int OwnerId { get; set; }

      [Property]
      public int? TireModelId { get; set; }

      [Property(Length = 30)]
      public string FactoryNumber { get; set; }

      [Property]
      public DateTime? WriteOff { get; set; }
      
      [Property]
      public int Cost { get; set; }

      [Property]
      public int? TireMakerId { get; set; }

      [Property]
      public int WeightIndex { get; set; } //норма слойности или индекс грузоподъёмности 

      [Property]
      public short? Diameter { get; set; }

      [Property(Length = 20)]
      public string Size { get; set; }

      [Property(Length = 6),AllowBlank]
      public string Season { get; set; }

      [Property]
      public int KmNorm { get; set; }

      
      public void setOwner(int OwnerId) { this.OwnerId = OwnerId; }
   }


    #region NHibernate relation

    [ActiveRecord("Tire")]
    public class relation_Tire
    {
       [PrimaryKey]
       public int TireId { get; set; }
       [BelongsTo("TireModelId")]
       public TireModel TireModel { get; set; }
    }

    #endregion


 }
