using System.Collections.Generic;
using Ext.Direct;
using Newtonsoft.Json.Linq;
using Kdn.Direct;
using Transport.Models;


namespace Transport.Direct
{
   public partial class Direct:Kdn.Direct.Direct
    {

       [DirectMethod]
       [ParseAsJson]
       public DataSerializer BatteryCardRead(JObject o)
       {

         JToken p;
         int id = 0;

         p = o["filter"];

         id = p["BatteryId"].Value<int>();                   

          var db =new PetaPoco.Database("db2");
          var rez = db.Query<Models.BatteryCard>(";EXEC BatteryCard @BatteryId",
               new
               {
                  BatteryId = id
               }
             );                    

          return new DataSerializer(new List<BatteryCard>(rez));
       }
    }
}
