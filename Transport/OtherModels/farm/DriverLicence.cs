using System;
using System.Collections.Generic;
using Kdn.Ext.Attributes;

namespace Transport.OtherModels.farm
{

    public class DriverLicence
    {
        [IdProperty]
        public virtual int LicenceId {get;set;}
        public virtual string Serial { get; set; }
        public virtual string Number { get; set; }
        public virtual string Category { get; set; }
        public virtual Driver Driver { get; set; }
        public virtual DateTime DateOfTerm { get; set; }
    }
}
