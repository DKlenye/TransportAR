using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using System.Text;
using Kdn.Ext.Attributes;
using NHibernate.Criterion;


namespace Transport.Models
{

   [Model, ActiveRecord]
   public class TireMaker : ActiveRecordBase<TireMaker>
   {
      [IdProperty, PrimaryKey]
      public int TireMakerId { get; set; }
      [Property(Length=50)]
      public string TireMakerName { get; set; }
   }
}
