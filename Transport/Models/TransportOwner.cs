using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models
{
    //Поразделение базы данных(для разделения транспорта)
    [Model,ActiveRecord]
   public class TransportOwner : ActiveRecordBase<TransportOwner>
    {
        [IdProperty,PrimaryKey]
        public int OwnerId { get; set; }
        [Property]
        public string OwnerName { get; set; }
    }
}
