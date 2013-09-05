using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using System.Text;
using Kdn.Ext.Attributes;
using Castle.ActiveRecord.Queries;

namespace Transport.Models
{
    [Model,ActiveRecord]
    public class WorkUnit : ActiveRecordBase<WorkUnit>
    {
        [IdProperty,PrimaryKey]
        public int WorkUnitId { get; set; }

        [Property]
        public string WorkUnitName { get; set; }
        
        //Наименование единицы измерения
        [Property]
        public string UnitName { get; set; }

        //Коэффициент при расчёте нормы
        [Property]
        public int Coefficient { get; set; }
        
        //Cчётчика работ
        [AllowBlank,Property]
        public int? CounterId { get; set; }

    
   public static Dictionary<int,WorkUnit> getMap(){
         var map = new Dictionary<int, WorkUnit>();
         foreach( var i in FindAll() ) {
            map.Add(i.WorkUnitId, i);
         }
         return map;                  
      }
}

    [ActiveRecord("WorkUnit")]
    public class relation_WorkUnit {
       [PrimaryKey]
       public int WorkUnitId { get; set; }
       [BelongsTo("CounterId")]
       public WorkCounter Counter { get; set; }
    }

}
