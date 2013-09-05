using System;
using System.Collections.Generic;
using Kdn.Ext;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NHibernate;
using NHibernate.Criterion;


namespace Transport.OtherModels.kdr
{
    public class personal1
    {
       public int ID_MEN { get; set; }
       public string ZEX { get; set; }
       public string tab { get; set; }
       public string fio { get; set; }
       public DateTime? DATA_PR { get; set; }
       public DateTime? DATA_UV { get; set; }
       public string dol { get; set; }
    }
}
