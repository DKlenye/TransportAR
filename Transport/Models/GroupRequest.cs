using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using System.Text;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;

namespace Transport.Models
{
    //Группы по разнарядке
   [Model,ActiveRecord]
    public class GroupRequest : ActiveRecordBase<GroupRequest>
    {
        [IdProperty,PrimaryKey]
        public int GroupRequestId { get; set; }
        [Property]
        public string GroupRequestName { get; set; }

    }
}
