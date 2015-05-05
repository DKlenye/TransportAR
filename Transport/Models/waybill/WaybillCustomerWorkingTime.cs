using Castle.ActiveRecord;
using Kdn.Ext.Attributes;
using NHibernate.Criterion;

namespace Transport.Models
{
    [ActiveRecord,Model]
    public class WaybillCustomerWorkingTime : ActiveRecordBase<WaybillCustomerWorkingTime>
    {
        [PrimaryKey,IdProperty]
        public int Id { get; set; }

        [Property]
        public int WaybillId { get; set; }

        [BelongsTo("CustomerId")]
        public Customer Customer { get; set; }

        [Property]
        public int Minutes { get; set; }


        public static WaybillCustomerWorkingTime[] findByWaybillId(int WaybillId)
        {
            return FindAll(Restrictions.Where<WaybillCustomerWorkingTime>(x => x.WaybillId == WaybillId));
        }

    }
}
