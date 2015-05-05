using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models
{
    [ActiveRecord]
    public class DistributionCustomers : ActiveRecordBase<DistributionCustomers>
    {
        [PrimaryKey]
        public int Id { get; set; }
        [Property]
        public int ListDetailId { get; set; }
        [AllowBlank, BelongsTo("CustomerId")]
        public Customer Customer { get; set; }
        [Property]
        public int? RequestId { get; set; }
        [Property, AllowBlank]
        public string DepartureTime { get; set; }
        [Property]
        public string ReturnTime { get; set; }
        [Property, AllowBlank]
        public string Description { get; set; }
        [Property,AllowBlank]
        public string WorkObject { get; set; }

    }
}