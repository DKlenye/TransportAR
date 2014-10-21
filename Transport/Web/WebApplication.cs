using System.Reflection;

namespace Transport.Web
{
    public class WebApplication:Kdn.Web.WebApplication
    {
        protected override Assembly GetModelsAssembly()
        {
            return Assembly.GetExecutingAssembly();
        }
    }
}


