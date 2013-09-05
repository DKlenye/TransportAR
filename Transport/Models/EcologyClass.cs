using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using System.Text;
using Kdn.Ext.Attributes;
using NHibernate.Criterion;

namespace Transport.Models {
   [Model, ActiveRecord]
   public class EcologyClass : ActiveRecordBase<EcologyClass> {
      [IdProperty, PrimaryKey]
      public int EcologyClassId { get; set; }
      [Property(Length = 50)]
      public string EcologyClassName { get; set; }
   }
}
