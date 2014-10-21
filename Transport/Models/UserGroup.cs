using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models
{
    [Model,ActiveRecord("UserGroups")]
    public class UserGroup:ActiveRecordBase<UserGroup>
    {
        [IdProperty,PrimaryKey]
        public int UserGroupId { get; set; }
        [Property]
        public string UserGroupName { get; set; }
    }
}
