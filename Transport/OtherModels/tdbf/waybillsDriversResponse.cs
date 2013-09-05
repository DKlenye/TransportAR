using System;
using System.Text;
using System.Collections.Generic;


namespace Transport.OtherModels.tdbf {
    
    public class waybillsDriversResponse {

        public byte ownerId { get; set; }
        public int waybillNumber { get; set; }
        public int garageNumber { get; set; }
        public int driverId { get; set; }

        public override bool Equals(object obj)
        {
           var o = obj as waybillsDriversResponse;

           if (o == null) return false;

           return o.waybillNumber == waybillNumber && o.ownerId == ownerId;

        }

        public override int GetHashCode()
        {
           return ownerId ^ waybillNumber;
        }
    }
}
