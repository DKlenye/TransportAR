using System.Linq;
using Castle.ActiveRecord;
using Castle.DynamicProxy.Generators.Emitters.SimpleAST;
using Kdn.Ext.Attributes;
using Expression = NHibernate.Criterion.Expression;

namespace Transport.Models
{
    [Model,ActiveRecord(DiscriminatorColumn="DSC",DiscriminatorType="short",DiscriminatorValue="0")]
    public class Fuel:ActiveRecordBase<Fuel>
    {
        [IdProperty,PrimaryKey]
        public int FuelId { get; set; }
        
        [Property]
        public string FuelName { get; set; }

        [Property(Length=10)]
        public string ShortFuelName { get; set; }

        [Property]
        //Коэфф. перевода в килограммы
        public decimal? WeightCoeff { get; set; }

        [Property]
        public int? ReplicationId { get; set; }
        [Property]
        public ReplicationSource? ReplicationSource { get; set; }

    }


   [ActiveRecord(DiscriminatorValue="1")]
   public class Petrol:Fuel
   {
       [Property]
       public int PetrolGroupId { get; set; }
       }


   [Model,ActiveRecord(DiscriminatorValue = "2")]
   public class Oil : Fuel{
      [Property]
      public int OilGroupId { get; set; }
   }

   [ActiveRecord(DiscriminatorValue = "3")]
   public class HiddenFuel : Fuel
   {}


   [Model,ActiveRecord]
   public class OilGroup : ActiveRecordBase {
      [IdProperty,PrimaryKey]
      public int OilGroupId { get; set; }
      [Property]
      public string OilGroupName { get; set; }
   }

   [Model, ActiveRecord]
   public class PetrolGroup : ActiveRecordBase
   {
       [IdProperty, PrimaryKey]
       public int PetrolGroupId { get; set; }
       [Property]
       public string PetrolGroupName { get; set; }
   }



}
