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
   public class VehicleDriverKey {
      [KeyProperty]
      public int VehicleId { get; set; }
      [KeyProperty]
      public int DriverId { get; set; }
      
      public override int GetHashCode() {
         return VehicleId ^ DriverId;
      }

      public override bool Equals(object obj) {
         if( this == obj ) {
            return true;
         }
         VehicleDriverKey key = obj as VehicleDriverKey;
         if( key == null ) {
            return false;
         }
         if( VehicleId != key.VehicleId || DriverId != key.DriverId ) {
            return false;
         }
         return true;
      }
   }



   [ActiveRecord,Model]
   public class VehicleDriver : ActiveRecordBase<VehicleDriver> {

      [CompositeKey, JsonIgnore]
      public VehicleDriverKey key { get; set; }

      private Driver _Driver;
      private BaseVehicle _Car;
      
      
      [BelongsTo("VehicleId",Insert=false,Update=false)]
      public BaseVehicle Car {
         get { return _Car; }
         set {
            if( key == null ) key = new VehicleDriverKey();
            key.VehicleId = value.VehicleId;
            _Car = value;
         }
      }

      [BelongsTo("DriverId", Insert = false, Update = false)]
      public Driver Driver {
         get { return _Driver; }
         set {
            if( key == null ) key = new VehicleDriverKey();
            key.DriverId = value.DriverId;
            _Driver = value;
         }
      }

      [AllowBlank]
      public bool? isResponsible { get { return false; } }
      [IdProperty,AllowBlank]
      public string id {
         get {
            return Car.VehicleId.ToString() + "_" + Driver.DriverId.ToString();
         }
      }
            

   }

}
