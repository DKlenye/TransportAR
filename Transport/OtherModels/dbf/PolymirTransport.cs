using System;
using System.Collections.Generic;
using Kdn.Ext;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NHibernate;
using NHibernate.Criterion;

namespace Transport.OtherModels.dbf {
   public class PolymirTransport {

      [AttributeUsage(AttributeTargets.Property,AllowMultiple=false,Inherited=true)]
      public class isIncreaseAttribute : Attribute { }

      [AttributeUsage(AttributeTargets.Property,AllowMultiple=false,Inherited=true)]
      public class isWorkAttribute : Attribute { }


      [IdProperty]
      public int GAR_N { get; set; }         //Гар
      
      public string SHC { get; set; }        //цех
      public string SHU { get; set; }        //участок бухг
            

      public string INVN { get; set; }       //инв
      public string GOSN { get; set; }       //гос

      public string NAIMM { get; set; }      //марка
      public string NAIMM1 { get; set; }     //марка1

      public int TABN { get; set; }          //водила

      [isWork]
      public decimal NOR_OB { get; set; }    //норм на работу оборуд

      public decimal NOR_ML_L { get; set; }  //норма миллион линейная
      public decimal NOR_ML_Z { get; set; }  //норма миллион линейная

      [isWork]
      public decimal NOR_OTOP { get; set; }  // ДЛЯ ВСЕХ И У КОТОРЫХ ЕСТЬ ОТОПИТЕЛЬ НА ТОМ ЖЕ ТОПЛИВЕ
      [isWork]
      public decimal NOR_OTOPZ { get; set; } //  84-88 АВТО НА ГАЗУ И НА ЗАПУСК БЕНЗИН  (кол-во)     (отопитель на бензине  57 гар)
      
      [isWork]
      public decimal NOR_TKM_L { get; set; }
      public decimal NOR_TKM_Z { get; set; } //X

      [isIncrease]
      public decimal ZIMA { get; set; }
      [isIncrease]
      public decimal TRASS { get; set; }
      [isIncrease]
      public decimal MLN { get; set; }
      [isIncrease]
      public decimal KOND { get; set; }

      [isWork]
      public decimal NOR_GOR_L { get; set; }
      public decimal NOR_GOR_Z { get; set; } //X

      public decimal NOR_ZG_L { get; set; }  //норма загородом
      public decimal NOR_ZG_Z { get; set; }  // тоже зимняя

      [isWork]
      public decimal NOR_MC_L { get; set; }  //норма на машиночас
      public decimal NOR_MC_Z { get; set; }  //X

      [isWork]
      public decimal NORSUSL_L { get; set; } // СЛОЖНЫЕ УСЛОВИЯ ТРУДА 2,3,61
      public decimal NORSUSL_Z { get; set; } //X

      [isWork]
      public decimal NOR_KOSA { get; set; }
      [isWork]
      public decimal NOR_FREZA { get; set; }

      [isWork]
      public decimal NOR_PGRUNT { get; set; } //НЕ ИСП  140гар //X
      [isWork]
      public decimal NOR_EGRUNT { get; set; }
      [isWork]
      public decimal NOR_MOYKA { get; set; }
      [isWork]
      public decimal NOR_METLA { get; set; }
      [isWork]
      public decimal NOR_POLIV { get; set; }
      [isWork]
      public decimal NOR_SNEG { get; set; }
      [isWork]
      public decimal NOR_PESOK { get; set; }
      [isWork]
      public decimal NOR_NASOS { get; set; }
      [isWork]
      public decimal NOR_SLIV { get; set; }

      [isWork]
      public decimal NOR_K { get; set; }     // движение с контейнером 500
      [isWork]
      public decimal NOR_NETK { get; set; }  // движение без контейнера
      

      [isWork]
      public decimal NOR_EZD { get; set; }   // норма на ездку
      [isWork]
      public decimal NOR_KAR { get; set; }   //  РАБОТА В КАРЬЕРЕ
      [isWork]
      public decimal NOR_FEN { get; set; }   //фен
      public decimal NOR_EK { get; set; }    // НЕ ИСП //X

      public decimal NOR_SPIRT { get; set; }  //X
      public decimal NOR_SPIRTS { get; set; } //X
      
      public string N_L_KART { get; set; }   //лиценз карт

      public string SHG { get; set; }
      public string TIP_SHG { get; set; }
      public decimal PLOT_SHG { get; set; }  //X

      public string TIP { get; set; }        //типы группы тр-та

      public string SHG_OTOP { get; set; }   // топливо отопителя
      
      public decimal GR_POD { get; set; }    // грузоподъёмность 

      public decimal NOR_MOTOR { get; set; } 
      public decimal NOR_TRANS { get; set; }
      public decimal NOR_SPEC { get; set; }
      public decimal NOR_SMAZ { get; set; }
      public decimal NOR_PR { get; set; }    // НОРМА НА МАСЛА ПРОЧИЕ

      public string DV { get; set; }         //Дата ввода 
      public string DS { get; set; }         //дата списания ?? у прицепов проставлена 1899

   }
}
