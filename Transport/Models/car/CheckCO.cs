﻿using System;
using Castle.ActiveRecord;
using Kdn.Ext.Attributes;
using NHibernate.Criterion;

namespace Transport.Models {

   [ActiveRecord,Model]
   public class CheckCO : ActiveRecordBase<CheckCO>,Interfaces.IOwnered {      
      [PrimaryKey,IdProperty]
      public int CheckCOId { get; set; }
      [BelongsTo("VehicleId",UniqueKey="checkCO_idx")]
      public BaseVehicle Car { get; set; }
      [Property(ColumnType = "Date", UniqueKey = "checkCO_idx")]
      public DateTime DateOfTerm { get; set; }

      #region Owner
      public void setOwner(int OwnerId) { }
      public void readWithOwner(DetachedCriteria c, int owner) {
         c.CreateAlias("Car", "Car").Add(Expression.Eq("Car.OwnerId", owner));
      }
      #endregion
   }

}
