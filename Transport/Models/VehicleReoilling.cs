using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Castle.ActiveRecord;
using Kdn.Ext.Attributes;
using NHibernate.Criterion;


namespace Transport.Models
{
    [ActiveRecord, Model]
    public class VehicleReoilling: ActiveRecordBase<VehicleReoilling>
    {
        [IdProperty, PrimaryKey]
        public int ReoillingId { get; set; }

        [BelongsTo("RefuellingPlaceId"), AllowBlank]
        public RefuellingPlace RefuellingPlace { get; set; }

        [Property, AllowBlank]
        public int? SheetId { get; set; }

        [Property]
        public DateTime RefuellingDate { get; set; }

        [BelongsTo("FuelId")]
        public Fuel Fuel { get; set; }

        [Property]
        public decimal Quantity { get; set; }

        [Property, AllowBlank]
        public int? TankId { get; set; }

        [Property]
        public int VehicleId { get; set; }

        [BelongsTo("DriverId")]
        public Driver Driver { get; set; }

        [Property, AllowBlank]
        public int? VehicleReoillingId { get; set; }

        [Property, AllowBlank]
        public int? OilId { get; set; }

        [Property, AllowBlank]
        public int? BaseRefuellingSheetId { get; set; }

        [Property, AllowBlank]
        public int? ReoillingSheetId { get; set; }

        [Property, AllowBlank]
        public int? RefuellingSheetId { get; set; }

        [Property, AllowBlank]
        public int? TrkId { get; set; }

        [Property, AllowBlank]
        public int? OilSheetId { get; set; }

        [Property, AllowBlank]
        public int? AbstractRefuellingDocId { get; set; }

        [BelongsTo("OilChangeId")]
        public OilChange OilChange { get; set; }
    }
}
