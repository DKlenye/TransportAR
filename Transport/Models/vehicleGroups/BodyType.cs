using Castle.ActiveRecord;
using Kdn.Ext.Attributes;
using NHibernate.Criterion;

namespace Transport.Models
{
    [Model,ActiveRecord]
    public class BodyType : ActiveRecordBase<BodyType>
    {
        [IdProperty,PrimaryKey]
        public int BodyTypeId { get; set; }
        [Property(Length=50)]
        public string BodyTypeName { get; set; }

        [Property]
        public int? ReplicationId { get; set; }
        [Property]
        public ReplicationSource? ReplicationSource { get; set; }
        

         public static BodyType FindFromDbsrv2(int id)
         {
            return FindFirst(Expression.Where<BodyType>(x=>x.ReplicationId==id && x.ReplicationSource == Transport.ReplicationSource.dbsrv2));
         }

    }
}
