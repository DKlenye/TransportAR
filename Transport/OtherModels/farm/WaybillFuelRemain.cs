using Newtonsoft.Json;

namespace Transport.OtherModels.farm
{
    public class WaybillFuelRemain
    {
        [JsonIgnore]
        public Waybill Waybill { get; set; }
        public int FuelId { get; set; }
        public decimal? DepartureRemain { get; set; }
        public decimal? ReturnRemain { get; set; }


        public override bool Equals(object obj)
        {
            WaybillFuelRemain o = obj as WaybillFuelRemain;
            return o.Waybill == Waybill && o.FuelId == o.FuelId;
        }

        public override int GetHashCode()
        {
            return Waybill.GetHashCode() ^ FuelId.GetHashCode();
        }
    }
}
