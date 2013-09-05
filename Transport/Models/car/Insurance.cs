using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using System.Text;
using Kdn.Ext.Attributes;
using Kdn.Attributes;
using Newtonsoft.Json;
using NHibernate.Criterion;

namespace Transport.Models {

   [ActiveRecord,Model]
   public class Insurance:ActiveRecordBase<Insurance>,Interfaces.IOwnered {
      
      [PrimaryKey,IdProperty]
      public int InsuranceId { get; set; }
      [BelongsTo("VehicleId")]
      public BaseVehicle Car { get; set; }
      [Property(ColumnType="Date")]
      public DateTime DateOfTerm { get; set; }
      [Property]
      public string InsuranceNumber { get; set; }
      [Property]
      public bool isFree { get; set; }

      #region Owner
      public void setOwner(int OwnerId) { }
      public void readWithOwner(DetachedCriteria c, int owner) {
         c.CreateAlias("Car", "Car").Add(Expression.Eq("Car.OwnerId", owner));
      }
      #endregion
   }

}
