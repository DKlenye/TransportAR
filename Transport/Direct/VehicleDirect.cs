using Ext.Direct;
using Newtonsoft.Json.Linq;
using Transport.Models;


namespace Transport.Direct
{
   public partial class Direct:Kdn.Direct.Direct
    {

       [DirectMethod]
       [ParseAsJson]
       public string test(JObject o)
       {

         
          
         return "";
          
       }


       [DirectMethod]
       [ParseAsJson]
       public JArray WaybillTest(JObject o)
       {



         return JArray.FromObject(Request.FindAll());
          
       }




       [DirectMethod]
       [ParseAsJson]
       public string SetPosition(JObject o) {


          JToken token;

          if( o.TryGetValue("WaybillId", out token) ) {

            var v =  Waybill.Find(token.Value<int>());

            v.SetPosition();

          }

          return "";

       }


    }
}
