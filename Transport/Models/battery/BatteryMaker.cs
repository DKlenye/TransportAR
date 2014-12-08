using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

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
