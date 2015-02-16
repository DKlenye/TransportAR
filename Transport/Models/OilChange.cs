using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models
{
    [ActiveRecord, Model]
    public class OilChange
    {
        [IdProperty, PrimaryKey]
        public int OilChangeId { get; set; }

        [Property]
        public DateTime Date { get; set; }

        [Property]
        public int Duration { get; set; }

        [BelongsTo("NormId")]
        public Norm Norm { get; set; }

        [Property, AllowBlank]
        public int? Percentage { get; set; }
    }
}
