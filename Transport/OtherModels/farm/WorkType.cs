using Kdn.Ext.Attributes;

namespace Transport.OtherModels.farm
{
    public class WorkType:common.Ownered
    {


        public const string FieldsMapping = @"[
                'WorkTypeId',
                'WorkTypeName'
            ]";

        [IdProperty]
        public int WorkTypeId { get; set; }
        public string WorkTypeName { get; set; }
        public NormType NormType { get; set; }
        
    }
}
