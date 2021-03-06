﻿using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models
{
    [Model,ActiveRecord]
   public class RoutePoint : ActiveRecordBase<RoutePoint>
    {
        [IdProperty,PrimaryKey]
        public int RoutePointId { get; set; }
        [Property]
        public string RoutePointName { get; set; }
    }
}
