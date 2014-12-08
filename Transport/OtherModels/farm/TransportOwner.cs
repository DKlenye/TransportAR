using Kdn.Ext.Attributes;

namespace Transport.OtherModels.farm
{
    public class TransportOwner
    {
        public const string FieldsMapping = @"[
            'OwnerId',
            'OwnerName'
        ]";

        [IdProperty]
        public virtual int OwnerId { get; set; }
        public virtual string OwnerName { get; set; }

        public virtual string FuelConsumptionCredit { get; set; }

    }
}
