namespace Transport.OtherModels.tdbf {
    
    public class waybillsFuelRemains {
       public waybillsFuelRemains() { }

        public byte ownerId { get; set; }
        public int waybillNumber { get; set; }
        public int garageNumber { get; set; }
        public int fuelId { get; set; }
                     
        public decimal departureRemain { get; set; }
        public decimal returnRemain { get; set; }
        public System.Nullable<bool> _dbf { get; set; }


        public override bool Equals(object obj) {
           var o  = obj as waybillsFuelRemains;

           return waybillNumber == o.waybillNumber && fuelId == fuelId;
        }

        public override int GetHashCode() {
           return waybillNumber.GetHashCode() ^ fuelId.GetHashCode();
        }



    }
}
