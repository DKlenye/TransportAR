using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using Kdn.Ext.Attributes;
using NHibernate.Criterion;
using Iesi.Collections.Generic;


namespace Transport.Models {

    [Model, ActiveRecord("_Norm")]
    public class Norm : ActiveRecordBase<Norm>, Interfaces.IOwnered
    {


        public Norm()
        {
            //NormConsumption = new SortedSet<NormConsumption>();
            NormFuels = new List<int>();
            NormIncreases = new List<int>();
        }

        [IdProperty, PrimaryKey]
        public int NormId { get; set; }

        [BelongsTo("VehicleId")]
        public BaseVehicle Car { get; set; }

        [Property]
        public int WorkTypeId { get; set; }

        [Property]
        public bool isMain { get; set; }

        [Property]
        public int? CounterId { get; set; }

        [Property]
        public decimal? MotoToMachineKoef { get; set; }

        [Property]
        public bool Enabled { get; set; }

        [Property]
        public DateTime? StartDate { get; set; }
        [Property]
        public DateTime? EndDate { get; set; }
        [Property]
        public decimal Consumption { get; set; }

        [Property,AllowBlank]
        public string Description { get; set; }

        [Property]
        public int? MainFuelId { get; set; }

        [AllowBlank, HasMany(Table = "_NormIncreases", Element = "IncreaseId", ColumnKey = "NormId")]
        public ICollection<int> NormIncreases { get; set; }

        [AllowBlank, HasMany(Table = "_NormFuels", Element = "FuelId", ColumnKey = "NormId")]
        public ICollection<int> NormFuels { get; set; }

        /*
        [AllowBlank,
         HasMany(Table = "NormConsumption", ColumnKey = "NormId", OrderBy = "ConsumptionStartDate DESC", Inverse = true,
             Cascade = ManyRelationCascadeEnum.Delete, Fetch = FetchEnum.SubSelect)]
        public ISet<NormConsumption> NormConsumption { get; set; }

         * */

        #region Owner

        public void setOwner(int OwnerId)
        {
        }

        public void readWithOwner(DetachedCriteria c, int owner)
        {
            c.CreateAlias("Car", "Car").Add(Expression.Eq("Car.OwnerId", owner));
        }

        #endregion


        public WorkType GetWorkType()
        {
            return WorkType.Find(WorkTypeId);
        }

        public static Norm[] FindActualNorms(int VehicleId, DateTime Date)
        {
            return FindAll(
                Restrictions.Where<Norm>(
                    x => x.Car.VehicleId == VehicleId && x.Enabled && (x.StartDate==null || x.StartDate<=Date) && (x.EndDate == null || x.EndDate.Value >= Date)));
        }


    }

    [ActiveRecord("_Norm")]
   public class relation_Norm {
      [PrimaryKey]
      public int NormId { get; set; }
      [HasAndBelongsToMany(typeof(Increase),Table="_NormIncreases", ColumnKey="NormId", ColumnRef="IncreaseId")]
      public ISet<Increase> NormIncreases { get; set; }
      [HasAndBelongsToMany(typeof(Fuel),Table="_NormFuels", ColumnKey="NormId", ColumnRef="FuelId")]
      public ISet<Fuel> NormFuels { get; set; }
      [BelongsTo("CounterId")]
      public WorkCounter Counter { get; set; }
      [BelongsTo("WorkTypeId")]
      public WorkType WorkType { get; set; }
   }
   
    /*
   [Model,ActiveRecord]
   public class NormConsumption : ActiveRecordBase<NormConsumption>,IComparable<NormConsumption> {
      [IdProperty,PrimaryKey]
      public int RecId { get; set; }
      [Property(UniqueKey = "consumption_idx")]
      public int NormId { get; set; }
      [Property(ColumnType="Date",UniqueKey="consumption_idx")]
      public DateTime ConsumptionStartDate { get; set; }
      [Property]
      public decimal Consumption { get; set; }

      public int CompareTo(NormConsumption norm) {
         return DateTime.Compare(norm.ConsumptionStartDate, ConsumptionStartDate);
      }

   }
    */
}
