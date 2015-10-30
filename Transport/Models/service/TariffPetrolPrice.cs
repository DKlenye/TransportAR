using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models.service
{
    [ActiveRecord,Model]
    public class TariffPetrolPrice:ActiveRecordBase<TariffPetrolPrice>
    {
        [PrimaryKey,IdProperty]
        public int TariffPetrolPriceId { get; set; }
        [BelongsTo("PetrolId")]
        public Petrol Petrol { get; set; }
        [Property]
        public int Price { get; set; }
        [Property]
        public int Period { get; set; }
    }
}
