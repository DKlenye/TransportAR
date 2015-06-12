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
            NormFuels = new List<int>();
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


        [AllowBlank, HasMany(Table = "_NormFuels", Element = "FuelId", ColumnKey = "NormId")]
        public ICollection<int> NormFuels { get; set; }

        [Property]
        public bool? IsTemp { get; set; }

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

        public override void Delete()
        {
            var query = String.Format(
                @" Delete from NormIncrease where NormId = {0} ",
                NormId
            );

            var s = ActiveRecordMediator.GetSessionFactoryHolder().CreateSession(typeof(Norm));
            s.CreateQuery(query).ExecuteUpdate(); 

            base.DeleteAndFlush();
        }
        
    }

    [ActiveRecord("_Norm")]
   public class relation_Norm {
      [PrimaryKey]
      public int NormId { get; set; }
      [HasAndBelongsToMany(typeof(Fuel),Table="_NormFuels", ColumnKey="NormId", ColumnRef="FuelId")]
      public ISet<Fuel> NormFuels { get; set; }
      [BelongsTo("CounterId")]
      public WorkCounter Counter { get; set; }
      [BelongsTo("WorkTypeId")]
      public WorkType WorkType { get; set; }
   }
   
}
