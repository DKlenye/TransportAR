using System;
using Kdn.Ext;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

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
