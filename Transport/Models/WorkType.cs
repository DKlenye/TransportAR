using System.Collections.Generic;
using Castle.ActiveRecord;
using Kdn.Ext.Attributes;
using NHibernate.Criterion;

namespace Transport.Models
{
    [Model,ActiveRecord]
    public class WorkType:ActiveRecordBase<WorkType>,Interfaces.IOwnered
    {
        [IdProperty,PrimaryKey]
        public int WorkTypeId { get; set; }

        [Property]
        public string WorkTypeName { get; set; }

        [Property]
        public int WorkUnitId { get; set; }

       
        [AllowBlank, Property]
        public int OwnerId { get; set; }

        public void setOwner(int OwnerId)
        {
            this.OwnerId = OwnerId;
        }

        [AllowBlank,Property]
        public string ReplicationId { get; set; }
        [Property]
        public ReplicationSource? ReplicationSource { get; set; }

        public WorkUnit GetWorkUnit()
        {
            return WorkUnit.Find(WorkUnitId);
        }

        public static WorkType GetPolymirWork(string replicationId)
        {
           return WorkType.FindFirst(
               Expression.Where<Increase>(
                  x =>
                     x.ReplicationId == replicationId &&
                     x.ReplicationSource == Transport.ReplicationSource.dbfPolymir
               )
         );
      }

        public static Dictionary<int, WorkType> getMap()
        {
           var map = new Dictionary<int, WorkType>();
           foreach (var i in FindAll())
           {
              map.Add(i.WorkTypeId, i);
           }
           return map;
        }

    }


    [ActiveRecord("WorkType")]
    public class relation_WorkType {
       [PrimaryKey]
       public int WorkTypeId { get; set; }
       [BelongsTo("WorkUnitId")]
       public WorkUnit WorkUnit { get; set; }
       [BelongsTo("OwnerId")]
       public TransportOwner Owner { get; set; }
    }


}
