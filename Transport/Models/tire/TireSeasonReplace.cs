using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models
{
    [ActiveRecord,Model]
    public class TireSeasonReplace:ActiveRecordBase<TireSeasonReplace>
    {
        [IdProperty,PrimaryKey]
        public int TireSeasonReplaceId { get; set; }
        [BelongsTo("VehicleId")]
        public BaseVehicle Vehicle { get; set; }
        [Property]
        public DateTime RemoveDate { get; set; }
        [Property]
        public DateTime? InstallDate { get; set; }

        [AllowBlank, HasAndBelongsToMany(Table = "TireSeasonReplaceTires", ColumnRef  = "TireId", ColumnKey = "TireSeasonReplaceId", Fetch = FetchEnum.Join)]
        public ICollection<Tire> Tires { get; set; }

    }
}
