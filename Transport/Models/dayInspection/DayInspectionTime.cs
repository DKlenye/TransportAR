using System;
using Castle.ActiveRecord;

namespace Transport.Models.dayInspection
{
    [ActiveRecord]
    public class DayInspectionTime:ActiveRecordBase<DayInspectionTime>
    {
        [PrimaryKey(PrimaryKeyType.Assigned)]
        public int WaybillId { get; set; }
        [Property(Length = 5)]
        public string DepartureTime { get; set; }
        [Property(Length = 5)]
        public string ReturnTime { get; set; }
    }
}
