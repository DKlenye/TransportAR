using System;
using Castle.ActiveRecord;
using Kdn.Ext.Attributes;
using NHibernate.Criterion;

namespace Transport.Models
{
    [Model, ActiveRecord]
    public class v_WaybillList :ActiveRecordBase<Waybill>,Interfaces.IOwnered
    {

        [IdProperty, PrimaryKey]
        public int WaybillId { get; set; }
        [BelongsTo("VehicleId")]
        public BaseVehicle Car { get; set; }
        [Property]
        public int Position { get; set; }

        [BelongsTo("DriverId")]
        public Driver ResponsibleDriver { get; set; }

        [Property]
        public DateTime DepartureDate { get; set; }
        [Property]
        public DateTime ReturnDate { get; set; }

        [AllowBlank, Property(Length = 20)]
        public string FormNumber { get; set; }

        [AllowBlank, Property(Update = false, Insert = false)]
        public int? WaybillNumber { get; set; }

        [Property]
        public int WaybillTypeId { get; set; }

        [Property]
        public int? PackageId { get; set; }

        [Property]
        public int? ScheduleId { get; set; }
        [Property]
        public short Shift { get; set; }

        [Property]
        public string Way { get; set; }

        [Property]
        public int? TrailerId { get; set; }

        //Состояние путевого листа
        [Property]
        public short? WaybillState { get; set; }

        [Property]
        public int? AccPeriod { get; set; }


        [Property]
        public DateTime? OrderDate { get; set; }

        [Property, AllowBlank]
        public string OrderNumber { get; set; }

        [Property]
        public int? ColumnId { get; set; }

        [Property]
        public int? BodyTypeId { get; set; }

        public void setOwner(int OwnerId) { }
        public void readWithOwner(DetachedCriteria c, int owner)
        {
            c.CreateAlias("Car", "Car").Add(Expression.Eq("Car.OwnerId", owner));
        }
    }
}
