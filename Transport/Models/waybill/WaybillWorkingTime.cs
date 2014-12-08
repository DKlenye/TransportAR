using System;
using Castle.ActiveRecord;

namespace Transport.Models.waybill
{
    [Serializable]
    public class WaybillWorkingTimeKey
    {
        [KeyProperty]
        public int WaybillId { get; set; }
        [KeyProperty]
        public DateTime TargetDate { get; set; }


        public override int GetHashCode()
        {
            return WaybillId ^ TargetDate.GetHashCode();
        }

        public override bool Equals(object obj)
        {
            if (this == obj)
            {
                return true;
            }
            WaybillWorkingTimeKey key = obj as WaybillWorkingTimeKey;
            if (key == null)
            {
                return false;
            }
            if (WaybillId != key.WaybillId || TargetDate != key.TargetDate)
            {
                return false;
            }
            return true;
        }
    }

    [ActiveRecord]
    public class WaybillWorkingTime : ActiveRecordBase<WaybillWorkingTime>
    {

        protected WaybillWorkingTime()
        {}

        public WaybillWorkingTime(int waybillId, DateTime targetDate, int minutes)
        {
            Minutes = minutes;
            Key = new WaybillWorkingTimeKey()
            {
                WaybillId = waybillId,
                TargetDate = targetDate
            };
        }

        [CompositeKey]
        public WaybillWorkingTimeKey Key { get; set; }

        [Property]
        public int Minutes { get; set; }
    }
}
