using System;
using Kdn.Ext;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NHibernate;
using NHibernate.Hql;

namespace Transport.OtherModels.tdbf
{
    public class Schedule
    {
        [IdProperty]
        public int scheduleId { get; set; }
        public string scheduleName { get; set; }
    }



}
