using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models
{
    [Model,ActiveRecord]
      public class WorkCounter : ActiveRecordBase<WorkCounter>
    {
       [IdProperty,PrimaryKey]
       public int CounterId { get; set; }
       [Property]
       public string CounterName { get; set; }
    }
}
