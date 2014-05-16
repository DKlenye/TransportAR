using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using System.Text;
using Kdn.Ext.Attributes;
using NHibernate.Criterion;


namespace Transport.Models
{

   [Model, ActiveRecord]
   public class TireStandard : ActiveRecordBase<TireStandard>
   {
      [IdProperty, PrimaryKey]
      public int TireStandardId { get; set; }
      [Property(Length=50)]
      public string TireStandardName { get; set; }
   }
}
