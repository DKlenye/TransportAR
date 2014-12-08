using System.Globalization;
using System.Threading;

namespace Kdn.Web
{
    public static class WebHelper
    {

        static WebHelper()
        {
            normalizeCulture();
        }

        public static void normalizeCulture()
        {
            var culture = new CultureInfo("ru-RU", false);
            culture.NumberFormat.CurrencyDecimalSeparator = ".";
            culture.NumberFormat.NumberDecimalSeparator = ".";
            Thread.CurrentThread.CurrentCulture = culture;
            Thread.CurrentThread.CurrentUICulture = culture;
            
        }

        public static string getLoadIndicator()
        {
           string tpl = @"
            <div id=""loading-mask""/>
            <div id=""loading"">
                <div class=""loading-indicator"">
                    <img src=""images/extanim32.gif"" width=""120"" height=""120"" style=""margin-right:8px;"" align=""absmiddle"" />
                    <div><span id=""loading-msg"">Загрузка...</span>
                    </div>
                </div>
            </div>";

           return tpl;
        }
    }
}
