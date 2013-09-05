using System;
using Newtonsoft.Json;

namespace Transport.OtherModels.farm.common
{
    public class Ownered
    {   
        [JsonIgnore]
        public int? OwnerId { get; set; }
    }
}
