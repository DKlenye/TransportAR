using System;
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

        [Property, AllowBlank]
        public string OrderNumber { get; set; }

        [Property, AllowBlank]
        public string OrderSerial { get; set; }

        public static WaybillCustomerWorkingTime[] findByWaybillId(int WaybillId)
        {
            return FindAll(Restrictions.Where<WaybillCustomerWorkingTime>(x => x.WaybillId == WaybillId));
        }


        public override void SaveAndFlush()
        {

             if (String.IsNullOrEmpty(OrderSerial))
            {
                OrderSerial = FindLastSerial();
            }
            base.SaveAndFlush();
        }

        public override void UpdateAndFlush()
        {
            if (string.IsNullOrEmpty(OrderNumber))
            {
                OrderSerial = null;
            }

            else if (String.IsNullOrEmpty(OrderSerial))
            {
                OrderSerial = FindLastSerial();
            }
            base.UpdateAndFlush();
        }

        public static string FindLastSerial()
        {
            var first = FindFirst(
                    Order.Desc(Projections.Property<WaybillCustomerWorkingTime>(x => x.Id)),
                    Expression.Where<WaybillCustomerWorkingTime>(x => x.OrderSerial != null)             
                );
            if (first != null)
            {
                return first.OrderSerial;
            }
            return "";

        }

        
    }
}
