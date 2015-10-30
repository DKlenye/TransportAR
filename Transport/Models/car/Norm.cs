using System;
using System.Collections.Generic;
using System.Linq;
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

        [Property]
        public bool? Annually { get; set; }

        #region Owner

        public void setOwner(int OwnerId)
        {
        }

        public void readWithOwner(DetachedCriteria c, int owner)
        {
            c.CreateAlias("Car", "Car").Add(Expression.Eq("Car.OwnerId", owner));
        }

        #endregion

        
        public bool IsActual {
            get { return CheckActual(DateTime.Now); }
        }

        public bool CheckActual(DateTime date)
        {
            var dateActual = (StartDate == null || StartDate <= date) && (EndDate == null || EndDate.Value >= date);
            var annuallyActual = false;
            if ( Annually!=null && Annually.Value && StartDate != null && EndDate != null)
            {
                var annuallyStart = new DateTime(date.Year,StartDate.Value.Month,StartDate.Value.Day);
                var annuallyEnd = new DateTime(date.Year,EndDate.Value.Month, EndDate.Value.Day);

                annuallyActual = annuallyStart <= date && annuallyEnd >= date;
            }

            return Enabled && (dateActual || annuallyActual) ;
        }

        public WorkType GetWorkType()
        {
            return WorkType.Find(WorkTypeId);
        }

        public static Norm[] FindActualNorms(int VehicleId, DateTime Date)
        {
            return FindAll(
                Restrictions.Where<Norm>(x => x.Car.VehicleId == VehicleId)).ToList().Where(x => x.CheckActual(Date)).ToArray();
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
