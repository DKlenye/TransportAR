using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models.service
{
    [ActiveRecord,Model]
    public class TariffCostItem:ActiveRecordBase<TariffCostItem>
    {
        [PrimaryKey,IdProperty]
        public int Id { get; set; }

        [BelongsTo("VehicleModelId")]
        public VehicleModel Model { get; set; }

        [Property]
        public TariffCostItemType CostItemType { get; set; }

        [Property]
        public decimal? Km0 { get; set; }
        [Property]
        public decimal? Km100 { get; set; }
        [Property]
        public decimal? Km300 { get; set; }
        [Property]
        public decimal? Km500 { get; set; }
        [Property]
        public decimal? Km700 { get; set; }
        [Property]
        public decimal? Km900 { get; set; }
    }
}
