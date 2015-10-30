using System;
using System.Collections.Generic;
using System.Linq;
using Ext.Direct;
using Kdn.Direct;
using Newtonsoft.Json.Linq;
using Transport.Models;

namespace Transport.Direct
{
    public partial class Direct
    {
        [DirectMethod]
        [ParseAsJson]
        public DataSerializer ReadNorms(JObject o)
        {

            var showObsolete = o["ShowObsolete"].Value<bool>();
            var data = Read(o);
            var date = DateTime.Now;

            if (!showObsolete)
            {
                var norms = (Norm[]) data.List;
                return new DataSerializer(norms.Where(x=>x.CheckActual(date) || (x.Annually!=null &&x.Annually.Value) ).ToList());
            }

            return data;
            
        }

    }
}


