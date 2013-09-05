using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using System.Text;
using Kdn.Ext.Attributes;
using NHibernate.Criterion;

namespace Transport.Models
{
    [Model,ActiveRecord]
   public class Accounting : ActiveRecordBase<Accounting>
    {
        [IdProperty,PrimaryKey]
        public int AccountingId { get; set; }
        [Property(Length=50)]
        public string AccountingName { get; set; }

    }
}
