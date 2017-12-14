﻿using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

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

       [Property]
       public int? OrderId { get; set; }

       [Property]
       public int? AgreementId { get; set; }

    }
}
