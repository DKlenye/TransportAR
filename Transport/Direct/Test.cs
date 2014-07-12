using System;
using Ext.Direct;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;


namespace Transport.Direct
{
    public partial class Direct
    {

        [DirectMethod]
        [ParseAsJson]
        public string getDate(JObject o)
        {
            return JsonConvert.SerializeObject(DateTime.Now);
        }


    }
}
