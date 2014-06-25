using System.Collections.Generic;
using Ext.Direct;
using Kdn.Direct;
using Newtonsoft.Json.Linq;
using Transport.Models;

namespace Transport.Direct
{
    public partial class Direct : Kdn.Direct.Direct
    {

        [DirectMethod]
        [ParseAsJson]
        public DataSerializer TireCardRead(JObject o)
        {

            JToken p;
            int id = 0;

            p = o["filter"];

            id = p["TireId"].Value<int>();

            var db = new PetaPoco.Database("db2");
            var rez = db.Query<Models.BatteryCard>(";EXEC TireCard @TireId",
                 new
                 {
                     TireId = id
                 }
               );

            return new DataSerializer(new List<BatteryCard>(rez));
        }
    }
}
