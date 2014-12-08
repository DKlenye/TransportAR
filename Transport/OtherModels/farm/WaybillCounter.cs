﻿using Newtonsoft.Json;

namespace Transport.OtherModels.farm
{
    public class WaybillCounter
    {
        [JsonIgnore]
        public Waybill Waybill { get; set; }
        public int CounterId { get; set; }
        public decimal? Departure { get; set; }
        public decimal? Return { get; set; }


        public override bool Equals(object obj)
        {
            WaybillCounter o = obj as WaybillCounter;
            return o.Waybill == Waybill && o.CounterId == o.CounterId;
        }

        public override int GetHashCode()
        {
            return Waybill.GetHashCode() ^ CounterId.GetHashCode();
        }
    }
}
