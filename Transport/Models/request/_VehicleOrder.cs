using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using System.Text;
using Kdn.Ext.Attributes;
using NHibernate.Criterion;
using Newtonsoft.Json;

namespace Transport.Models
{
    [Model,ActiveRecord]
    public class VehicleOrder : ActiveRecordBase<VehicleOrder>
    {
        [AllowBlank,PrimaryKey]
        public int VehicleOrderId { get; set; }
        [Property]
        public DateTime OrderDate { get; set; }
        [IdProperty,Property]
        public int VehicleId { get; set; }
        [AllowBlank,BelongsTo("CustomerId")]
        public Customer Customer { get; set; }
        [AllowBlank,BelongsTo("DriverId")]
        public v_Driver Driver { get; set; }
        [Property]
        public DateTime? BusinessTripDate { get; set; }
        
        [AllowBlank, HasMany(Table = "VehicleOrderRequests", Element = "RequestId", ColumnKey = "VehicleOrderId",Fetch=FetchEnum.SubSelect)]
        public ICollection<int> Requests { get; set; }

    }


    [Serializable]
    public class VehicleOrderRequestsKey
    {
        [KeyProperty]
        public int VehicleOrderId { get; set; }
        [KeyProperty]
        public int RequestId { get; set; }


        public override int GetHashCode()
        {
            return VehicleOrderId ^ RequestId;
        }

        public override bool Equals(object obj)
        {
            if (this == obj)
            {
                return true;
            }
            var key = obj as VehicleOrderRequestsKey;
            if (key == null)
            {
                return false;
            }
            if (VehicleOrderId != key.VehicleOrderId || RequestId != key.RequestId)
            {
                return false;
            }
            return true;
        }
    }

    [ActiveRecord]
    public class VehicleOrderRequests : ActiveRecordBase<VehicleOrderRequests>
    {
        [CompositeKey, JsonIgnore]
        public VehicleOrderRequestsKey key { get; set; }

        [IdProperty]
        public int VehicleOrderId { get { return key.VehicleOrderId; } set { if (key == null) key = new VehicleOrderRequestsKey(); key.VehicleOrderId = value; } }
        
        public int RequestId { get { return key.RequestId; } set { if (key == null) key = new VehicleOrderRequestsKey(); key.RequestId = value; } }

    }






}
