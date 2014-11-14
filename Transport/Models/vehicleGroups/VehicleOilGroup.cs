using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models
{
    //Группы по маслам
    [Model, ActiveRecord]
    public class VehicleOilGroup : ActiveRecordBase<GroupAcc>
    {
        [IdProperty, PrimaryKey]
        public int VehicleOilGroupId { get; set; }
        [Property]
        public string VehicleOilGroupName { get; set; }
    }
}
