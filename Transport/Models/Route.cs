using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models
{
    [Model,ActiveRecord]
    public class Route : ActiveRecordBase<Route>
    {
       [PrimaryKey,IdProperty]
       public int RouteId { get; set; }
       [BelongsTo("SourcePointId",UniqueKey="Route_idx")]
       public RoutePoint SourcePoint { get; set; }
       [BelongsTo("DestPointId",UniqueKey = "Route_idx")]
       public RoutePoint DestinationPoint { get; set; }
       [Property]
       public int Distance { get; set; }         
    }
}
