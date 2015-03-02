using System;
using Castle.ActiveRecord;

namespace Transport.Models.waybill
{
    [ActiveRecord]
    public class CashBoxData:ActiveRecordBase<CashBoxData>
    {
        [PrimaryKey]
        public int idspypods { get; set; }
        [Property]
        public string ndok { get; set; }
        [Property]
        public int id_men { get; set; }
        [Property]
        public DateTime ddok { get; set; }
        [Property]
        public int AdvanceReportItemId { get; set; }
        [Property]
        public int stm { get; set; }
    }
}
