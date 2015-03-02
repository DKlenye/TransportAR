using System;
using Kdn.Ext.Attributes;

namespace Transport.Models.waybill
{
    [Model]
    public class CashBoxDataDto
    {
        public int id_men { get; set; }
        [IdProperty]
        public string ndok { get; set; }
        public DateTime ddok { get; set; }
        public string fio { get; set; }
    }
}
