using System;
using Kdn.Ext;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NHibernate;
using NHibernate.Hql;

namespace Transport.OtherModels.tdbf
{
    public class WaybillType
    {
        [IdProperty]
        public int waybillTypeId { get; set; }
        public string waybillTypeName { get; set; }
    }



}
