using Castle.ActiveRecord;
using Kdn.Ext.Attributes;
using NHibernate.Criterion;

namespace Transport.Models
{
    [ActiveRecord, Model]
    public class WaybillAdvanceReport : ActiveRecordBase<WaybillAdvanceReport>
    {
        [IdProperty,PrimaryKey]
        public int Id { get; set; }
        [Property]
        public int WaybillId { get; set; }

        [BelongsTo("CustomerId")]
        public Customer Customer { get; set; }

        [BelongsTo("ItemId")]
        public AdvanceReportItem ReportItem { get; set; }


        [Property]
        public decimal Cost { get; set; }

        public static WaybillAdvanceReport[] findByWaybillId(int WaybillId)
        {
            return FindAll(Restrictions.Where<WaybillAdvanceReport>(x => x.WaybillId == WaybillId));
        }

    }
}
