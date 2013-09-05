using System;
using Kdn.Ext;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NHibernate;
using NHibernate.Hql;

namespace Transport.OtherModels.tdbf
{
    public class Customer
    {
        [IdProperty]
        public int customerId { get; set; }
        public string customerName { get; set; }
        public string inputsDebit { get; set; }

        public string excessDebit { get; set; }
        public string excessCredit { get; set; }

        public int ownerId { get; set; }
        public int? hide { get; set; }

    }



}
