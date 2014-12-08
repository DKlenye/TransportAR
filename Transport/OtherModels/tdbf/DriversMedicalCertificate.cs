using Castle.ActiveRecord;


namespace Transport.OtherModels.tdbf {


   [ActiveRecord("DriversMedicalCertificate")]
    public class Driversmedicalcertificate : tdbfActiveRecord<Driversmedicalcertificate> {
        
        [Property(Column="driverId")]
        public virtual int Driverid { get; set; }

        [Property(Column = "dateOfTerm")]
        public virtual System.DateTime Dateofterm { get; set; }

        
        [PrimaryKey(Column="MedicalId")]
        public virtual int Medicalid { get; set; }
        
        [Property(Column="Num", NotNull=true)]
        public virtual int Num { get; set; }
    }
}
