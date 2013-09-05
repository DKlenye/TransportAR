using System;
using System.Collections.Generic;
using Kdn.Ext;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NHibernate;
using NHibernate.Criterion;

namespace Transport.OtherModels.dbf {
   public class PolymirWay {

      public string P_OTPR { get; set; }
      public string P_NAZN { get; set; }

      public int RAS { get; set; }


      public override bool Equals(object obj)
      {
         var o = obj as PolymirWay;

         if (o == null) return false;

         return o.P_NAZN == P_NAZN && o.P_OTPR == P_OTPR;
      }

      public override int GetHashCode()
      {
         return P_OTPR.GetHashCode() ^ P_NAZN.GetHashCode();
      }

   }
}
