using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Kdn.Attributes;
using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models.limit
{
    [ActiveRecord, Model]
    public class VehicleFuelLimits : ActiveRecordBase<VehicleFuelLimits>
    {
        [PrimaryKey, IdProperty]
        public int Id { get; set; }
        [BelongsTo("VehicleId")]
        public BaseVehicle Car { get; set; }
        [Property(ColumnType = "Date")]
        public DateTime StartDate { get; set; }
        [Property(ColumnType = "Date")]
        public DateTime? EndDate { get; set; }
        [Property]
        public int FuelLimit { get; set; }
        [Property]
        public bool isDayLimit { get; set; }
    }
}
