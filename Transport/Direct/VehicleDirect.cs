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
        public DataSerializer GetVehicleReoling(JObject o)
        {
            JToken p;

            int VehicleId = 0;
            if (o.TryGetValue("VehicleId", out p))
            {
                VehicleId = p.Value<int>();

                var selectVehicleReoilling = VehicleReoilling.FindAll(
                    Expression.Where<VehicleReoilling>(
                        x =>
                            x.VehicleId == VehicleId
                        )
                    );
                return new DataSerializer(selectVehicleReoilling);
            }
            else
            {
                return null;
            }
        }


        [DirectMethod]
        public DataSerializer GetVehicleNorms(JObject o)
        {
            JToken p;

            int VehicleId = 0;
            if (o.TryGetValue("VehicleId", out p))
            {
                VehicleId = p.Value<int>();


                List<JObject> jVehicleNorms = new List<JObject>();

                var VehicleNorms = Norm.FindAll(
                    Expression.Where<Norm>(
                        x =>
                            x.Car.VehicleId == VehicleId
                        )
                    );

                foreach (var vehicleNorm in VehicleNorms)
                {
                    JObject norm = new JObject();
                    norm["NormId"] = vehicleNorm.NormId;
                    norm["Consumption"] = vehicleNorm.Consumption;
                    norm["MotoToMachineKoef"] = vehicleNorm.MotoToMachineKoef;

                    var WorkType = vehicleNorm.GetWorkType();
                    if (WorkType != null)
                    {
                        norm["WorkTypeName"] = WorkType.WorkTypeName;
                        var WorkUnit = WorkType.GetWorkUnit();
                        if (WorkUnit != null)
                        {
                            norm["UnitName"] = WorkUnit.UnitName;
                            norm["Coefficient"] = WorkUnit.Coefficient;
                        }
                    }
                    jVehicleNorms.Add(norm);
                }


                return new DataSerializer(jVehicleNorms);
            }
            else
            {
                return null;
            }
        }

    }
}
