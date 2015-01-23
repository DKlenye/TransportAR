using System.Web;
using Transport.Models;

namespace Transport.Web.Handlers
{
    public class Attachment : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            string id = context.Request.QueryString["id"];
            var attachment  = RequestAttachments.Find(int.Parse(id));
            
            var Response = context.Response;
            Response.Clear();
            Response.Buffer = true;
            Response.Charset = "";
            Response.Cache.SetCacheability(HttpCacheability.NoCache);
            Response.ContentType = "application/zip";
            Response.AppendHeader("Content-Disposition", "attachment; filename=" + attachment.Name);
            Response.BinaryWrite(attachment.Cont);
            Response.Flush();
            Response.End();
        }

        public bool IsReusable { get; private set; }
    }
}
