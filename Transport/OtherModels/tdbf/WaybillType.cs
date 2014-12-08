using Kdn.Ext.Attributes;

namespace Transport.OtherModels.tdbf
{
    public class WaybillType
    {
        [IdProperty]
        public int waybillTypeId { get; set; }
        public string waybillTypeName { get; set; }
    }



}
