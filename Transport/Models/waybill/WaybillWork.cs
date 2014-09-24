using System;
using Castle.ActiveRecord;

namespace Transport.Models.waybill
{

    [Serializable]
    public class WaybillWorkKey
    {
        [KeyProperty]
        public int WaybillId { get; set; }
        [KeyProperty]
        public int VehicleId { get; set; }


        public override int GetHashCode()
        {
            return WaybillId.GetHashCode() ^ VehicleId.GetHashCode();
        }

        public override bool Equals(object obj)
        {
            if (this == obj)
            {
                return true;
            }
            WaybillWorkKey key = obj as WaybillWorkKey;
            if (key == null)
            {
                return false;
            }
            if (WaybillId != key.WaybillId || VehicleId != key.VehicleId)
            {
                return false;
            }
            return true;
        }
    }







    [ActiveRecord]
    public class WaybillWork:ActiveRecordBase<WaybillWork>
    {
        [CompositeKey]
        public WaybillWorkKey key { get; set; }
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
