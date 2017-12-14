using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models
{
    [ActiveRecord,Model]
    public class ServiceAgreement :ActiveRecordBase<ServiceAgreement>
    {
        [PrimaryKey,IdProperty]
        public int AgreementId { get; set; }

        [Property]
        public string AgreementName { get; set; }
    }

}