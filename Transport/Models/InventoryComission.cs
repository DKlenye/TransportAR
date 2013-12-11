using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models
{
    [Model,ActiveRecord]
    public class InventoryComission : ActiveRecordBase<InventoryComission>
    {
        [IdProperty, PrimaryKey]
        public int Id { get; set; }

        [BelongsTo("DepartmentId")]
        public Department Department { get; set; }

        [BelongsTo("ColumnId")]
        public TransportColumn Column { get; set; }
        
        [BelongsTo,AllowBlank]
        public Employee Employee0 { get; set; }
        [BelongsTo, AllowBlank]
        public Employee Employee1 { get; set; }
        [BelongsTo, AllowBlank]
        public Employee Employee2 { get; set; }
        [BelongsTo, AllowBlank]
        public Employee Employee3 { get; set; }
        [BelongsTo, AllowBlank]
        public Employee Employee4 { get; set; }

    }
}
