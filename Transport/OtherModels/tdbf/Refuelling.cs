using System;
using Kdn.Ext;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NHibernate;
using NHibernate.Hql;

namespace Transport.OtherModels.tdbf
{
    public class Refuelling
    {
        public int refuellingId { get; set; }
        public string refuellingName { get; set; }
    }



}
