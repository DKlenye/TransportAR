using System;
using System.Collections.Generic;
using Kdn.Ext;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NHibernate;
using NHibernate.Criterion;

namespace Transport.OtherModels.dbf {
   public class PolymirDrivers {
      public int TABN { get; set; }
      public string FIO { get; set; }
      public string IO { get; set; }
      public string NVU { get; set; }
      public string KL { get; set; }
   }
}
