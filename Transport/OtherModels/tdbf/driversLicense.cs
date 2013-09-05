using System.Collections.Generic;
using System.Text;
using System;
using Castle.ActiveRecord;


namespace Transport.OtherModels.tdbf {
    
    
    [ActiveRecord("driversLicenses")]
    public class Driverslicense : tdbfActiveRecord<Driverslicense> {
        
        [PrimaryKey(Column="LicenceId")]
        public virtual int Licenceid { get; set; }

        [Property(Column = "driverId")]
        public virtual int DriverId { get; set; }
        
        [Property(Column="LicenceSerial", Length=5, NotNull=true)]
        public virtual string Licenceserial { get; set; }
        
        [Property(Column="LicenceNumber", Length=10, NotNull=true)]
        public virtual string Licencenumber { get; set; }
        
        [Property(Column="Category", NotNull=true)]
        public virtual short Category { get; set; }
        
        [Property(Column="DateOfTerm")]
        public virtual System.DateTime Dateofterm { get; set; }
        
        [Property(Column="InsertDate", NotNull=true)]
        public virtual System.DateTime Insertdate { get; set; }
    }
}
