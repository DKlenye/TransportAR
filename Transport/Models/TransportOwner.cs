using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models
{
    /// <summary>
    /// Владелец транспорта (разделения транспорта)
    /// </summary>
    [Model,ActiveRecord]
   public class TransportOwner : ActiveRecordBase<TransportOwner>
    {
        /// <summary>
        /// Код владельца
        /// </summary>
        [IdProperty,PrimaryKey]
        public int OwnerId { get; set; }

        /// <summary>
        /// Наименование владельца
        /// </summary>
        [Property]
        public string OwnerName { get; set; }
    }
}
