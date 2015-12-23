using System;
using Castle.ActiveRecord;
using Kdn.Ext.Attributes;
using NHibernate.Criterion;
using Transport.Models.tire;

namespace Transport.Models
{

    [Model, ActiveRecord]
    public class TireMoving : ActiveRecordBase<TireMoving>
    {
        [IdProperty, PrimaryKey]
        public int TireMovingId { get; set; }

        [BelongsTo("VehicleId")]
        public BaseVehicle Vehicle { get; set; }

        [Property]
        public int TireId { get; set; }

        [Property]
        public DateTime InstallDate { get; set; }

        [Property]
        public DateTime? RemoveDate { get; set; }

        [Property]
        public int? TireRemoveReasonId { get; set; }

        [Property]
        public int? TireTechStateId { get; set; }

        [Property, AllowBlank]
        public bool? IsSpare { get; set; }
        [Property, AllowBlank]
        public bool? IsNotReplaceable { get; set; }

        public override void SaveAndFlush()
        {
            base.SaveAndFlush();
            var tire = Tire.Find(TireId);
            tire.TireMovingId = TireMovingId;
            tire.SaveAndFlush();
        }

        public override void Delete()
        {
            setLastMoving();
            base.Delete();
        }


        public void setLastMoving()
        {
            var moving = FindFirst(Order.Desc(Projections.Property<BatteryMoving>(x => x.InstallDate)),
                Expression.Where<TireMoving>(
                  x => x.TireId == TireId && x.TireMovingId != TireMovingId
            ));

            var tire = Tire.Find(TireId);
            tire.TireMovingId = moving.TireMovingId;
        }

        public static TireMoving[] FindByVehicle(BaseVehicle vehicle)
        {
            return FindAll(Expression.Where<TireMoving>(x => x.Vehicle == vehicle && x.TireRemoveReasonId == null));
        }
    }
}
