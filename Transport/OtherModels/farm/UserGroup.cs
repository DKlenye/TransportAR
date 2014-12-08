using Kdn.Ext.Attributes;

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
