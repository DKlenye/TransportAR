using Castle.ActiveRecord;
using Kdn.Ext.Attributes;
using NHibernate.Criterion;

namespace Transport.Models
{
    [Model, ActiveRecord(Where = "IsDeleted = 0")]
    public class RequestAttachments : ActiveRecordBase<RequestAttachments>
    {

        [IdProperty, PrimaryKey]
        public int Id { get; set; }

        [Property]
        public int RequestId { get; set; }

        [Property]
        public string Name { get; set; }

        [Property(Lazy = true)]
        public virtual byte[] Cont { get; set; }


        public static RequestAttachments[] FindByRequest(int requestId)
        {
            return FindAll(Expression.Where<RequestAttachments>(x => x.RequestId == requestId));
        }

    }
}