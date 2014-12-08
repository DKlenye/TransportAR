﻿using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models
{
    [Model,ActiveRecord]
    public class Customer:ActiveRecordBase<Customer>,Interfaces.IOwnered
    {
        [IdProperty,PrimaryKey]
        public int CustomerId { get; set; }

        [Property(Length=100)]
        public string CustomerName { get; set; }

        [Property(Length=100),AllowBlank]
        public string CustomerName1 { get; set; }
        
        [Property(Length=16)]
        public string CostCode { get; set; }

        [Property(Length = 10),AllowBlank]
        public string PolymirCostCode { get; set; } 

        [Property(Length=10),AllowBlank]
        public string SHZ { get; set; }

        [Property]
        public bool notActual { get; set; }
        
        [Property,AllowBlank]
        public bool isPolymir { get; set; }

        [AllowBlank,Property]
        public int OwnerId { get; set; }

        [Property]
        public int? PolymirId { get; set; }

        public void setOwner(int OwnerId) { this.OwnerId = OwnerId; }


        [Property]
        public int? ReplicationId { get; set; }
        [Property]
        public ReplicationSource? ReplicationSource { get; set; }


    }

   
    #region NHibernate relation

    [ActiveRecord("Customer")]
    public class relation_Customer {
       [PrimaryKey]
       public int CustomerId { get; set; }
       [BelongsTo("OwnerId")]
       public TransportOwner TransportOwner { get; set; }
    }

    #endregion

}
