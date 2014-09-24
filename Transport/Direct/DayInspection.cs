using System;
using System.Collections.Generic;
using Ext.Direct;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Kdn.Direct;
using NHibernate.Criterion;
using NHibernate.Linq;
using Transport.Models.dayInspection;

namespace Transport.Direct
{
   public partial class Direct:Kdn.Direct.Direct
    {

       [DirectMethod]
       [ParseAsJson]
       public DataSerializer VehicleDayInspectionRead(JObject o)
       {
           JToken p;

           var date = o["date"].Value<DateTime>();
           var db = new PetaPoco.Database("db2");

           var hash = new Dictionary<int, VehicleDayInspection>();
           var list = new List<VehicleDayInspection>();

           try
           {
               list = db.Fetch<VehicleDayInspection,DriverInspection, VehicleDayInspection>(
                   (inspection,driverInspection) =>
                   {
                       VehicleDayInspection i;

                       if (hash.ContainsKey(inspection.WaybillId))
                       {
                           i = hash[inspection.WaybillId];
                       }
                       else
                       {
                           i = inspection;
                           hash.Add(inspection.WaybillId,inspection);
                       }

                      i.Drivers.Add(driverInspection);
                      return i;
                   },
                   ";exec VehicleDayInspection @0",
                   date
                   );
           }
           catch (Exception ex)
           {
               throw ex;
           }

           /*
           var requests = db.Fetch<VehicleOrderRequests>(";exec VehicleOrderRequestsSelect @0",date);
                      
           foreach (var r in requests)
           {
               if (hash.ContainsKey(r.VehicleOrderId))
               hash[r.VehicleOrderId].Requests.Add(v_Request.Find(r.RequestId));
           }*/
           
          return new DataSerializer(list);

       }

       [DirectMethod]
       [ParseAsJson]
       public DataSerializer VehicleDayInspectionUpdate(JObject o)
       {

           var models = getModels(o);
           models.ForEach(x =>
           {
               var model = JsonConvert.DeserializeObject<VehicleDayInspection>(x.ToString());
               var inspection =
                   DayInspectionTime.FindFirst(
                       Restrictions.Where<DayInspectionTime>(y => y.WaybillId == model.WaybillId));

               if (String.IsNullOrEmpty(model.ReturnTime) && String.IsNullOrEmpty(model.DepartureTime))
               {
                   if(inspection!=null) inspection.DeleteAndFlush();
               }
               else
               {
                   if (inspection == null)
                   {
                       inspection = new DayInspectionTime()
                       {
                           DepartureTime = model.DepartureTime,
                           ReturnTime = model.ReturnTime,
                           WaybillId = model.WaybillId
                       };
                       inspection.CreateAndFlush();
                   }
                   else
                   {
                       inspection.ReturnTime = model.ReturnTime;
                       inspection.DepartureTime = model.DepartureTime;
                       inspection.SaveAndFlush();
                   }
               }
           });

           return new DataSerializer(new List<object>());
       }
       

    }

}
