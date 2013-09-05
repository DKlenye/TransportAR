using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using System.Text;
using Kdn.Ext.Attributes;

namespace Transport.Models
{
   [Model,ActiveRecord]
   public class TransportColumn:ActiveRecordBase<TransportColumn>,Interfaces.IOwnered {

      [IdProperty,PrimaryKey]
      public int ColumnId { get; set; }
      [Property]
      public string ColumnName { get; set; }
      [AllowBlank,Property]
      public string FullName { get; set; }

      #region Owner
      [Property, AllowBlank]
      public int OwnerId { get; set; }
      public void setOwner(int OwnerId) {
         this.OwnerId = OwnerId;
      }
      #endregion


   }

   #region NHibernate relation

   [ActiveRecord("TransportColumn")]
   public class relation_TransportColumn {
      [PrimaryKey]
      public int ColumnId { get; set; }
      [BelongsTo("OwnerId")]
      public TransportOwner TransportOwner { get; set; }
   }

   #endregion



}
