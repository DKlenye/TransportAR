using System;
using Kdn.Ext;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Transport.OtherModels.tdbf
{

    public class WaybillTaskIncrease
    {        
        public int waybillTaskId { get; set; }
        public int normIncreaseId { get; set; }


        public int ownerId { get; set; }
        public int garageNumber { get; set; }
        public int waybillNumber { get; set; }


        public decimal increase { get; set; }


        public override bool Equals(object obj)
        {
            if (obj == null || !(obj is WaybillTaskIncrease)) return false;
            WaybillTaskIncrease w = obj as WaybillTaskIncrease;
            return (w.waybillTaskId==waybillTaskId && w.normIncreaseId==normIncreaseId);
        }
        public override int GetHashCode()
        {
            return waybillTaskId.GetHashCode() ^ normIncreaseId.GetHashCode();
        }

    }
}
