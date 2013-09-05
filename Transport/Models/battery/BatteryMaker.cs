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
   [ActiveRecord,Model]
    public class BatteryMaker:ActiveRecordBase<BatteryMaker>
    {
       [IdProperty,PrimaryKey]
       public int BatteryMakerId { get; set; }
       [Property]
        public string BatteryMakerName { get; set; }
    }
}
