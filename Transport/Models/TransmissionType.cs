using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models
{
    [ActiveRecord, Model]
    public class TransmissionType : ActiveRecordBase<TransmissionType>
    {
        [IdProperty, PrimaryKey]
        public int TransmissionTypeId { get; set; }

        [Property]
        public string TransmissionTypeName { get; set; }
    }
}
