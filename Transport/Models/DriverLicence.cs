using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using System.Text;
using Kdn.Attributes;
using Kdn.Ext.Attributes;
using Iesi.Collections.Generic;
using Newtonsoft.Json;
using NHibernate.Criterion;

namespace Transport.Models
{
    [Model,ActiveRecord]
    public class DriverLicence:ActiveRecordBase<DriverLicence>,Interfaces.IOwnered
    {
        [IdProperty,PrimaryKey]
        public int LicenceId { get; set; }
        [Property]
        public string Serial { get; set; }
        [Property]
        public string Number { get; set; }
        [AllowBlank,Property]
        public string Category { get; set; }
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

        public static DriverLicence FindFromDbsrv2(int id) {
           return FindFirst(Expression.Where<DriverLicence>(x => x.ReplicationId == id && x.ReplicationSource == Transport.ReplicationSource.dbsrv2));
        }



    }
}
