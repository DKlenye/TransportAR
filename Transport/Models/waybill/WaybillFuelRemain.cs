using System;
using Castle.ActiveRecord;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using NHibernate.Criterion;

namespace Transport.Models
{

   [Serializable]
   public class WaybillFuelRemainKey
   {
      [KeyProperty]
      public int WaybillId { get; set; }
      [KeyProperty]
      public int FuelId { get; set; }


      public override int GetHashCode()
      {
         return WaybillId ^ FuelId;
      }

      public override bool Equals(object obj)
      {
         if (this == obj)
         {
            return true;
         }
         WaybillFuelRemainKey key = obj as WaybillFuelRemainKey;
         if (key == null)
         {
            return false;
         }
         if (WaybillId != key.WaybillId || FuelId != key.FuelId)
         {
            return false;
         }
         return true;
      }
   }


   [Model,ActiveRecord]
   public class WaybillFuelRemain : ActiveRecordBase<WaybillFuelRemain> {

      [CompositeKey, JsonIgnore]
      public WaybillFuelRemainKey key { get; set; }

      public int WaybillId { get { return key.WaybillId; } set { if (key == null) key = new WaybillFuelRemainKey(); key.WaybillId = value; } }
      [IdProperty]
      public int FuelId { get { return key.FuelId; } set { if (key == null) key = new WaybillFuelRemainKey(); key.FuelId = value; } }

      [Property]
      public decimal? DepartureRemain { get; set; }
      [Property]
      public decimal? ReturnRemain { get; set; }

      public static WaybillFuelRemain[] findByWaybillId(int WaybillId)
      {
         return WaybillFuelRemain.FindAll(Expression.Where<WaybillFuelRemain>(x => x.key.WaybillId == WaybillId));
      }

   }
}
