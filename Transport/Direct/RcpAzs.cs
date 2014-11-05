using System;
using System.Collections.Generic;
using Ext.Direct;
using Newtonsoft.Json.Linq;
using Kdn.Direct;
using Transport.Models;
using System.Security.Principal;

namespace Transport.Direct
{
   public partial class Direct:Kdn.Direct.Direct
    {

      [DirectMethod]
      [ParseAsJson]
      public DataSerializer RcpAzsRead(JObject o)
       {

         JToken p;
         int month = 0, year = 0;
          
         if( o.TryGetValue("period", out p) && p.Value<DateTime?>() != null ) {
            month = p.Value<DateTime>().Month;
            year = p.Value<DateTime>().Year;            
         }

          var rez = db.Query<Models.RcpAzs>("SELECT * FROM v_RcpAzs where MONTH(DocDate) = @0 and YEAR (DocDate)= @1",
               month,
               year
             );
          return new DataSerializer(new List<RcpAzs>(rez));
       }



      [DirectMethod]
      [ParseAsJson]
      public string[] RcpAzsTest(JObject o) {
         WindowsPrincipal p = new WindowsPrincipal(WindowsIdentity.GetCurrent());

         var groups = new List<string>();

         foreach( var group in Enum.GetNames(typeof(UserRoles))) {
            if( p.IsInRole(group) ) {
               groups.Add(group);
            }
         }

         return groups.ToArray();

      }
      


    }





}
