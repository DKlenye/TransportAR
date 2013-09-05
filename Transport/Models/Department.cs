using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using System.Text;
using Newtonsoft.Json;
using Kdn.Ext.Attributes;

namespace Transport.Models
{
    [Model,ActiveRecord]
    public class Department:ActiveRecordBase<Department>
    {
        [IdProperty,PrimaryKey]
        public int DepartmentId { get; set; }
        [Property]
        public string DepartmentName { get; set; }
        [Property]
        public int OwnerId { get; set; }

        [Property]
        public int? ReplicationId { get; set; }
        [Property]
        public ReplicationSource? ReplicationSource { get; set; }


    }
   
    #region NHibernate relation
    
    [ActiveRecord("Department")]
    public class relation_Department {
       [PrimaryKey]
       public int DepartmentId { get; set; }
       [BelongsTo("OwnerId")]
       public TransportOwner TransportOwner { get; set; }
    }
   
    #endregion
 }
