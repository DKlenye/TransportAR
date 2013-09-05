using System;
using System.Reflection;
using System.IO;
using System.Collections.Generic;
using System.Text;
using Kdn.Ext;

namespace Kdn.Web
{
    public static class ScriptReader
    {

        public static Assembly assembly = Assembly.GetExecutingAssembly();

        public static string ReadResource(string name)
        {
            var stream = assembly.GetManifestResourceStream(name);
            var reader = new StreamReader(stream);
            return reader.ReadToEnd();
        }

        public static string GetScript(params string[] path)
        {
            var builder = new StringBuilder();
            foreach (var p in path)
            {
                builder.Append(ReadResource(p));
            }
            return builder.ToString();
        }

        public static string GetScripts(string startPath)
        {
            return GetScripts(startPath,true);
        }

        public static string GetScripts(string startPath, bool withNamespace)
        {
            var nsList = new List<string>(startPath.Split('.'));
            var ns = nsList[nsList.Count - 1];
            var builder = new StringBuilder();
            var nsMap = new List<string>();

            Func<string, string> setNs = delegate(string _ns)
            {
                if (_ns != "" && nsMap.IndexOf(_ns) == -1)
                {
                    builder.Append(ExtFunction.ns(_ns));
                    nsMap.Add(_ns);
                }
                return _ns;
            };

            Func<string, string> getNs = delegate(string resource)
            {
                var _nsList = new List<string>(resource.Replace(startPath,ns).Split('.'));
                if (_nsList.Count < 3) return "";
                else return String.Join(".", _nsList.ToArray(), 0, _nsList.Count - 2);
            };

            if (withNamespace) setNs(ns);


            string[] resources = assembly.GetManifestResourceNames();
            Array.Sort<string>(resources);

            foreach (var resourceName in resources)
            {
                if (resourceName.IndexOf(startPath) != -1)
                {
                    if (withNamespace) setNs(getNs(resourceName));
                    builder.Append(ReadResource(resourceName));
                }
            }

            return builder.ToString();
        }
    }
}
