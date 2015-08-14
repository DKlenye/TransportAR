using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models
{
    //Группы по бизнессплану
    [Model, ActiveRecord]
    public class BusinessPlanGroup : ActiveRecordBase<BusinessPlanGroup>
    {
        [IdProperty, PrimaryKey]
        public int BusinessPlanGroupId { get; set; }
        [Property]
        public string BusinessPlanGroupName { get; set; }
    }
}
