using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json.Linq;

namespace Kdn.Ext
{
    public static class ExtFunction
    {

        public static string ns(params string[] name)
        {
            List<string> namespaces = new List<string>();
            foreach (string ns in name)
            {
                namespaces.Add(String.Format("'{0}'",ns));
            }
            return String.Format("Ext.ns({0});",String.Join(",",namespaces.ToArray()));
        }

        public static string create( JObject cfg)
        {
            return String.Format("Ext.create({0});", cfg);
        }
    }
}
