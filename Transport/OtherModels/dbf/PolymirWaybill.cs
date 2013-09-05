using System;
using System.Collections.Generic;
using Kdn.Ext;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NHibernate;
using NHibernate.Criterion;

namespace Transport.OtherModels.dbf {

   public class PolymirWaybill{

      [AttributeUsage(AttributeTargets.Property,AllowMultiple=false)]
      public class WorkAttribute:Attribute{
         public WorkAttribute(string Norm) {
            this.Norm = Norm;
         }
         public string Norm { get; set; }      
      }    

	  public string FR { get; set; }      //бланка путевого
      public string NPL { get; set; }     //номер путевого листа
      public string SERIA { get; set; }   //серия
      
	  public int GAR_N { get; set; }      //гар № авто
      public int GAR_NP { get; set; }     //гар № прицепа
	  
	  public decimal RGN { get; set; }    //расход по норме
      public decimal RGF { get; set; }    //расход по факту
	  
	  
	  public decimal CHAS { get; set; }   //?? кол-во часов (А ЕСЛИ ЭТО НЕ МАШИНОЧАСЫ ТО ЧТО!!) ТО время работы
	       
      public int PROB { get; set; }       //пробег
      public int PROBGOR { get; set; }    //пробег по городу
      public int PROBZG { get; set; }     //пробег за городом
      public int PROBMLG { get; set; }    //пробег по млн. городу
	  
	  public DateTime? D_VY { get; set; }    //Дата выезда
	  public decimal VR_VY { get; set; }     //время выезда
      public DateTime? D_VOZ { get; set; }   //Дата возвр
	  public decimal VR_VOZ { get; set; }    //время возвращения
	  
	  public string REP { get; set; }     //отчётный период YYYYMM
	  
	  public int PAS { get; set; }           //к-во пассажиров
      public int PKM { get; set; }           //пассажиро км
	  
	  public string REGIM { get; set; }      //1 обычный, 2 коммандировка
 
      public int ZIMALETO { get; set; }       //1 лето 2 зима
      
      public DateTime? D_RAZ { get; set; }   //дата разгрузки 
	  
	  #region Водители
	  
	  public int TABN { get; set; }       //водитель1
      public int TABN2 { get; set; }      //водитель2
	  
	  #endregion
	  
	  #region Остатки
	  public decimal OST_VY { get; set; }    //остаток выезд
	  public decimal OST_VOZ { get; set; }   //остаток возвращение
	  
      public decimal OST_VYB { get; set; }   // остатки по отопителям бенз и те которые на газу а бенз для заводки
      public decimal OST_VOZB { get; set; }  // 
      
	  #endregion
      
	  #region Заправка
	  
	  public decimal POL_OAOB { get; set; }  //получение топлива для тех у кого OTOPZ
      public decimal POL_OAO { get; set; }   //на территории ОАО

      public decimal POL_AZS1 { get; set; }     //получение по чипам
      public decimal? POL_AZS2 { get; set; }    //если несколько заправок разделить между месяцами
	  
      public DateTime? D_AZS1 { get; set; }     //дата получения по чипам
      public DateTime? D_AZS2 { get; set; }     //дата 
	  
	  public decimal POL_NR { get; set; }    //получение топлива нал.рассчёт
	  
	  public string N_CHIP { get; set; }     //номер чипа   если газ то GAZ
	  
	  #endregion
	  
	  #region Показания приборов
	  
	  public int SP_VY { get; set; }         //спидометр выезд
      public int SP_VOZ { get; set; }        //спидометр возвр
	  
	  public decimal CHAS1 { get; set; }  //?? сч. маш.часов выезд
      public decimal CHAS2 { get; set; }  //?? сч маш.часов возвр
	  
	  #endregion
        
      #region Работа

	  
	  		
	  
      [Work("NOR_EZD")]
      public int EZD { get; set; }        //кол-во ездок
      [Work("NOR_FEN")]
      public int FEN { get; set; }        //работа фена час
      [Work("NOR_OTOPZ")]
      public int OTOPZ { get; set; }      //(Разница OTOP и OTOPZ) кол-во заводок газовых машин
      [Work("NOR_OTOP")]
      public int OTOP { get; set; }       //отопитель
      [Work("NOR_NASOS")]
      public int NASOS { get; set; }      //насос час
      [Work("NOR_SLIV")]
      public int SLIV { get; set; }       //слив час
      [Work("NOR_MOYKA")]
      public int MOYKA { get; set; }         //работа
      [Work("NOR_METLA")]
      public int METLA { get; set; }
      [Work("NOR_POLIV")]
      public int POLIV { get; set; }
      [Work("NOR_SNEG")]
      public int SNEG { get; set; }
      [Work("NOR_PESOK")]
      public int PESOK { get; set; }
      [Work("NOR_KOSA")]
      public int KOSA { get; set; }
      [Work("NOR_FREZA")]
      public int FREZA { get; set; }
      [Work("NOR_PGRUNT")]
      public int PGRUNT { get; set; }
      [Work("NOR_EGRUNT")]
      public int EGRUNT { get; set; }
      [Work("NORSUSL_L")]
      public int SLUSL { get; set; }          //сл. условия
      [Work("NOR_OB")]
      public int VR_OBOR { get; set; }   //время работы оборудования

      #endregion

      public string ReplicationId{get { return FR + "_" + NPL; }}
	  
	  #region UNUSED
	  
	  
	  public int PROB_EK { get; set; }    //??xx
      public string NPRIC { get; set; }   //гос № прицепа
	  public string GOSN { get; set; }    //гос № авто
	  
	  public string DAT { get; set; }     //??xx
	  public string SHP { get; set; }     //??xx   код NPL+FR
	  
	  public string PR { get; set; }      //??ХХ
      public string PP { get; set; }      //??ХХ
      public string PZ { get; set; }      //??ХХ
	  
	  public decimal VOZV { get; set; }      //xx возвращение топлива на заправку
	  
	  public string USER1 { get; set; }       //кто когда выписал  
      public DateTime? DATE1 { get; set; }
      public string TIME1 { get; set; }

      public string USER2 { get; set; }      //корректировка
      public DateTime? DATE2 { get; set; }
      public string TIME2 { get; set; }

      public decimal? RGN_OTOP { get; set; } //нормативный расход на запуски по газу и где отопитель

      public string USER3 { get; set; }      
      public DateTime? DATE3 { get; set; }
      public string TIME3 { get; set; }
	  	  
      public string NAIMM { get; set; }      //марка транспорта
	  
	  #endregion
	  
           
   }

}
