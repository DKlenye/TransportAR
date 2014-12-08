using Kdn.Ext.Attributes;

namespace Transport.OtherModels.tdbf
{
    public class Customer
    {
        [IdProperty]
        public int customerId { get; set; }
        public string customerName { get; set; }
        public string inputsDebit { get; set; }

        public string excessDebit { get; set; }
        public string excessCredit { get; set; }

        public int ownerId { get; set; }
        public int? hide { get; set; }

    }



}
