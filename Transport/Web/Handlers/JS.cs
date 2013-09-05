using System;
using System.Reflection;
using System.Collections.Generic;
using System.Web;
using System.Text;
using Kdn.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Kdn.Ext;

namespace Shipment.Web.Handlers
{
    public sealed class JS:Kdn.Web.Handlers.JS
    {
        public override void ProcessRequest(HttpContext context)
        {
            base.ProcessRequest(context);
            
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;

            var models = base.getModels();                            
            models.AddRange(ModelConverter.ConvertAssembly(Assembly.GetExecutingAssembly()));

            


            foreach (var m in models)
            {
               context.Response.Write(ExtFunction.create(JObject.FromObject(m)));
            }
           /*
            context.Response.Write(String.Format
                ("Kdn.ModelFactory={0};",
                    ExtFunction.create(
                        JObject.FromObject(
                            new Kdn.Ext.data.ModelFactory(models)
                        )
                    )
                )
            );*/

            ScriptReader.assembly = Assembly.GetExecutingAssembly();

            context.Response.Write(ScriptReader.GetScripts("Transport.JS.Transport"));
            context.Response.Write("Kdn.Application = Transport.app.Application");
        }

        public override Type UserType
        {
            get
            {
                return typeof(Transport.Models.User);
            }
        }
      

    }
}
