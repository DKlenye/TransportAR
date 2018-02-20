using System;
using System.Collections.Generic;
using Castle.Core;
using Ext.Direct;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Kdn.Direct;
using NHibernate.Criterion;
using Transport.Models;

namespace Transport.Direct
{
    [Model]
    public class RequestWaybillDto
    {
        [IdProperty]
        public int WaybillId { get; set; }
        public DateTime DepartureDate { get; set; }
        public BaseVehicle Vehicle { get; set; }
    }



    public partial class Direct
    {

        [DirectMethod]
        public string GetRequestType(int id)
        {
            return Request.Find(id).type;
        }


        [DirectMethod]
        [ParseAsJson]
        public DataSerializer RequestWaybillLoad(JObject o)
        {
            var id = o["id"].Value<int>();

            var request = Request.Find(id);
            var customers =
                DistributionCustomers.FindAll(
                    Restrictions.Where<DistributionCustomers>(x => x.RequestId == request.RequestId));

            var waybills = new List<int>();
            var rezult = new List<RequestWaybillDto>();

            customers.ForEach(c=>
            {
                var detail = DistributionListDetails.Find(c.ListDetailId);
                waybills.AddRange(detail.Waybills);
            });

            waybills.ForEach(x =>
            {
                if (WaybillTask.FindFirst(
                    Restrictions.Where<WaybillTask>(wt => wt.WaybillId == x && wt.Customer == request.Customer)) != null)
                {
                    var waybill = Waybill.Find(x);
                    rezult.Add(new RequestWaybillDto()
                    {
                        WaybillId = waybill.WaybillId,
                        DepartureDate = waybill.DepartureDate,
                        Vehicle = waybill.Car
                    });
                }
            });

            return new DataSerializer(rezult);
        }


        
        [DirectMethod]
        [ParseAsJson]
        public DataSerializer RequestLoad(JObject o)
        {
            var id = o["id"].Value<int>();
            var request = Request.Find(id);

            var attachments = RequestAttachments.FindByRequest(request.RequestId);
            request.Attachments = attachments;

            return new DataSerializer(new List<object>() {request});
        }


        [DirectMethod]
        [ParseAsJson]
        public DataSerializer RefreshRequests(JObject o)
        {
            var list = new List<object>();
            var requests = o["requests"].Value<JArray>();

            foreach (var r in requests)
            {
                var obj = JsonConvert.DeserializeObject<v_Request>(r.ToString());
                obj.Refresh();
                list.Add(obj);
            }

            return new DataSerializer(list);
        }


        [DirectMethod]
        [ParseAsJson]
        public DataSerializer ConfirmRequests(JObject o)
        {
            var a = getModels(o);
            var isAccept = o["isAccept"].Value<bool>();
            var message = o["message"].Value<string>();

            var list = new List<object>();

            foreach (var _a in a)
            {
                var str = _a.ToString();
                var id = _a["RequestId"].Value<int>();
                var request = Request.Find(id);

                var status = isAccept ? RequestStatus.Confirm : RequestStatus.Return;

                request.Status = status;
                request.Events.Add(new RequestEvent()
                {
                    EventDate = DateTime.Now,
                    Message = message,
                    Status = status,
                    Request = request
                });

                request.SaveAndFlush();

                var dto = v_Request.Find(id);
                list.Add(dto);
            }

            return new DataSerializer(list);
        }


    }

}
