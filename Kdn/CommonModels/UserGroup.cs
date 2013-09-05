using System;
using System.Collections.Generic;
using System.Text;
using Kdn.Ext.Attributes;
using Castle.ActiveRecord;



namespace Kdn.CommonModels
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
