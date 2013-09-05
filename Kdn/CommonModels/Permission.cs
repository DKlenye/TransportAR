using System;
using System.Collections.Generic;
using System.Collections;
using System.Text;
using Kdn.Ext.Attributes;
using Castle.ActiveRecord;

namespace Kdn.CommonModels
{
    [Serializable]
    public class PermissionKey
    {
        [KeyProperty]
        public int PermissionObjectId { get; set; }
        [KeyProperty]
        public int UserGroupId { get; set; }

        public override int GetHashCode()
        {
            return PermissionObjectId ^ UserGroupId;
        }

        public override bool Equals(object obj)
        {
            if (this == obj)
            {
                return true;
            }
            PermissionKey key = obj as PermissionKey;
            if (key == null)
            {
                return false;
            }
            return (PermissionObjectId == key.PermissionObjectId && UserGroupId == key.UserGroupId);
        }

    }


    [Model,ActiveRecord("Permissions")]
    public class Permission:ActiveRecordBase<Permission>
    {
        [CompositeKey]
        public PermissionKey key { get; set; }

        [BelongsTo("PermissionObjectId")]
        public PermissionObject Object { get; set; }
        [BelongsTo("UserGroupId"), ]
        public UserGroup group { get; set; }
        [Property]
        public bool isAllow { get; set; }

        public override bool Equals(object obj)
        {
            var o = obj as Permission;
            if (o == null) return false;
            return (o.group.UserGroupId == group.UserGroupId && o.Object.PermissionObjectId == Object.PermissionObjectId);
        }
        public override int GetHashCode()
        {
            return Object.GetHashCode() ^ group.GetHashCode();
        }
    }
}
