using System;
using Kdn.Ext;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
namespace Transport.OtherModels.farm
{

        
        public class UserGroup
        {
            public const string FieldsMapping = @"[
                'UserGroupId',
                'UserGroupName'
            ]";

            [IdProperty]
            public virtual int UserGroupId { get; set; }
            public virtual string UserGroupName { get; set; }
        }
}
