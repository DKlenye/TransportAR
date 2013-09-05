using System;
using System.Collections.Generic;
using System.Collections;
using System.Text;
using Kdn.Ext.Attributes;
using Castle.ActiveRecord;

namespace Kdn.CommonModels
{
    [Model,ActiveRecord("PermissionObjects")]
    public class PermissionObject
    {
        [IdProperty,PrimaryKey]
        public int PermissionObjectId { get; set; }
        [Property]
        public int PermissionObjectName { get; set; }
    }
}
