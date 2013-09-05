using System;
using System.Collections.Generic;
using Kdn.Ext;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NHibernate;
using NHibernate.Criterion;


namespace Transport.OtherModels.tdbf {
   public class TheWeather {

      public virtual DateTime targetDate { get; set; }
      public virtual decimal temperature { get; set; }
      public virtual int ownerId { get; set; }


      public override bool Equals(object obj) {
         var o = obj as TheWeather;
         return o.targetDate == targetDate && o.ownerId == ownerId;
      }

      public override int GetHashCode() {
         return targetDate.GetHashCode() ^ ownerId;
      }
   }
}
