using System.Globalization;
using System.Linq;
using Ext.Direct;
using Newtonsoft.Json.Linq;
using NHibernate.Criterion;
using Transport.Models;

namespace Transport.Direct
{
    public partial class Direct
    {

        [DirectMethod]
        [ParseAsJson]
        public string Calc(JObject o)
        {

            var waybills = Waybill.FindAll(Expression.Where<Waybill>(x => x.WaybillId == 883527)).ToList();

            waybills.ForEach(w =>
            {
                w.ClearWorkingTime();
                w.ClearWaybillWork();
                w.CalcWorkingTime();
                w.CalcWaybillWork();
                w.CalcFactConsumption();
                w.SaveAndFlush();

            });




            return "";
        }

        [DirectMethod]
        public string ReCalcWaybill(int waybillId)
        {
            var waybill = Waybill.Find(waybillId);
            var tasks = WaybillTask.FindByWaybill(waybillId).ToList();

            tasks.ForEach(x =>
            {
                x.Consumption = x.CalculateConsumption();
                x.SaveAndFlush();
            });

            waybill.CalcFactConsumption();
            waybill.SaveAndFlush();

            return "";
        }


    }
}
