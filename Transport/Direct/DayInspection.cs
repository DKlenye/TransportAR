using System;
using System.Web;
using System.Reflection;
using System.Collections;
using System.Collections.Generic;
using Ext.Direct;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Castle.ActiveRecord;
using Castle.ActiveRecord.Queries;
using Kdn.Direct;
using Transport.Models;
using Transport.Models.dayInspection;

namespace Transport.Direct
{
   public partial class Direct:Kdn.Direct.Direct
    {

       [DirectMethod]
       [ParseAsJson]
       public DataSerializer VehicleDayInspection(JObject o)
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

       

    }

}
