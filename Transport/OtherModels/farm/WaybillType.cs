using Kdn.Ext.Attributes;

namespace Transport.OtherModels.farm
{

    public class WaybillType
    {

        public const string FieldsMapping = @"[
                'WaybillTypeId',
                'WaybillTypeName'
            ]";

        [IdProperty]
        public int WaybillTypeId { get; set; }
        public string WaybillTypeName { get; set; }
        public string PrintTemplate { get; set; }

    }
}
