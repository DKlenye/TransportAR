using System;
using Castle.ActiveRecord;
using Kdn.Ext.Attributes;
using NHibernate.Criterion;

namespace Transport.Models.request
{
    [ActiveRecord, Model]
    public class DriverOutOfWork:ActiveRecordBase<DriverOutOfWork>
    {
        [PrimaryKey,IdProperty]
        public int Id { get; set; }
        
        [BelongsTo("DriverId")]
        public Driver Driver { get; set; }

        [Property]
        public DateTime StartDate { get; set; }

        [Property]
        public DateTime? EndDate { get; set; }

        [Property]
        public OutOfWorkCause Cause { get; set; }

        public static DriverOutOfWork[] FindByDate(DateTime date)
        {
            return FindAll(
                Expression.Where<DriverOutOfWork>(x => x.StartDate <= date && (x.EndDate >= date || x.EndDate == null)));
        }


    }

    public enum OutOfWorkCause
    {
        None = 0,
        Vacation = 1,
        Sick = 2,
        Holiday = 3
    }
}
