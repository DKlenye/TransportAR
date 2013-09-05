using System;
using System.Collections.Generic;
using Kdn.Ext;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NHibernate;
using NHibernate.Criterion;

namespace Transport.OtherModels.dbf {
   public class BAT {
      
      public int GAR_N { get; set; }         //Гар № авто
      public string GOS_N { get; set; }      //Гос № авто

      public string TIP_B { get; set; }      //Тип батареи
      
      public string ZAWOD { get; set; }      //изготовитель
      public DateTime DATAIZ { get; set; }   //дата изготовления
      public string GAR_B { get; set; }      //Гар № АКБ
      
      public string NAIMPR { get; set; }     
      public string CHET { get; set; }       // ТТН ?
      public int STOIM { get; set; }         //Стоимость      
      public short GARAN_M { get; set; }       //Гарантия месяцев
      public int NORMAPR { get; set; }       //норма на пробег      
      
      public int NARABOT { get; set; }       // ?
      public int PR { get; set; }            //?
      public int NARAB_M { get; set; }       // наработка месяцев ?
      public int OST_ST { get; set; }        //остаточная стоимость
      public DateTime DATA_CH { get; set; }  //дата ?


   }
}
