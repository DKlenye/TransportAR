using System.Collections.Generic;
using System.Reflection;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Ext.Direct
{
    internal class DirectMethod
    {

        /// <summary>
        /// Creates an instance of this class.
        /// </summary>
        /// <param name="method">The method information.</param>
        internal DirectMethod(MethodInfo method)
        {
            Method = method;
            IsForm = Utility.HasAttribute(method, typeof(DirectMethodFormAttribute));
            Name = Utility.GetName(method);
            ParseAsJson = Utility.HasAttribute(method, typeof(ParseAsJsonAttribute));
            Parameters = method.GetParameters().Length;
        }

        /// <summary>
        /// Gets the method info.
        /// </summary>
        internal MethodInfo Method
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets whether the method is a form method;
        /// </summary>
        internal bool IsForm
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets the name of the method.
        /// </summary>
        internal string Name
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets the number of parameters for the method.
        /// </summary>
        internal int Parameters
        {
            get;
            private set;
        }

        internal bool ParseAsJson
        {
            get;
            private set;
        }

        internal object[] GetParams(JObject requestData)
        {
            var par = new List<object>();
            var data = (JArray)requestData["data"];
            if (ParseAsJson)
            {
                var attr = Method.GetCustomAttribute<ParseAsJsonAttribute>();
                if (attr.AsArray)
                {
                    par.Add((JArray) data[0]);
                }
                par.Add((JObject) data[0]);
            }
            else
            {
                var i = 0;
                foreach (var paramInfo in Method.GetParameters())
                {
                    par.Add(JsonConvert.DeserializeObject(data[i].ToString(), paramInfo.ParameterType));
                    i++;
                }
            }
            return par.ToArray();
        }


        /// <summary>
        /// Write API JSON.
        /// </summary>
        /// <param name="jw">The JSON writer.</param>
        internal void Write(JsonTextWriter jw)
        {
            jw.WriteStartObject();
            Utility.WriteProperty(jw, "name", Name);
            Utility.WriteProperty(jw, "len", Parameters);
            if (IsForm)
            {
                Utility.WriteProperty(jw, "formHandler", true);
            }
            jw.WriteEndObject();
        }

        /// <summary>
        /// Checks whether the passed method is a direct method.
        /// </summary>
        /// <param name="mi">The method to check.</param>
        /// <returns>True if the method is a direct method.</returns>
        internal static bool IsMethod(MethodInfo mi)
        {
            return Utility.HasAttribute(mi, typeof(DirectMethodAttribute));
        }

    }
}
