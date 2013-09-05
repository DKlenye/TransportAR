using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using System.Text;
using Kdn.Ext.Attributes;
using Kdn.Attributes;
using Newtonsoft.Json;
using NHibernate.Criterion;

namespace Transport.Models
{
   [ActiveRecord, Model]
    public class BatteryRemoveReason : ActiveRecordBase<BatteryRemoveReason>
    {
       [IdProperty,PrimaryKey]
       public int BatteryRemoveReasonId { get; set; }
       [Property]
       public string BatteryRemoveReasonName { get; set; }
       [Property]
       public bool isWriteOff { get; set; }
    }
}
