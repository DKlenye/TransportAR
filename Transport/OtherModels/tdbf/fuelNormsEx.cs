using System;
using System.Text;
using System.Collections.Generic;


namespace Transport.OtherModels.tdbf {
    
    public class fuelNormsEx {
        public int fuelNormExId { get; set; }
        public byte ownerId { get; set; }
        public int garageNumber { get; set; }
        public int fuelNormId { get; set; }
        public string description { get; set; }
        public decimal extraNormPrcn { get; set; }
        public int? normIncreaseId { get; set; }
    }
}
