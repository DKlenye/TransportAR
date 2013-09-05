using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using System.Text;
using Kdn.Ext.Attributes;
using NHibernate.Criterion;

namespace Transport.Models
{
    [Model,ActiveRecord]
   public class WaybillPackage : ActiveRecordBase<WaybillPackage>, Interfaces.IOwnered
    {
        [IdProperty,PrimaryKey]
        public int PackageId { get; set; }
        
        [BelongsTo("PackageTypeId",Update=false,Insert=false)]
        public WaybillPackageType PackageType { get; set; }

        [Property]
        public int PackageTypeId { get; set; }

        [Property]
        public DateTime? CloseDate { get; set; }
        [Property]
        public int? CloseUserId { get; set; }
      

        public void setOwner(int OwnerId)
        { 
        }
        public void readWithOwner(DetachedCriteria c, int owner) {
           c.CreateAlias("PackageType", "PackageType").Add(Expression.Eq("PackageType.OwnerId", owner));
        }

        [Property(Index="idx_WaybillPackageReplication")]
        public int? ReplicationId { get; set; }
        [Property]
        public ReplicationSource? ReplicationSource { get; set; }


        public static WaybillPackage FindFromDbsrv2(int id)
        {
           return FindFirst(Expression.Where<WaybillPackage>(x => x.ReplicationId == id && x.ReplicationSource == Transport.ReplicationSource.dbsrv2));
        }

    }

}
