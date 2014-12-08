using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models
{
    [Model,ActiveRecord]
   public class Schedule : ActiveRecordBase<Schedule>
    {
       [IdProperty,PrimaryKey]
       public int ScheduleId { get; set; }        
       [Property(Length=30)]
       public string ScheduleName { get; set; }

       [Property]
       public int? ReplicationId { get; set; }
       [Property]
       public ReplicationSource? ReplicationSource { get; set; }
    }

}
