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
        public DataSerializer ReadDriver(JObject o)
        {
            var drivers = (Driver[])Read(o).List;
            var _drivers = drivers.ToList()/*.Where(x=>x.Employee.DismissDate==null).ToArray()*/;
            return new DataSerializer(_drivers,_drivers.Count());
        }
    }
}