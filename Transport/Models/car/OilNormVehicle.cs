using System;
using Castle.ActiveRecord;
using Kdn.Ext.Attributes;
using NHibernate.Criterion;

namespace Transport.Models
{

    [ActiveRecord, Model]
    public class OilNormVehicle : ActiveRecordBase<OilNormVehicle>, Interfaces.IOwnered
    {

        [PrimaryKey, IdProperty]
        public int OilNormVehicleId { get; set; }

        [Property]
        public int OilGroupId { get; set; }

        [BelongsTo("VehicleId")]
        public BaseVehicle Car { get; set; }

        [Property]
        public decimal Norm { get; set; }


        #region Owner
        public void setOwner(int OwnerId) { }
        public void readWithOwner(DetachedCriteria c, int owner)
        {
            c.CreateAlias("Car", "Car").Add(Expression.Eq("Car.OwnerId", owner));
        }
        #endregion
    }

}
