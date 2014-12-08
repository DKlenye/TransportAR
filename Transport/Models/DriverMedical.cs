using System;
using Castle.ActiveRecord;
using Kdn.Ext.Attributes;
using NHibernate.Criterion;

namespace Transport.Models
{
    [Model,ActiveRecord]
   public class DriverMedical : ActiveRecordBase<DriverMedical>, Interfaces.IOwnered
    {
        [IdProperty,PrimaryKey]
        public int MedicalId { get; set; }
        [Property]
        public string Number { get; set; }
        [BelongsTo("DriverId")]
        public Driver Driver { get; set; }
        [Property(ColumnType = "Date")]
        public DateTime? DateOfTerm { get; set; }

        #region Owner
        public void setOwner(int OwnerId) { }
        public void readWithOwner(DetachedCriteria c, int owner) {
           c.CreateAlias("Driver", "Driver").Add(Expression.Eq("Driver.OwnerId", owner));
        }
        #endregion

        [Property]
        public int? ReplicationId { get; set; }
        [Property]
        public ReplicationSource? ReplicationSource { get; set; }

        public static DriverMedical FindFromDbsrv2(int id) {
           return FindFirst(Expression.Where<DriverMedical>(x => x.ReplicationId == id && x.ReplicationSource == Transport.ReplicationSource.dbsrv2));
        }

    }
}
