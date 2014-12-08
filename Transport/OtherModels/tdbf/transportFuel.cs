namespace Transport.OtherModels.tdbf {
    
    public class transportFuel {

        public byte ownerId { get; set; }
        public int garageNumber { get; set; }
        public int fuelId { get; set; }



        public override bool Equals(object obj)
        {
           if (obj==null) return false;
           var o = obj as transportFuel;
           return o.fuelId == fuelId && o.garageNumber == garageNumber && o.ownerId == ownerId;

        }

        public override int GetHashCode()
        {
           return ownerId ^ garageNumber ^ fuelId;
        }

    }
}
