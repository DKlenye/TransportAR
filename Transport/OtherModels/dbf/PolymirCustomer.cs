using System;
using System.Collections.Generic;
using Kdn.Ext;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NHibernate;
using NHibernate.Criterion;

namespace Transport.OtherModels.dbf {
   public class PolymirCustomer {
      public string SHZ { get; set; }
      public string NAIMP { get; set; }
      public string NAIMP1 { get; set; }
      public string SHPZ { get; set; }
      public string ADR { get; set; }
   }
}
