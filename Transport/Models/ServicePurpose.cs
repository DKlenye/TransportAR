using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models
{
    [ActiveRecord,Model]
    public class v_ServicePurpose:ActiveRecordBase<v_ServicePurpose>
    {
        [IdProperty,PrimaryKey]
        public int PurposeId { get; set; }
        [Property]
        public string PurposeName { get; set; }
        [Property]
        public string ShortName { get; set; }
        [Property]
        public int AgreementId { get; set; }
    }
}
