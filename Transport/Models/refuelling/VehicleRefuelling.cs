using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using System.Text;
using Kdn.Ext.Attributes;

namespace Transport.Models {
   [Model, ActiveRecord]
   public class VehicleRefuelling : ActiveRecordBase<VehicleRefuelling> {

      [IdProperty, PrimaryKey]
      public int RefuellingId { get; set; }

      [Property]
      public int FuelId { get; set; }

      [Property]
      public int RefuellingPlaceId { get; set; }
      
      [Property]
      public DateTime RefuellingDate { get; set; }

      [Property]
      public decimal Quantity { get; set; }

      [AllowBlank,Property]
      public string CardNumber { get; set; }
            
      [Property]
      public int? SheetNumber { get; set; }

      [Property]
      public int? VehicleId { get; set; } 

      #region выдача ГСМ по путёвкам

      [Property]
      public int? WaybillId { get; set; }

      [BelongsTo("DriverId")]
      public Driver Driver { get; set; }

      [Property]
      public int? AccPeriod { get; set; }
      
      #endregion

      [Property]
      public int? ReplicationId { get; set; }
      [Property]
      public ReplicationSource? ReplicationSource { get; set; }


   }

      


}
