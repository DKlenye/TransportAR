using System;


namespace Transport.OtherModels.tdbf {
   public class TheWeather {

      public virtual DateTime targetDate { get; set; }
      public virtual decimal temperature { get; set; }
      public virtual int ownerId { get; set; }


      public override bool Equals(object obj) {
         var o = obj as TheWeather;
         return o.targetDate == targetDate && o.ownerId == ownerId;
      }

      public override int GetHashCode() {
         return targetDate.GetHashCode() ^ ownerId;
      }
   }
}
