using System;
using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models
{
    [ActiveRecord,Model]
    public class WaybillInvoice:ActiveRecordBase<WaybillInvoice>
    {
        [IdProperty,PrimaryKey]
        public int WaybillInvoiceId { get; set; }

        [Property]
        public int WaybillId { get; set; }

        [Property]
        public string Serial { get; set; }

        [Property]
        public string Number { get; set; }

        [Property]
        public DateTime Date { get; set; }
    }
}
