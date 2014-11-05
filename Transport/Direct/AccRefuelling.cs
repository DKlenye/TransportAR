using System;
using System.Collections.Generic;
using Ext.Direct;
using Newtonsoft.Json.Linq;
using Kdn.Direct;
using Transport.Models;

namespace Transport.Direct
{

    public class AccRefuellingReadParams 
    {
        public DateTime? period { get; set; }
        public int? refuellingPlaceId { get; set; }
        public int? accounting { get; set; }
    }

    public partial class Direct
    {
        [DirectMethod]
        public DataSerializer AccRefuellingRead(AccRefuellingReadParams par)
        {

            var rez =
                db.Query<Models.AccRefuelling>(
                    "SELECT * FROM v_AccRefuelling where MONTH(RefuellingDate) = @0 and YEAR(RefuellingDate)= @1 and RefuellingPlaceId = @2 and AccountingId = @3",
                    par.period == null ? (object) null : par.period.Value.Month,
                    par.period == null ? (object) null : par.period.Value.Year,
                    par.refuellingPlaceId,
                    par.accounting
                    );

            return new DataSerializer(new List<AccRefuelling>(rez));
        }

        [DirectMethod]
        [ParseAsJson]
        public DataSerializer AccRefuellingUpdate(JObject o)
        {
            var rezult = new List<object>();

            foreach (var accRefuelling in GetModels<AccRefuelling>(o))
            {
                db.Execute(
                    "Update VehicleRefuelling set CardNumber = @0, AccPeriod = @1, SheetId = @2, TrkId = @3, TankId = @4 where RefuellingId = @5",
                    accRefuelling.CardNumber,
                    accRefuelling.AccPeriod,
                    accRefuelling.SheetId,
                    accRefuelling.TrkId,
                    accRefuelling.TankId,
                    accRefuelling.RefuellingId
                    );

                rezult.Add(accRefuelling);
            }
            return new DataSerializer(rezult);
        }
    }
}
