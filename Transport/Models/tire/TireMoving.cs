using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using System.Text;
using Kdn.Ext.Attributes;
using NHibernate.Criterion;


namespace Transport.Models
{

   [Model, ActiveRecord]
   public class TireMoving : ActiveRecordBase<TireMoving>
   {
      [IdProperty, PrimaryKey]
      public int RecId { get; set; }

      [BelongsTo("VehicleId")]
      public BaseVehicle Vehicle { get; set; }

      [Property]
      public DateTime MovingDate { get; set; }
      [Property]
      public decimal? CounterValue { get; set; }

      [Property]
      public int RemoveTireId { get; set; }
      [Property]
      public int SetupTireId { get; set; }
            
   }
}
