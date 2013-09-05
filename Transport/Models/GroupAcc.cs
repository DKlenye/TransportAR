using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using System.Text;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;

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
