using System;
using System.Collections.Generic;
using Kdn.Ext;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NHibernate;
using NHibernate.Criterion;


namespace Transport.OtherModels.kdrPolymir
{
    public class BIBPOLIM
    {       
       public string zex { get; set; }
       public string nomer { get; set; }

       public string fam { get; set; }
       public string ima { get; set; }
       public string otc { get; set; }

       public string data_pr { get; set; }
       public string data_uv { get; set; }
       public string dol { get; set; }
    }
}
