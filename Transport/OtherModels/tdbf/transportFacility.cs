using System;


namespace Transport.OtherModels.tdbf {
    
    public class transportFacility {

        public byte ownerId { get; set; }
        public int garageNumber { get; set; }
       
        public string model { get; set; }
        public string fondModel { get; set; }
        public string registrationNumber { get; set; }
        public string inventory { get; set; }
        public System.Nullable<short> makeYear { get; set; }
        public string inputsDebit { get; set; }
        public string inputsCredit { get; set; }
        public string engineNo { get; set; }
        public string bodyNo { get; set; }
        public decimal? capacityTonns { get; set; }
        public System.Nullable<short> capacityPassengers { get; set; }
        public decimal? dimensionWidth { get; set; }
        public decimal? dimensionLength { get; set; }
        public decimal? dimensionHeight { get; set; }
        public decimal? arrowSweep { get; set; }
        public decimal? shovelVol { get; set; }
        public System.Nullable<short> engineVol { get; set; }
        public decimal? power { get; set; }
        public int? selfMass { get; set; }
        public int? fullMass { get; set; }
        public decimal? coolVol { get; set; }
        public decimal? fuelVol { get; set; }
        public decimal? engineOilVol { get; set; }
        public decimal? hydraVol { get; set; }
        public decimal? plastOilVol { get; set; }
        public int? groupId { get; set; }
        public int? groupMainId { get; set; }
        public int? groupAccId { get; set; }
        public int? groupLimitId { get; set; }
        public int? groupServiceId { get; set; }
        public int? waybillTypeId { get; set; }
        public int? waybillPackageId { get; set; }
        public decimal shiftBegin { get; set; }
        public decimal shiftDuration { get; set; }
        public int? regimeId { get; set; }
        public int? customerId { get; set; }
        public int? trailerGarageNumber { get; set; }
        public System.Nullable<byte> _kminvalid { get; set; }
        public System.Nullable<byte> _mhinvalid { get; set; }
        public System.Nullable<short> service1 { get; set; }
        public System.Nullable<short> service2 { get; set; }
        public string serviceDocNo { get; set; }
        public string RegSertificate { get; set; }
        public DateTime?RegFinish { get; set; }
        public int? bodyTypeId { get; set; }
        public int scheduleId { get; set; }
        public string disposal { get; set; }
        public DateTime?nextInspection { get; set; }
        public int? oilOwnerId { get; set; }
        public int? subOwnerId { get; set; }
        public DateTime?writeOff { get; set; }
        public int? startFuelId { get; set; }
        public decimal? startRemain { get; set; }
        public decimal? startKm { get; set; }
        public decimal? startMh { get; set; }
        public int TransportId { get; set; }
        public System.Nullable<bool> ExpenseListFlag { get; set; }


        public int ReplicationId { get { return ownerId * 10000 + garageNumber; } }


        public override int GetHashCode() {
           return ReplicationId;
        }
        public override bool Equals(object obj) {
           if( obj == null || !( obj is transportFacility ) ) return false;
           return ( ( obj as transportFacility ).ReplicationId == ReplicationId );
        }


    }
}
