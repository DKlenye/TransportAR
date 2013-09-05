using System;
using Kdn.Ext;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

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
