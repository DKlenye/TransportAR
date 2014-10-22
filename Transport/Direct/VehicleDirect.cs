using Ext.Direct;
using Newtonsoft.Json.Linq;
using Transport.Models;

namespace Transport.Direct
{
    public partial class Direct
    {
        [DirectMethod]
        [ParseAsJson]
        public string SetPosition(JObject o)
        {
            JToken token;
            if (o.TryGetValue("WaybillId", out token))
            {
                var v = Waybill.Find(token.Value<int>());
                v.SetPosition();
            }
            return "";
        }
    }
}
