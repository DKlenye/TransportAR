using System;
using Kdn.Ext;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using NHibernate;

namespace Transport.OtherModels.farm
{
    public class VehicleDriver
    {
        public int VehicleId { get; set; }
        public int DriverId { get; set; }
        public bool IsResponsible { get; set; }

        public override int GetHashCode()
        {
            return VehicleId.GetHashCode() ^ DriverId.GetHashCode();
        }

        public override bool Equals(object obj)
        {
            VehicleDriver o = obj as VehicleDriver;
            return o.VehicleId == VehicleId && o.DriverId == DriverId;
        }

        public static VehicleDriver Save(JArray a, ISession session)
        {
            ITransaction tx = session.BeginTransaction();
            VehicleDriver vd; 
            try
            {
                vd = JsonConvert.DeserializeObject<VehicleDriver>(a[0].ToString());                
                
                if (vd.IsResponsible){
                    session.CreateQuery(
                        String.Format("update VehicleDriver set IsResponsible = false where VehicleId = {0}", vd.VehicleId)
                    ).ExecuteUpdate();
                }

                session.SaveOrUpdate(vd);
                session.Flush();
                tx.Commit();
            }
            catch (Exception ex) { if (tx.IsActive) tx.Rollback(); throw (ex); }
            return vd;

        }


    }
}
