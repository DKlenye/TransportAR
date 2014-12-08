using System;
using System.Collections.Generic;


namespace Transport.OtherModels.tdbf {
    
    public class fuelNorm {
        public fuelNorm() {
			fuelNormsexes = new List<fuelNormsEx>();
        }
        public byte ownerId { get; set; }
        public int garageNumber { get; set; }
        public int fuelNormId { get; set; }
        
        public int fuelId { get; set; }

        public decimal basicNorm { get; set; }
        public byte normType { get; set; }
        public byte notInMetters { get; set; }
        public byte additional { get; set; }
        public DateTime?orderDate { get; set; }
        public string orderNumber { get; set; }
        public string orderNote { get; set; }
        public string note { get; set; }
        public decimal coefficientMh { get; set; }

        public IList<fuelNormsEx> fuelNormsexes { get; set; }

        public System.Nullable<byte> enabled { get; set; }
        public DateTime?startingDate { get; set; }
        public DateTime?dateOfTerm { get; set; }

    }
}
