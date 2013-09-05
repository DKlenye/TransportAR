using System;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;


namespace Kdn.Ext.Attributes
{
    [AttributeUsage(AttributeTargets.Property,AllowMultiple=false,Inherited=true)]
    [JsonObject(MemberSerialization=MemberSerialization.OptIn)]
    public class ColumnAttribute:Attribute{
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string header { get; set; }
        
        public string Editor { get; set; }

        public bool Readonly { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int width { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public bool? sortable { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public bool? resizable { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public bool? hideable { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public bool? hidden { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string dataIndex { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string align { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string xtype { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public JObject editor
        {
            get
            {
                if (Editor==null) return null;
                return new JObject() { new JProperty("xtype", Editor) };
            }

        }

    }
}
