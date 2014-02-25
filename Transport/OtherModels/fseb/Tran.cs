
using System;
using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.OtherModels.fseb
{

    [Serializable]
    public class TranKey
    {
        [KeyProperty]
        public string ANAL { get; set; }
        [KeyProperty]
        public string BS { get; set; }
        [KeyProperty]
        public string SBS { get; set; }


        public override int GetHashCode()
        {
            return (ANAL+BS+SBS).GetHashCode();
        }

        public override bool Equals(object obj)
        {
            if (this == obj)
            {
                return true;
            }
            var key = obj as TranKey;
            if (key == null)
            {
                return false;
            }
            if (ANAL != key.ANAL || BS != key.BS || SBS !=key.SBS)
            {
                return false;
            }
            return true;
        }
    }   
    


    [ActiveRecord]
    public class Tran :fsebAR<Tran>
    {

        public Tran(string ANAL, string BS, string SBS, decimal KLV, decimal HR)
        {
            key = new TranKey()
            {
                ANAL = ANAL,
                BS = BS,
                SBS = SBS
            };
            this.KLV = KLV;
            this.HR = HR;
        }

        protected Tran(){}

        [CompositeKey]
        public TranKey key { get; set; }
        [Property]
        public decimal KLV { get; set; }
        [Property]
        public decimal HR { get; set; }
    }
}
