using System;
using Castle.ActiveRecord;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using NHibernate.Criterion;

namespace Transport.Models {


   [Serializable]
   public class WaybillDriverKey
   {
      
      [KeyProperty]
      public int DriverId { get; set; }
      [KeyProperty]
      public int WaybillId { get; set; }


      public override int GetHashCode()
      {
         return WaybillId ^ DriverId;
      }

      public override bool Equals(object obj)
      {
         if (this == obj)
         {
            return true;
         }
         WaybillCounterKey key = obj as WaybillCounterKey;
         if (key == null)
         {
            return false;
         }
         if (WaybillId != key.WaybillId || DriverId != DriverId)
         {
            return false;
         }
         return true;
      }
   }


   [Model,ActiveRecord]
   public class WaybillDriver : ActiveRecordBase<WaybillDriver>
   {
      [CompositeKey,JsonIgnore]
      public WaybillDriverKey key { get; set; }

      private Driver _Driver;

      public int WaybillId {
         get { return key.WaybillId; }
         set { if (key == null) key = new WaybillDriverKey(); key.WaybillId = value; }
      }

      [BelongsTo("DriverId", Update = false,Insert=false)]
      public Driver Driver
      {
         get
         {
            return _Driver;
         }
         set
         {
            _Driver = value;
            if (key == null) key = new WaybillDriverKey();
            key.DriverId = value.DriverId;
         }
      }

      [AllowBlank]
      public bool? isResponsible { get { return false; } }

      [IdProperty,AllowBlank]
      public string id {
         get {
            return WaybillId.ToString() + "_" + Driver.DriverId.ToString();
         }
      }

      public static WaybillDriver[] findByWaybillId(int WaybillId)
      {
         return WaybillDriver.FindAll(Expression.Where<WaybillDriver>(x => x.key.WaybillId == WaybillId));
      }

   }

}
