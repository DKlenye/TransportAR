using System;
using Kdn.Ext;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;


namespace Transport.OtherModels.farm
{

    public class Department
    {
        public const string FieldsMapping = @"[
            'DepartmentId',
            'DepartmentName'
        ]";

        [IdProperty]
        public virtual int DepartmentId { get; set; }
        public virtual string DepartmentName { get; set; }

        public virtual TransportOwner Owner { get; set; }
    }


}
