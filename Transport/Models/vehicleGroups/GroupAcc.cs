using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models
{
    //Группы по бухгалтерии
    [Model,ActiveRecord]
   public class GroupAcc : ActiveRecordBase<GroupAcc>
    {
        [IdProperty,PrimaryKey]
        public int GroupAccId { get; set; }
        [Property]
        public string GroupAccName { get; set; }

        [Property]
        public int? ReplicationId { get; set; }
        [Property]
        public ReplicationSource? ReplicationSource { get; set; }
    }
}
