using System;
using System.Collections.Generic;
using Kdn.Ext;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NHibernate;
using NHibernate.Criterion;


namespace Transport.OtherModels.tdbf {
   public class TransportSubOwner {

      public virtual int subOwnerId { get; set; }
      public virtual string subOwnerName { get; set; }
      public virtual int? ownerId { get; set; }

   }
}
