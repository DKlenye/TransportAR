using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using System.Text;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;

namespace Transport.Models {

   //Группы по бухгалтерии
   [Model, ActiveRecord]
   public class AccGroup : ActiveRecordBase<AccGroup> {
      [IdProperty, PrimaryKey]
      public int AccGroupId { get; set; }
      [Property]
      public string AccGroupName { get; set; }

   }
}
