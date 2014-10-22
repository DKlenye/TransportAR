using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Ext.Direct
{
    /// <summary>
    /// 
    /// </summary>
    public class DirectProvider
    {

        public const string RemotingProvider = "remoting";

        private Dictionary<string, DirectAction> actions;
        private string api;

        /// <summary>
        /// Creates an instance of the object.
        /// </summary>
        public DirectProvider()
        {
            actions = new Dictionary<string, DirectAction>();
        }

        /// <summary>
        /// Configure the provider by adding the available API methods.
        /// </summary>
        /// <param name="assembly">The assembly to automatically generate parameters from.</param>
        public void Configure(Assembly assembly)
        {
            Configure(assembly, null);
        }

        /// <summary>
        /// Configure the provider by adding the available API methods.
        /// </summary>
        /// <param name="assembly">The assembly to automatically generate parameters from.</param>
        /// <param name="exclusions">A list of classes to exclude.</param>
        public void Configure(Assembly assembly, IEnumerable<object> exclusions)
        {
            if (!Configured)
            {
                var types = assembly.GetTypes().Where(type => CheckType(exclusions, type)).ToList();
                Configure(types);
            }
        }

        /// <summary>
        /// Configure the provider by adding the available API methods.
        /// </summary>
        /// <param name="items">A series of object instances that contain Ext.Direct methods.</param>
        public void Configure(IEnumerable<object> items)
        {
            if (!Configured)
            {
                var types = (from item in items where item != null select item.GetType()).ToList();
                Configure(types);
            }
        }

        //Generic configuration method for a list of types.
        private void Configure(IEnumerable<Type> types)
        {
            foreach (Type type in types)
            {
                if (DirectAction.IsAction(type))
                {
                    actions.Add(Utility.GetName(type), new DirectAction(type));
                }
            }
            Configured = true;
            ConstructApi();
        }

        private void ConstructApi()
        {
            using (var sw = new System.IO.StringWriter())
            {
                using (var jw = new JsonTextWriter(sw))
                {
                    jw.WriteStartObject();
                    if (string.IsNullOrEmpty(Type))
                    {
                        Type = RemotingProvider;
                    }
                    Utility.WriteProperty(jw, "type", Type);
                    Utility.WriteProperty(jw, "url", Url);
                    if (!string.IsNullOrEmpty(Namespace))
                    {
                        Utility.WriteProperty(jw, "namespace", Namespace);
                    }
                    if (!string.IsNullOrEmpty(Id))
                    {
                        Utility.WriteProperty(jw, "id", Id);
                    }
                    if (Timeout.HasValue)
                    {
                        Utility.WriteProperty(jw, "timeout", Timeout.Value);
                    }
                    if (MaxRetries.HasValue)
                    {
                        Utility.WriteProperty(jw, "maxRetries", MaxRetries.Value);
                    }
                    jw.WritePropertyName("actions");
                    jw.WriteStartObject();
                    foreach (DirectAction action in actions.Values)
                    {
                        action.Write(jw);
                    }
                    jw.WriteEndObject();
                    jw.WriteEndObject();
                    api = string.Empty;
                    if (AutoNamespace)
                    {
                        api = String.Format("Ext.ns('{0}');", Name);
                    }
                    api += String.Format("{0} = {1};", Name, sw);
                }
            }
        }

        public bool AutoNamespace
        {
            get;
            set;
        }

        /// <summary>
        /// Clears any previous configuration for this provider.
        /// </summary>
        public void Clear()
        {
            Configured = false;
            actions.Clear();
        }

        /// <summary>
        /// Indicates whether the provider has been configured or not.
        /// </summary>
        public bool Configured
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets/sets the id of the provider.
        /// </summary>
        public string Id
        {
            get;
            set;
        }

        /// <summary>
        /// Gets/sets the name of the provider.
        /// </summary>
        public string Name
        {
            get;
            set;
        }

        /// <summary>
        /// Gets/sets the url to router requests to for this provider.
        /// </summary>
        public string Url
        {
            get;
            set;
        }

        /// <summary>
        /// Gets/sets the type of the provider.
        /// </summary>
        public string Type
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the namespace to use for client side actions.
        /// </summary>
        public string Namespace
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the timeout to use for this provider (in milliseconds).
        /// </summary>
        public int? Timeout
        {
            get;
            set;
        }

        /// <summary>
        ///  Gets or sets the maximum number of retries for a failed request.
        /// </summary>
        public int? MaxRetries
        {
            get;
            set;
        }

        public override string ToString()
        {
            return api;
        }

        internal object Execute(DirectRequest request)
        {
            DirectAction action = actions[request.Action];
            if (action == null)
            {
                throw new DirectException("Unable to find action, " + request.Action);
            }
            DirectMethod method = action.GetMethod(request.Method);
            if (method == null)
            {
                throw new DirectException("Unable to find action, " + request.Method);
            }
            Type type = action.Type;
            if (request.Data == null)
            {
                if (method.Parameters > 0)
                {
                    throw new DirectException("Parameters length does not match");
                }
            }
            else
            {
                if (request.Data.Length > 1 && method.IsForm)
                {
                    throw new DirectException("Form methods can only have a single parameter.");
                }
                if (request.Data.Length != method.Parameters)
                {
                    throw new DirectException("Parameters length does not match");
                }
            }
            try
            {
                SanitizeDates(method.Method, request);
                return method.Method.Invoke(
                    type.Assembly.CreateInstance(type.FullName), method.GetParams(request.RequestData));
            }
            catch (Exception ex)
            {
                Exception _ex = ex;

                var arrayEx= new JArray();

                while(_ex.InnerException != null)
                {
                    _ex = _ex.InnerException;
                    arrayEx.Add("<br/>"+_ex.Message);                    
                }        

                throw new DirectException(new JObject(new JProperty("Ошибки", arrayEx)).ToString(Formatting.None));
            }
        }

        private void SanitizeDates(MethodInfo method, DirectRequest request)
        {
            int idx = 0;
            foreach (var p in method.GetParameters())
            {
                if (p.ParameterType == typeof(DateTime))
                {
                    object o = request.Data[idx];
                    if (o != null)
                    {
                        DateTime d;
                        if (DateTime.TryParse(o.ToString(), out d))
                        {
                            request.Data[idx] = d;
                        }
                        else
                        {
                            throw new DirectException("Unable to parse date parameter.");
                        }
                    }
                    else
                    {
                        throw new DirectException("Unable to parse date parameter.");
                    }
                }
                ++idx;
            }
        }

        private static bool CheckType(IEnumerable<object> exclusions, Type t)
        {
            if (exclusions != null)
            {
                return exclusions.Where(o => o != null).All(o => o.GetType() != t);
            }
            return true;
        }

    }
}
