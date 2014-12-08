using System;


namespace Transport.OtherModels.tdbf {
    
    public class transportTrailer {

        public int trailerGarageNumber { get; set; }
        public string model { get; set; }
        public string registrationNumber { get; set; }
        public string inventory { get; set; }
        public decimal? capacityTonns { get; set; }
        public decimal? dimensionWidth { get; set; }
        public decimal? dimensionLength { get; set; }
        public decimal? dimensionHeight { get; set; }
        public decimal? weight { get; set; }
        public decimal? fullWeight { get; set; }
        public string serviceDocNo { get; set; }
        public int? makeYear { get; set; }
        public string bodyNo { get; set; }
        public int? bodyTypeId { get; set; }
        public string regSertificate { get; set; }
        public DateTime?regfinish { get; set; }
        public System.Nullable<byte> OwnerId { get; set; }
    }
}
