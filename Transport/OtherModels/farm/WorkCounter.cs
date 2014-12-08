using Kdn.Ext.Attributes;

namespace Transport.OtherModels.farm
{
    public class WorkCounter
    {

        public const string FieldsMapping = @"[
                'CounterId',
                'CounterName'
            ]";

        [IdProperty]
        public int CounterId { get; set; }
        public string CounterName { get; set; }
    }
}
