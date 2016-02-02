using System.Linq;
using Ext.Direct;
using Newtonsoft.Json.Linq;
using Kdn.Direct;
using Transport.Models;


namespace Transport.Direct
{
    public partial class Direct : Kdn.Direct.Direct
    {

        [DirectMethod]
        [ParseAsJson]
        public DataSerializer ReadDispatcher(JObject o)
        {

            var rez = db.Query<Models.User>(@"SELECT DISTINCT u.* FROM 
                    WaybillCustomerWorkingTime wcwt
                    INNER JOIN Waybill w ON w.WaybillId = wcwt.WaybillId
                    INNER JOIN Users u ON u.UserId = w.UserClose
                    WHERE wcwt.OrderNumber IS NOT null"
             ); 
            
            return new DataSerializer(rez.ToArray());
        }
    }
}