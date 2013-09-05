using System;
using System.Web;
using System.Reflection;
using System.Collections;
using System.Collections.Generic;
using Ext.Direct;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Castle.ActiveRecord;
using Castle.ActiveRecord.Queries;
using Kdn.CommonModels;
using NHibernate;
using NHibernate.Hql;
using NHibernate.Criterion.Lambda;
using NHibernate.Criterion;
using Kdn.Direct;
using Transport.Models;
using System.Data.SqlClient;
using System.Data;
using System.Data.OleDb;
using System.Security.Principal;

namespace Transport.Direct
{
    public partial class Direct : Kdn.Direct.Direct
    {

        [DirectMethod]
        [ParseAsJson]
        public string getDate(JObject o)
        {
            return JsonConvert.SerializeObject(DateTime.Now);
        }


    }
}
