using System.Collections;
using Newtonsoft.Json;

namespace Kdn.Direct
{

    [JsonObject]
    public class DataSerializer
    {
        public DataSerializer(IList List)
        {
            this.List = List;
            this.Total = List.Count;
            this.Success = true;
        }

        public DataSerializer(IList List, int Total)
        {
            this.List = List;
            this.Total = (Total == 0) ? List.Count : Total;
            this.Success = true;
        }

        [JsonProperty(PropertyName = "total")]
        public int Total
        {
            get;
            set;
        }

        [JsonProperty(PropertyName = "data")]
        public object List { get; set; }

        [JsonProperty(PropertyName = "success")]
        public bool Success { get; set; } 
    }
}
