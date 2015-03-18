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
            Drivers = new List<DistributionDrivers>();
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

        [HasMany(Table = "DistributionDrivers", ColumnKey = "ListDetailId", Inverse = true, Fetch = FetchEnum.SubSelect, Cascade = ManyRelationCascadeEnum.AllDeleteOrphan)]
        public ICollection<DistributionDrivers> Drivers { get; set; }

        [Property]
        public bool IsDispatcherCheck { get; set; }

        [Property]
        public DateTime? LastChange { get; set; }

        [Property]
        public int? TrailerId { get; set; }

    }


    [ActiveRecord]
    public class DistributionDrivers
    {
        [PrimaryKey]
        public int Id { get; set; }
        [Property]
        public int ListDetailId { get; set; }

        [BelongsTo("DriverId")]
        public Driver Driver { get; set; }

        [Property]
        public string Description { get; set; }
    }
    
}
