using System;
using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

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

    }
}
