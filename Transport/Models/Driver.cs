﻿using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models
{
    [Model,ActiveRecord]    
    public class Driver:ActiveRecordBase<Driver>,Interfaces.IOwnered
    {
        [IdProperty,PrimaryKey]
        public int DriverId { get; set; }

        [BelongsTo("EmployeeId",UniqueKey="EmployeeOwner_idx")]
        public Employee Employee { get; set; }

        [Property]
        public int? DriverClass { get; set; }

        [Property(Index="idx_repliactionDriver")]
        public int? ReplicationId { get; set; }
        [Property]
        public ReplicationSource? ReplicationSource { get; set; }
       
        #region Owner
        [Property(UniqueKey="EmployeeOwner_idx"), AllowBlank]
        public int OwnerId { get; set; }
        public void setOwner(int OwnerId) {
           this.OwnerId = OwnerId;
        }
        #endregion

       


    }
}
