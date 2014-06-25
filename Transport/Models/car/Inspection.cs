using System;
using Castle.ActiveRecord;
using Kdn.Ext.Attributes;
using NHibernate.Criterion;

namespace Transport.Models
{

    [ActiveRecord, Model]
    public class Inspection : ActiveRecordBase<Inspection>, Interfaces.IOwnered
    {

        [PrimaryKey, IdProperty]
        public int InspectionId { get; set; }
        [BelongsTo("VehicleId")]
        public BaseVehicle Car { get; set; }
        [Property(ColumnType = "Date")]
        public DateTime DateOfTerm { get; set; }
        [Property]
        public int InspectionType { get; set; }


        #region Owner
        public void setOwner(int OwnerId) { }
        public void readWithOwner(DetachedCriteria c, int owner)
        {
            c.CreateAlias("Car", "Car").Add(Expression.Eq("Car.OwnerId", owner));
        }
        #endregion
    }

}
