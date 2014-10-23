using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using System.Text;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;

namespace Transport.Models
{

    [Serializable]
    public class _PolymirWaybillKey
    {

        [KeyProperty]
        public string FR { get; set; }      //бланка путевого
        [KeyProperty]
        public string NPL { get; set; }     //номер путевого листа
        [KeyProperty]
        public DateTime D_VY { get; set; }    //Дата выезда



        public override int GetHashCode()
        {
            return (FR + NPL + D_VY.ToString("dd.MM.yyyy")).GetHashCode();
        }

        public override bool Equals(object obj)
        {
            if (this == obj)
            {
                return true;
            }
            _PolymirWaybillKey key = obj as _PolymirWaybillKey;
            if (key == null)
            {
                return false;
            }
            if (FR != key.FR || NPL != key.NPL || D_VY != key.D_VY)
            {
                return false;
            }
            return true;
        }
    }    



   [ActiveRecord]
   public class _PolymirWaybill:ActiveRecordBase<_PolymirWaybill>{

       [CompositeKey]
       public _PolymirWaybillKey key { get; set; }

      [Property]
      public string SERIA { get; set; }   //серия

      [Property]
	  public int GAR_N { get; set; }      //гар № авто
      [Property]
       public int GAR_NP { get; set; }     //гар № прицепа
      [Property]
	  public decimal RGN { get; set; }    //расход по норме
      [Property]
      public decimal RGF { get; set; }    //расход по факту

      [Property]
	  public decimal CHAS { get; set; }   //?? кол-во часов (А ЕСЛИ ЭТО НЕ МАШИНОЧАСЫ ТО ЧТО!!) ТО время работы
      [Property]
      public int PROB { get; set; }       //пробег
      [Property]
      public int PROBGOR { get; set; }    //пробег по городу
      [Property]
      public int PROBZG { get; set; }     //пробег за городом
      [Property]
      public int PROBMLG { get; set; }    //пробег по млн. городу

     
      [Property]
	  public decimal VR_VY { get; set; }     //время выезда
      [Property]
      public DateTime? D_VOZ { get; set; }   //Дата возвр
      [Property]
	  public decimal VR_VOZ { get; set; }    //время возвращения

      [Property]
	  public string REP { get; set; }     //отчётный период YYYYMM

      [Property]
	  public int PAS { get; set; }           //к-во пассажиров
      [Property]
      public int PKM { get; set; }           //пассажиро км
      [Property]
	  public string REGIM { get; set; }      //1 обычный, 2 коммандировка
      [Property]
      public int ZIMALETO { get; set; }       //1 лето 2 зима
      [Property]
      public DateTime? D_RAZ { get; set; }   //дата разгрузки 
	  
	  #region Водители

      [Property]
	  public int TABN { get; set; }       //водитель1
      [Property]
      public int TABN2 { get; set; }      //водитель2
	  
	  #endregion
	  
	  #region Остатки
      [Property]
	  public decimal OST_VY { get; set; }    //остаток выезд
      [Property]
	  public decimal OST_VOZ { get; set; }   //остаток возвращение
	  
      public decimal OST_VYB { get; set; }   // остатки по отопителям бенз и те которые на газу а бенз для заводки
      public decimal OST_VOZB { get; set; }  // 
      
	  #endregion
      
	  #region Заправка
      [Property]
	  public decimal POL_OAOB { get; set; }  //получение топлива для тех у кого OTOPZ
      [Property]
      public decimal POL_OAO { get; set; }   //на территории ОАО
      [Property]
      public decimal POL_AZS1 { get; set; }     //получение по чипам
      [Property]
      public decimal? POL_AZS2 { get; set; }    //если несколько заправок разделить между месяцами
      [Property]
      public DateTime? D_AZS1 { get; set; }     //дата получения по чипам
      [Property]
      public DateTime? D_AZS2 { get; set; }     //дата 
      [Property]
	  public decimal POL_NR { get; set; }    //получение топлива нал.рассчёт
      [Property]
	  public string N_CHIP { get; set; }     //номер чипа   если газ то GAZ
	  
	  #endregion
	  
	  #region Показания приборов
      [Property]
	  public int SP_VY { get; set; }         //спидометр выезд
      [Property]
      public int SP_VOZ { get; set; }        //спидометр возвр
      [Property]
	  public decimal CHAS1 { get; set; }  //?? сч. маш.часов выезд
      [Property]
      public decimal CHAS2 { get; set; }  //?? сч маш.часов возвр
	  
	  #endregion
        
      #region Работа




      [Property]
      public int EZD { get; set; }        //кол-во ездок
      [Property]
      public int FEN { get; set; }        //работа фена час
      [Property]
      public int OTOPZ { get; set; }      //(Разница OTOP и OTOPZ) кол-во заводок газовых машин
      [Property]
      public int OTOP { get; set; }       //отопитель
      [Property]
      public int NASOS { get; set; }      //насос час
      [Property]
      public int SLIV { get; set; }       //слив час
      [Property]
      public int MOYKA { get; set; }         //работа
      [Property]
      public int METLA { get; set; }
      [Property]
      public int POLIV { get; set; }
      [Property]
      public int SNEG { get; set; }
      [Property]
      public int PESOK { get; set; }
      [Property]
      public int KOSA { get; set; }
      [Property]
      public int FREZA { get; set; }
      [Property]
      public int PGRUNT { get; set; }
      [Property]
      public int EGRUNT { get; set; }
      [Property]
      public int SLUSL { get; set; }          //сл. условия
      [Property]
      public int VR_OBOR { get; set; }   //время работы оборудования

      #endregion

      public string ReplicationId{get { return key.NPL + "_" + key.FR; }}
	  
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
