using System.Reflection;
using System.Web;
using Kdn.Ext;
using Kdn.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Transport.Models;

namespace Transport.Web.Handlers
{
    public class JS:Kdn.Web.Handlers.JS
    {
        public override void ProcessRequest(HttpContext context)
        {
            base.ProcessRequest(context);
            
            var settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;

            var models = base.getModels();                            
            models.AddRange(ModelConverter.ConvertAssembly(Assembly.GetExecutingAssembly()));
            
            foreach (var m in models)
            {
               context.Response.Write(ExtFunction.create(JObject.FromObject(m)));
            }

            ScriptReader.assembly = Assembly.GetExecutingAssembly();

            context.Response.Write(ScriptReader.GetScripts("Transport.JS.Transport"));
            context.Response.Write("Kdn.Application = Transport.app.Application");
        }


        public override string GetUser()
        {
            return JsonConvert.SerializeObject(User.GetCurrent());
        }
    }
}
