using System;
using System.Collections.Generic;
using Kdn.Ext;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NHibernate;
using NHibernate.Criterion;

namespace Transport.OtherModels.dbf {
   public class SHIN {
      public int GAR_N { get; set; }         //Гар № авто
      public string GOS_N { get; set; }      //Гос № авто
      public string MODELAV { get; set; }

      public string ZAWNOM { get; set; }     //заводской номер
      public string OBOZN { get; set; }      //размерность
      public string MODEL { get; set; }      //модель
      public string GOST { get; set; }       //гост
      public int NORMSL { get; set; }        //?
      public int NORMPROB { get; set; }      //норма на пробег
      public int STOIM { get; set; }         //стоимость
      public string IZGOT { get; set; }      //изготовитель
      public string NAIMPR { get; set; }     //
      public int KT { get; set; }            //?
   }
}
