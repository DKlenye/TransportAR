using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using System.Text;
using Kdn.Ext.Attributes;

namespace Transport.Models {
   [Model, ActiveRecord]
   public class RefuellingPlace : ActiveRecordBase<RefuellingPlace>,Interfaces.IOwnered {
      [IdProperty, PrimaryKey]
      public int RefuellingPlaceId { get; set; }

      [Property]
      public string RefuellingPlaceName { get; set; }

      [Property]
      //признак того, что данные не вводятся вручную
      public bool isAutomatic { get; set; }

      #region Owner
      [Property, AllowBlank]
      public int OwnerId { get; set; }
      public void setOwner(int OwnerId) {
         this.OwnerId = OwnerId;
      }
      #endregion

      [Property]
      public int? ReplicationId { get; set; }
      [Property]
      public ReplicationSource? ReplicationSource { get; set; }
      
   }
}
