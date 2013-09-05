using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using System.Text;
using Kdn.Attributes;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NHibernate.Criterion;

namespace Transport.Models
{

   [Serializable]
   public class TemperatureKey
   {
      [KeyProperty]
      public int OwnerId { get; set; }
      [KeyProperty]
      public DateTime Date { get; set; }


      public override int GetHashCode()
      {
         return OwnerId ^ Date.GetHashCode();
      }

      public override bool Equals(object obj)
      {
         if (this == obj)
         {
            return true;
         }
         TemperatureKey key = obj as TemperatureKey;
         if (key == null)
         {
            return false;
         }
         if (OwnerId != key.OwnerId || Date != key.Date)
         {
            return false;
         }
         return true;
      }
   }

      


   [Model,ActiveRecord]
   public class Temperature : ActiveRecordBase<Temperature>,Interfaces.IOwnered {


      [CompositeKey]
      public TemperatureKey key { get; set; }

      [Property]
      public decimal Temp { get; set; }

      public string id { get { return key.OwnerId.ToString() + "_" + key.Date.ToString(); } }

      public DateTime Date {
         get
         {
            return key.Date;
         }
         set {
            if (key==null) key = new TemperatureKey();
            key.Date=value;
         }
      }

      public int OwnerId
      {
         get
         {
            return key.OwnerId;
         }
         set
         {
            if (key == null) key = new TemperatureKey();
            key.OwnerId = value;
         }
      } 

      /*
      public override int GetHashCode() {
         return Date.GetHashCode() ^ OwnerId.GetHashCode();
      }

      public override bool Equals(object obj) {
         var o = obj as Temperature;
         if( o == null ) return false;

         return o.Date == Date && o.OwnerId == OwnerId;
      }
      */





      #region Owner

      public void setOwner(int OwnerId) {
         key.OwnerId = OwnerId;
      }
      public void readWithOwner(DetachedCriteria c, int owner)
      {
         c.Add(Expression.Eq(Projections.Property<Temperature>(x=>x.key.OwnerId),owner));
      }
      
      #endregion



      public static void Filter(DetachedCriteria c, JObject filter) {

         foreach( var f in filter ) {
               
               switch(f.Key){
                  case "Date":{
                     c.Add(Expression.Between(Projections.Property<Temperature>(x=>x.key.Date), f.Value.Value<DateTime>(), f.Value.Value<DateTime>().AddDays(1).AddMinutes(-1)));
                     break;
                  }
                  case "Temp":{
                     c.Add(Expression.Eq(f.Key, f.Value.Value<decimal>()));
                     break;
                  }

               }
            }
         

      }

      public static void Sort(DetachedCriteria c, JObject sort) {

         var sortField = sort["sort"].Value<string>();

         if( sortField == "Date" ) {
            var projection = Projections.Property<Temperature>(x=>x.key.Date);
            c.AddOrder(sort["dir"].Value<string>() == "ASC" ? Order.Asc(projection) : Order.Desc(projection));
         }
         else {
            c.AddOrder(sort["dir"].Value<string>() == "ASC" ? Order.Asc(sortField) : Order.Desc(sortField));
         }

         

      
      }



   }



}
