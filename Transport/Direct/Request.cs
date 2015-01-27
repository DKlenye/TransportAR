using System;
using System.Collections.Generic;
using Ext.Direct;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Kdn.Direct;
using Transport.Models;

namespace Transport.Direct
{
    public partial class Direct
    {


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
                var dto = JsonConvert.DeserializeObject<v_Request>(_a.ToString());
                var request = Request.Find(dto.RequestId);

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

                dto.Status = status;

                //dto.Refresh();

                list.Add(dto);
            }

            return new DataSerializer(list);
        }


    }

}
