using System;


namespace Transport.OtherModels.tdbf {

    public class waybills {
        public waybills() {
			//AccFuelConsumptions = new List<AccFuelConsumption>();			
			//waybillsDrivers = new List<waybillsDriver>();
        // waybillsFuelRemains = new List<waybillsFuelRemains>();
		//	waybillsTasks = new List<waybillsTasks>();

        //  drivers = new List<Driver>();
        //  driversResponse = new List<Driver>();

        }
        public byte ownerId { get; set; }
        public int waybillNumber { get; set; }
        public int garageNumber { get; set; }
        public long? waybillPosition { get; set; }
        public byte waybillState { get; set; }
        public int? waybillTypeId { get; set; }
        public int? waybillPackageNumber { get; set; }
        public DateTime?departureDate { get; set; }
        public DateTime?returnDate { get; set; }

        public bool? odometerInvalid { get; set; }
        public bool? mhmeterInvalid { get; set; }

        public decimal? departureKm { get; set; }
        public decimal? returnKm { get; set; }
        public decimal? departureMh { get; set; }
        public decimal? returnMh { get; set; }
        public string licence { get; set; }
        public string formNumber { get; set; }
        public int? trailerGarageNumber { get; set; }
        public string way { get; set; }
        public DateTime?whenClosed { get; set; }
        public string whoClosed { get; set; }
        public bool? _dbf { get; set; }
        public long? waybillIdentity { get; set; }
        public DateTime?accountantChecked { get; set; }
        public int? scheduleId { get; set; }
        public byte? shift { get; set; }
        public byte? _system { get; set; }
        public short? limitYear { get; set; }
        public byte? limitMonth { get; set; }
        public short? accYear { get; set; }
        public byte? accMonth { get; set; }
        public short? WorkMinute { get; set; }
        public int WaybillId { get; set; }
        public byte? TriggerOff { get; set; }

       // public IList<AccFuelConsumption> AccFuelConsumptions { get; set; }
       // public IList<waybillsDriver> waybillsDrivers { get; set; }
       // public IList<waybillsFuelRemain> waybillsFuelRemains { get; set; }


        public int ReplicationId {
           get {
              return WaybillId;
           }
        }
             

        /*public ICollection<waybillsTasks> waybillsTasks { get; set; }*/
       // public ICollection<waybillsFuelRemains> waybillsFuelRemains { get; set; }

       // public IList<Driver> drivers { get; set; }
        //public IList<Driver> driversResponse { get; set; }

        public override bool Equals(object obj) {
           var o = obj as waybills;

           return o.ReplicationId == ReplicationId;
        }

        public override int GetHashCode() {
           return ReplicationId.GetHashCode();
        }

    
    
    }



}
