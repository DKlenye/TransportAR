using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using System.Text;
using Kdn.Attributes;
using Kdn.Ext.Attributes;
using Iesi.Collections.Generic;
using Newtonsoft.Json;
using NHibernate.Criterion;

namespace Transport.Models
{
   [Model,ActiveRecord]
   public class Increase : ActiveRecordBase<Increase>
   {
      [IdProperty,PrimaryKey]
      public int IncreaseId { get; set; }

      [Property]
      public string IncreaseName { get; set; }

      [Property]
      public string IncreaseShortName { get; set; }
                  
      [Property]
      //не может быть изменена в обработке путевого листа
      public bool isNormConstant { get; set; }

      //общая надбавка, доступная для всех
      public bool? isCommon { get; set; }

      [Property]
      public short Prcn { get; set; }

      [Property(ColumnType="Date")]
      public DateTime? DateOfTerm { get; set; }

      [AllowBlank,Property]
      public string ReplicationId { get; set; }
      [Property]
      public ReplicationSource? ReplicationSource { get; set; }


      public static Increase GetPolymirIncrease(string replicationId){
         return Increase.FindFirst(
               Expression.Where<Increase>(
                  x =>
                     x.ReplicationId == replicationId &&
                     x.ReplicationSource == Transport.ReplicationSource.dbfPolymir
               )
         );
      }

      public static Dictionary<int,Increase> getMap(){
         var map = new Dictionary<int, Increase>();
         foreach( var i in FindAll() ) {
            map.Add(i.IncreaseId, i);
         }
         return map;                  
      }


   }


}
