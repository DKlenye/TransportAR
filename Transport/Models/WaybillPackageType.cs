using Castle.ActiveRecord;
using Kdn.Ext.Attributes;
using NHibernate.Criterion;

namespace Transport.Models
{
    [Model,ActiveRecord]
   public class WaybillPackageType : ActiveRecordBase<WaybillPackageType>, Interfaces.IOwnered
    {
        [IdProperty,PrimaryKey]
        public int PackageTypeId { get; set; }
        [Property]
        public string PackageTypeName { get; set; }
       
        [Property]
        public bool notActual { get; set; }

        [AllowBlank, Property]
        public int OwnerId { get; set; }
        public void setOwner(int OwnerId)
        {
            this.OwnerId = OwnerId;
        }

        [Property]
        public int? ReplicationId { get; set; }
        [Property]
        public ReplicationSource? ReplicationSource { get; set; }


        public override void SaveAndFlush() {
           base.SaveAndFlush();

           var package = WaybillPackage.FindFirst(Expression.Where<WaybillPackage>(x => x.PackageTypeId == PackageTypeId));

           if( package == null ) {
              new WaybillPackage() {
                 PackageTypeId = PackageTypeId
              }.SaveAndFlush();
           }

        }


        public static WaybillPackageType FindFromDbsrv2(int id)
        {
           return FindFirst(Expression.Where<WaybillPackageType>(x => x.ReplicationId == id && x.ReplicationSource == Transport.ReplicationSource.dbsrv2));
        }

    }
}
