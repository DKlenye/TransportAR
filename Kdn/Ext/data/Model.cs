﻿using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Kdn.Ext;

namespace Kdn.Ext.data
{
    
    public class Model
    {

        public Model()
        {
            fields = new List<Field>();
            columns = new List<Kdn.Ext.Attributes.ColumnAttribute>();
        }

        public string name { get; set; }
        public string typeName { get; set; }
        public string idProperty { get; set; }
        public List<Field> fields { get; set; }
        public List<Attributes.ColumnAttribute> columns {get;set;}

        public string xtype { get { return "kdn.data.model"; } }

    }
}
