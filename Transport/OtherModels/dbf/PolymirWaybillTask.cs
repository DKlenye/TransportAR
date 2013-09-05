using System;
using System.Collections.Generic;
using Kdn.Ext;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NHibernate;
using NHibernate.Criterion;

namespace Transport.OtherModels.dbf {
   public class PolymirWaybillTask {

      public string NPL { get; set; }        //№ путёвки
      public string FR { get; set; }         //бланк

      public DateTime D_VY { get; set; }     //дата
      public string SHZ { get; set; }        //заказчик

 #region Пробег

      public int PROB { get; set; }          //пробег

      public int PROBGOR { get; set; }       //пробег по городу
      public int PROBGOR_GR { get; set; }    //пробег по городу с грузом
      public int PROBMLN_GR { get; set; }    //пробег по млн. с грузом
      public int KONT { get; set; }          //километры с контейнером
      
 #endregion

      public decimal CHAS { get; set; }      //отработано часов
      
      public string P_OTPR { get; set; }     //маршрут пункт отпр
      public string P_NAZN { get; set; }     //маршрут пункт возвр

      public string GRUZ { get; set; }       //наименование груза

      public decimal TN { get; set; }        //груз тонн
      public decimal TNP { get; set; }       //тонн перевезено на прицепе

      public decimal TKM { get; set; }       //выполнено ткм
      public decimal TKMGOR { get; set; }    //ткм город
      public decimal TKMMLN { get; set; }    //ткм млн.
     
      public decimal TKMP { get; set; }      //ткм на прицепе

      public int PAS { get; set; }           //кол-во пассажиров
      
      #region unused

         public int RAS { get; set; }           //Расстояние??
         public string COMM { get; set; }       //комментарии
         public string USER { get; set; }       //кто вносил коммент
         public DateTime DATE { get; set; }
         public string TIME { get; set; }
      
      #endregion

      /*
       
       1.
       
       
       
       
       */

   }
}
