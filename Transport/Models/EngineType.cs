using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models
{
    [Model,ActiveRecord]
    public class EngineType : ActiveRecordBase<EngineType>
    {
        [IdProperty,PrimaryKey]
        public int EngineTypeId { get; set; }
        [Property(Length=50)]
        public string EngineTypeName { get; set; }
       
    }
}
