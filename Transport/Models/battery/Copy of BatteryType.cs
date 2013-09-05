using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using System.Text;
using Kdn.Ext.Attributes;
using NHibernate.Criterion;


namespace Transport.Models
{
    [Model,ActiveRecord]
    public class BatteryMoving : ActiveRecordBase<BatteryMoving>
    {
        [IdProperty,PrimaryKey]
        public int BatteryMovingId { get; set; }

        [Property]
        public int VehicleId { get; set; }

        [Property]
        public DateTime StartDate { get; set; }
        [Property]
        public DateTime? EndDate { get; set; }

    }
}
