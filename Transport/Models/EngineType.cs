using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using System.Text;
using Kdn.Ext.Attributes;
using NHibernate.Criterion;

namespace Transport.Models
{
    [Model,ActiveRecord]
    public class EngineType : ActiveRecordBase<EngineType>
    {
        [IdProperty,PrimaryKey]
        public int EngineTypeId { get; set; }
        [Property(Length=50)]
        public string EngineTypeName { get; set; }
       
    }
}
