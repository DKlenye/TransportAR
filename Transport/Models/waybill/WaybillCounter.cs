using System;
using Castle.ActiveRecord;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using NHibernate.Criterion;

namespace Transport.Models {


   [Serializable]
   public class WaybillCounterKey
   {
      [KeyProperty]
      public int WaybillId { get; set; }
      [KeyProperty]
      public int CounterId { get; set; }


      public override int GetHashCode()
      {
         return WaybillId ^ CounterId;
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
         if (WaybillId != key.WaybillId || CounterId != key.CounterId)
         {
            return false;
         }
         return true;
      }
   }


   [Model, ActiveRecord]
   public class WaybillCounter:ActiveRecordBase<WaybillCounter> {

      [CompositeKey,JsonIgnore]
      public WaybillCounterKey key { get; set; }

      public int WaybillId
      {
         get
         {
            return key.WaybillId;
         }
         set
         {
            if (key == null) key = new WaybillCounterKey();
            key.WaybillId = value;
         }
      }

      [IdProperty]
      public int CounterId
      {
         get
         {
            return key.CounterId;
         }
         set
         {
            if (key == null) key = new WaybillCounterKey();
            key.CounterId = value;
         }
      }

      [Property("DepartureCount")]
      public decimal? Departure { get; set; }
      [Property("ReturnCount")]
      public decimal? Return { get; set; }
      [Property]
      public bool isBroken { get; set; }


      public static WaybillCounter[] findByWaybillId(int WaybillId){

         return WaybillCounter.FindAll(Expression.Where<WaybillCounter>(x => x.key.WaybillId == WaybillId));

      }

   }



}
