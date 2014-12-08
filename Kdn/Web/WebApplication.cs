using System;
using System.Reflection;
using System.Web;
using Castle.ActiveRecord;
using Castle.ActiveRecord.Framework;
using Castle.ActiveRecord.Framework.Config;


namespace Kdn.Web
{
    public class WebApplication:HttpApplication
    {

        public WebApplication()
        {
            BeginRequest += new EventHandler(OnBeginRequest);
            EndRequest += new EventHandler(OnEndRequest);
        }


        protected virtual void Configure()
        {

           //Добавляем в контекст ActiveRecord классы с ручными маппингами
            var assembly = GetModelsAssembly();

            //Настраиваем профайлер (логгер) указанный в web.config раздел <log4net>
            log4net.Config.XmlConfigurator.Configure();

            //Источник конфига для NHibernate в том же web.config раздел <activerecord>
            IConfigurationSource source = ActiveRecordSectionHandler.Instance;

            //Стартуем ActiveRecord
            ActiveRecordStarter.Initialize(new Assembly[] { GetModelsAssembly() }, source);      
        
        
        } 


        protected void Application_Start(object sender, EventArgs e)
        {
            Configure();
        }

        protected void OnBeginRequest(object sender, EventArgs e)
        {
            HttpContext.Current.Items.Add("ar.sessionscope", new SessionScope());
        }

        protected void OnEndRequest(object sender, EventArgs e)
        {
            try
            {
                SessionScope scope = HttpContext.Current.Items["ar.sessionscope"] as SessionScope;

                if (scope != null)
                {
                    scope.Dispose();
                }
            }
            catch (Exception ex)
            {
                HttpContext.Current.Trace.Warn("Error", "EndRequest: " + ex.Message, ex);
            }
        } 

        protected virtual Assembly GetModelsAssembly()
        {
            return Assembly.GetExecutingAssembly();
        }        

    }
}
