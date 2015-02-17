using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models
{
    [ActiveRecord, Model]
    public class OilChange : ActiveRecordBase<OilChange>
    {
        [IdProperty, PrimaryKey]
        public int OilChangeId { get; set; }

        [Property]
        public DateTime Date { get; set; }

        [Property]
        public int Duration { get; set; }

        [Property]
        public int NormId { get; set; }

        [Property, AllowBlank]
        public int? Percentage { get; set; }

        [Property]
        public int ReoillingId { get; set; }
    }
}
