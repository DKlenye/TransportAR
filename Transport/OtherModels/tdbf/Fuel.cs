using System;
using Kdn.Ext;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NHibernate;
using NHibernate.Hql;

namespace Transport.OtherModels.tdbf
{
    public class Fuel
    {
        [IdProperty]
        public int fuelId { get; set; }
        public string fuelName { get; set; }
        public decimal k_weight { get; set; }
    }



}
