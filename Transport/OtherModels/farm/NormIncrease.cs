using System;
using Kdn.Ext.Attributes;

namespace Transport.OtherModels.farm
{

    public class NormIncrease
    {
        public const string FieldsMapping = @"[
                'IncreaseId',
                'IncreaseName',
                'Percent'
            ]";

        [IdProperty]
        public int IncreaseId { get; set; }
        public string IncreaseName { get; set; }
        public int Percent { get; set; }

        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

    }
}
