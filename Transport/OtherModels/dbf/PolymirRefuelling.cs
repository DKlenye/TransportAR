using System;
using System.Collections.Generic;
using Kdn.Ext;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NHibernate;
using NHibernate.Criterion;

namespace Transport.OtherModels.dbf {
   public class PolymirRefuelling {

      public string SHP { get; set; }     //??ХХ
      public string SHG { get; set; }     //шифр топлива
      public string NAIMG { get; set; }   //наименование топлива
      public string GOSN { get; set; }    //гос
      public int GAR_N { get; set; }      //гаражный
      public string NPL { get; set; }     //номер пут.листа
      
      public int TABN { get; set; }       //табельный водителя
      public decimal KOLG { get; set; }   // количество

      public string REP { get; set; }     //YYYYMM
      public string PV { get; set; }      //??ХХ



      public override bool Equals(object obj) {
         var o = obj as PolymirRefuelling;

         if( o == null ) return false;

         return o.GAR_N == GAR_N && o.NPL == NPL;
      }


      public override int GetHashCode() {
         return GAR_N.GetHashCode() ^ NPL.GetHashCode();
      }

   }
}
