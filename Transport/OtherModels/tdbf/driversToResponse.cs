using System;
using System.Text;
using System.Collections.Generic;


namespace Transport.OtherModels.tdbf {
    
    public class driversToResponse {
        public byte ownerId { get; set; }
        public int garageNumber { get; set; }
        public int driverId { get; set; }

        public override bool Equals(object obj) {
           var o = obj as driversToResponse;
           if( o == null ) return false;
           return o.driverId == driverId && o.garageNumber == garageNumber && o.ownerId == ownerId;
        }

        public override int GetHashCode() {
           return driverId ^ garageNumber ^ ownerId;
        }



    }
}
