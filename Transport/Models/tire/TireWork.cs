using System;
using Castle.ActiveRecord;

namespace Transport.Models.tire
{

    [Serializable]
    public class TireWorkKey
    {
        [KeyProperty]
        public int TireMovingId { get; set; }
        [KeyProperty]
        public int Period { get; set; }


        public override int GetHashCode()
        {
            return TireMovingId ^ Period;
        }

        public override bool Equals(object obj)
        {
            if (this == obj)
            {
                return true;
            }
            var key = obj as TireWorkKey;
            if (key == null)
            {
                return false;
            }
            if (TireMovingId != key.TireMovingId || Period != key.Period)
            {
                return false;
            }
            return true;
        }
    }

    [ActiveRecord]
    public class TireWork:ActiveRecordBase<TireWork>
    {
        [CompositeKey]
        public TireWorkKey key { get; set; }
        [Property]
        public int Km { get; set; }
        [Property]
        public bool IsAutomatic { get; set; }
    }
}
