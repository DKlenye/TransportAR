using System;
using System.Collections.Generic;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NHibernate;
using NHibernate.Impl;
using NHibernate.Criterion;


namespace Transport.OtherModels.tdbf
{
    public class Driver
    {
        [IdProperty]
        public int DriverId { get; set; }
        public int OwnerId { get; set; }
        public BasePeople People { get; set; }
    }
}
