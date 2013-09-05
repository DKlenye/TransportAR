using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using System.Text;
using Kdn.Ext.Attributes;
using Kdn.Attributes;
using Newtonsoft.Json;
using NHibernate.Criterion;

namespace Transport.Models {


   [Serializable]
   public class VehicleIncreaseKey {
      [KeyProperty]
      public int VehicleId { get; set; }
      [KeyProperty]
      public int IncreaseId { get; set; }

      public override int GetHashCode() {
         return VehicleId ^ IncreaseId;
      }

      public override bool Equals(object obj) {
         if( this == obj ) {
            return true;
         }
         VehicleIncreaseKey key = obj as VehicleIncreaseKey;
         if( key == null ) {
            return false;
         }
         if( VehicleId != key.VehicleId || IncreaseId != key.IncreaseId ) {
            return false;
         }
         return true;
      }
   }


      


   [ActiveRecord,Model]
   public class VehicleIncrease : ActiveRecordBase<VehicleIncrease>{

      [CompositeKey,JsonIgnore]
      public VehicleIncreaseKey key { get; set; }
      
      private BaseVehicle _Car;
      
      [BelongsTo("VehicleId", Insert = false, Update = false)]
      public BaseVehicle Car {
         get { return _Car; }
         set {
            if( key == null ) key = new VehicleIncreaseKey();
            key.VehicleId = value.VehicleId;
            _Car = value;
         }
      }

      public int IncreaseId {
         get { return key.IncreaseId; }
         set { if( key == null ) key = new VehicleIncreaseKey(); key.IncreaseId = value; }
      }

      [Property]
      public short Prcn { get; set; }

      [IdProperty,AllowBlank]
      public string id {
         get {
            return Car.VehicleId.ToString() + "_" + IncreaseId.ToString();
         }
      }

   }

}
