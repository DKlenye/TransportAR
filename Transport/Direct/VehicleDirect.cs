using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using Ext.Direct;
using Kdn.Direct;
using Newtonsoft.Json.Linq;
using NHibernate.Criterion;
using Transport.Models;

namespace Transport.Direct
{
    public partial class Direct
    {
        [DirectMethod]
        [ParseAsJson]
        public string SetPosition(JObject o)
        {
            JToken token;
            if (o.TryGetValue("WaybillId", out token))
            {
                var v = Waybill.Find(token.Value<int>());
                v.SetPosition();
            }
            return "";
        }


        [DirectMethod]
        public DataSerializer GetVehicleReoling(int vehicleId)
        {
            /*var selectVehicleReoilling = VehicleReoilling.FindAll(
                Expression.Where<VehicleReoilling>(
                    x=>
                        x.Vehicle.VehicleId == vehicleId
                )
            );
            return new DataSerializer(selectVehicleReoilling);*/
            return null;
        }
    }
}
