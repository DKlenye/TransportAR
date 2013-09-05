using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using System.Text;
using Kdn.Ext.Attributes;
using Castle.ActiveRecord.Queries;

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
