using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models
{
    [Model,ActiveRecord]
   public class Accounting : ActiveRecordBase<Accounting>
    {
        [IdProperty,PrimaryKey]
        public int AccountingId { get; set; }
        [Property(Length=50)]
        public string AccountingName { get; set; }

    }
}
