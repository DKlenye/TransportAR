using System;
using System.Web.Hosting;
using System.IO;
using System.Collections.Generic;
using System.Web;
using System.Text;

namespace Kdn.Web.Handlers
{
    public class CSS : IHttpHandler
    {

        string pathToIcon = "~/images";

        public void ProcessRequest(HttpContext context)
        {
            ScriptReader.assembly = System.Reflection.Assembly.GetExecutingAssembly();

            var BasePath = "Kdn.CSS";

            Func<string, string> getPath = delegate(string path){return String.Format("{0}.{1}", BasePath, path);};

            context.Response.Write(ScriptReader.GetScript(
                getPath("ext-all.css"),
                getPath("ux-all.css")
            ));

            context.Response.Write(ScriptReader.GetScripts(String.Format("{0}.{1}", BasePath, "Kdn"),false));

            context.Response.Write(getCss("icons"));
            context.Response.Write(getCss("icons/32", "32"));

        }

        string getCss(string iconsPath)
        {
            return getCss(iconsPath, "");
        }

        string getCss(string iconsPath, string postfix)
        {
            var sb = new StringBuilder();

            foreach (string file in Directory.GetFiles(HostingEnvironment.MapPath(pathToIcon + "/" + iconsPath)))
            {
                var i = new FileInfo(file);
                sb.Append(getStyle(iconsPath, i.Name, postfix));
            }
            return sb.ToString();
        }

        string getStyle(string FilePath, string fileName, string postfix)
        {
            return iconName(fileName, postfix) + styleRule(FilePath, fileName);
        }

        string iconName(string fileName, string postfix)
        {
            return String.Format(".icon-{0}{1}", fileName.Split('.')[0], postfix);
        }

        string styleRule(string FilePath, string fileName)
        {
            return "{" + String.Format("background-image:url(../images/{0}/{1})!important;", FilePath, fileName) + "}";
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}
