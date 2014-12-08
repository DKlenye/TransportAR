using Newtonsoft.Json;

namespace Kdn.Ext.data
{

    public enum FieldType{@auto,@string,@int,@float,@boolean,@date}

    
    public class Field
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public bool? allowBlank { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public bool? useNull { get { return allowBlank; } }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public object defaultValue { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string mapping { get; set; }

        public string name { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string convert { get; set; }
        
        [JsonIgnore]        
        public FieldType _type { get; set; }

        public string type { get { return _type.ToString(); } }
    }
}
