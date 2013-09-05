using System;
using System.Collections.Generic;
using Kdn.Ext;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NHibernate;
using NHibernate.Criterion;


namespace Transport.OtherModels.tdbf
{
    public class BasePeople
    {
            [IdProperty]
            public virtual int EmployeeId { get; set; }

            public virtual string FirstName { get; set; }
            public virtual string LastName { get; set; }
            public string MiddleName { get; set; }
    
            public  string EmployeeNumber { get; set; }
            public  string Department { get; set; }
            public  short DSC { get; set; }

    }
}
