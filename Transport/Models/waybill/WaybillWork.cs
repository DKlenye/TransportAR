using System;
using Castle.ActiveRecord;

namespace Transport.Models.waybill
{
    [ActiveRecord]
    public class WaybillWork:ActiveRecordBase<WaybillWork>
    {
        [PrimaryKey(PrimaryKeyType.Assigned)]
        public int WaybillId { get; set; }
        [Property]
        public int VehicleId { get; set; }
        [Property]
        public DateTime WorkDate { get; set; }

        [Property]
        public decimal Km { get; set; }
        [Property]
        public decimal MachineHour { get; set; }
        [Property]
        public decimal MotoHour { get; set; }
        [Property]
        public decimal NormConsumption { get; set; }
        [Property]
        public decimal FactConsumption { get; set; }
    }
}
