using System;
using System.Collections.Generic;
using Castle.ActiveRecord;

namespace Transport.Models
{
    [ActiveRecord]
    public class DistributionListDetails : ActiveRecordBase<DistributionListDetails>
    {

        public DistributionListDetails()
        {
            Drivers = new List<Driver>();
            Customers = new List<DistributionCustomers>();
        }

        [PrimaryKey]
        public int ListDetailId { get; set; }

        [Property]
        public int ListId { get; set; }

        [BelongsTo("VehicleId")]
        public BaseVehicle Car { get; set; }

        [Property]
        public string DepartureTime { get; set; }

        [Property]
        public DateTime ReturnDate { get; set; }

        //Путевой лист выданный на основании разнарядки
        [Property]
        public int? WaybillId { get; set; }

        [Property]
        public int ScheduleId { get; set; }

        [Property]
        public Int16 Shift { get; set; }

        [Property]
        public string Description { get; set; }

        [Property]
        public string DestRoutePoint { get; set; }

        [HasMany(Table = "DistributionCustomers", ColumnKey = "ListDetailId", Inverse = true, Fetch = FetchEnum.SubSelect, OrderBy = "DepartureTime", Cascade = ManyRelationCascadeEnum.AllDeleteOrphan)]
        public ICollection<DistributionCustomers> Customers { get; set; }

        [HasAndBelongsToMany(typeof(Driver),
        Table = "DistributionDrivers", ColumnKey = "ListDetailId", Fetch =FetchEnum.SubSelect, ColumnRef = "DriverId", Cascade = ManyRelationCascadeEnum.AllDeleteOrphan)]
        public ICollection<Driver> Drivers { get; set; }

        [Property]
        public bool IsDispatcherCheck { get; set; }

    }






    public class DistributionDrivers
    {

    }
}
