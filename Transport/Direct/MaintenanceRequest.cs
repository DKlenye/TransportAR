using System.Linq;
using Ext.Direct;
using Newtonsoft.Json.Linq;
using Transport.Models;

namespace Transport.Direct
{

    public class MaintenanceInfo
    {
        public Driver Driver { get; set; }
        public decimal FuelRemain { get; set; }
        public decimal? Km { get; set; }
    }


    public partial class Direct:Kdn.Direct.Direct
    {

       [DirectMethod]
       [ParseAsJson]
        public MaintenanceInfo MaintenanceInfoRead(JObject o)
       {
         JToken p;
         int VehicleId = 0;
          
         if( o.TryGetValue("VehicleId", out p) )
         {
             VehicleId = p.Value<int>();
             Waybill w = Waybill.LastClose(VehicleId);

             if(w==null) return new MaintenanceInfo();

             WaybillCounter counter = WaybillCounter.findByWaybillId(w.WaybillId).FirstOrDefault(x => x.CounterId == 1);

             return new MaintenanceInfo()
             {
                 Driver = ((FullCar)FullCar.Find(VehicleId)).ResponsibleDriver,
                 FuelRemain = WaybillFuelRemain.findByWaybillId(w.WaybillId).Sum(x => x.ReturnRemain ?? 0),
                 Km = counter == null ? (int?) 0 : counter.Return
             };

         }

           return new MaintenanceInfo();
           
       }
      
    }
}
