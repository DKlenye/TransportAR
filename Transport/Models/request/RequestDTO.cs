using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using System.Text;
using Kdn.Ext.Attributes;
using NHibernate.Criterion;
using Newtonsoft.Json;

namespace Transport.Models
{


   public class RequestDTO{

      public int RequestId { get; set; }
      public DateTime RequestDate { get; set; }       //дата
      public RequestStatus Status { get; set; }       //статус
      public string UserFio { get; set; }
      public string ApproverFio { get; set; }

      public DateTime? PublishDate { get; set; }
      public DateTime? ApproveDate { get; set; }

      public string RequestType { get; set; }
      public string CustomerName { get; set; }
      

   }


}
