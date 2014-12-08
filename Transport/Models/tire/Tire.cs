using Castle.ActiveRecord;
using Kdn.Ext.Attributes;
using Transport.Models.tire;


namespace Transport.Models
{
   [Model, ActiveRecord]
   public class Tire : ActiveRecordBase<Tire>,Interfaces.IOwnered
   {
      [IdProperty, PrimaryKey]
      public int TireId { get; set; }

      [Property,AllowBlank]
      public int OwnerId { get; set; }

      [BelongsTo("TireModelId"),AllowBlank]
      public TireModel TireModel { get; set; }

      [Property(Length = 30)]
      public string FactoryNumber { get; set; }
      
      [Property]
      public int? Cost { get; set; }

      [Property]
      public int? TireMakerId { get; set; }

      [Property(Length = 20)]
      public string Size { get; set; }

      [Property]
      public TireSeason? Season { get; set; }

       //Номер документа
       [Property, AllowBlank]
       public string Doc { get; set; }

       [Property]
      public int? KmNorm { get; set; }

      [Property]
      public int? MonthNorm { get; set; }

       [Property]
       public int? KmStart { get; set; }

       [Property(Length = 150),AllowBlank]
      public string Description { get; set; }

       [Property]
       public bool? IsInStock { get; set; }

       [Property]
       public int? TireMovingId { get; set; }

       [Property]
       public short? Wear { get; set; }

       public void setOwner(int OwnerId) { this.OwnerId = OwnerId; }
   }



 }
