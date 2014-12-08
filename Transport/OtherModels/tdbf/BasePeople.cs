using Kdn.Ext.Attributes;


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
