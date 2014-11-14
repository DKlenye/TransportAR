using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using System.Text;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;

namespace Transport.Models
{

    [Model,ActiveRecord]
    public class ServiceGroup : ActiveRecordBase<ServiceGroup>
    {
        [IdProperty,PrimaryKey]
        public int ServiceGroupId { get; set; }
        [Property]
        public string ServiceGroupName { get; set; }     
        
    }
}
