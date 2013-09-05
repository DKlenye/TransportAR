using System;
using Kdn.Ext;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Transport.OtherModels.farm
{

    public class Refuelling
    {
        public int RefuellingId { get; set; }
        public DateTime RefuellingDate { get; set; }
        public int FuelId { get; set; }
        public decimal Quantity { get; set; }

    }

    public class WaybillRefuelling : Refuelling
    {
        public int WaybillId { get; set; }
        public int DriverId { get; set; }
        public int RefuellingPlaceId { get; set; }
    }

    public class OtherRefuelling : Refuelling
    {
        public int PeopleId { get; set; }
    }

}
