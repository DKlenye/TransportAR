namespace Transport.OtherModels.tdbf {
    
    public class waybillsDriver {

        public byte ownerid { get; set; }
        public int waybillNumber { get; set; }
        public int garageNumber { get; set; }
        public int driverId { get; set; }
        public byte nodelete { get; set; }

        public override bool Equals(object obj)
        {
           var o = obj as waybillsDriver;

           if (o == null) return false;

           return o.waybillNumber == waybillNumber && o.ownerid == ownerid;

        }

        public override int GetHashCode()
        {
           return ownerid ^ waybillNumber;
        }

    }
}
