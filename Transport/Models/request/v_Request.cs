using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using System.Text;
using Kdn.Ext.Attributes;
using NHibernate.Criterion;
using Newtonsoft.Json;

namespace Transport.Models
{

    [ActiveRecord,Model]
    public class v_Request : ActiveRecordBase<v_Request>
    {
        [IdProperty,PrimaryKey]
      public int RequestId { get; set; }
        [Property]
      public DateTime RequestDate { get; set; }       //дата
        [Property]
      public RequestStatus Status { get; set; }       //статус
        [Property]
      public string UserFio { get; set; }
        [Property]
      public string ApproverFio { get; set; }
        [Property]
        public string Approver { get; set; }

        [Property]
        public string CustomerId { get; set; }
        [Property]
        public string CustomerName { get; set; }

        [Property]
        public bool isLinked { get; set; }


        

        [Property]
      public DateTime? PublishDate { get; set; }
        [Property]
      public DateTime? ApproveDate { get; set; }
        [Property]
      public string RequestType { get; set; }
      
   }


}
