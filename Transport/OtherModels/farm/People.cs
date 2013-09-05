using System;
using System.Collections.Generic;
using Kdn.Ext;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;


namespace Transport.OtherModels.farm
{
    public class People
    {

        public const string FieldsMapping = @"[
            'PeopleId',
            'EmployeeId',
            'EmployeeNumber',
            'Department',
            'DismissDate',
            'LastName',
            'FirstName',
            'MiddleName'        
        ]";

            [IdProperty]
            public virtual int PeopleId { get; set; }

            public virtual int EmployeeId { get; set; }

            public virtual string FirstName { get; set; }
            public virtual string LastName { get; set; }
            public virtual string MiddleName { get; set; }

            public virtual string EmployeeNumber { get; set; }
            public virtual string Department { get; set; }

            public virtual string Office { get; set; }
            public virtual DateTime? IncomeDate { get; set; }
            public virtual DateTime? DismissDate { get; set; }
    }
}
