﻿using Kdn.Ext.Attributes;

namespace Transport.OtherModels.farm
{
    public class NormType
    {
        public const string FieldsMapping = @"[
                'NormTypeId',
                'NormTypeName',
                'ValueType'
            ]";

        [IdProperty]
        public int NormTypeId { get; set; }
        public string NormTypeName { get; set; }
        public string ValueType { get; set; }        
        public int Coefficient { get; set; }
        public WorkCounter WorkCounter { get; set; }

    }
}
