using System;
using System.Collections;
using System.Collections.Generic;
using Ext.Direct;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Castle.ActiveRecord;


namespace Kdn.Direct
{

    [DirectAction]
    public partial class Direct : DirectHandler
    {

        protected virtual Type getModelType(JObject o)
        {
            var TypeModel = o["typeName"].Value<string>();
            var t = Type.GetType(TypeModel);
            return t;

        }

        protected JArray getModels(JObject o)
        {
            var token = o["data"];
            var T = token.GetType();
            var array = new JArray();

            if (T == typeof(JObject))
            {
                array.Add(token);
            }
            else if (T == typeof(JArray))
            {
                array = (JArray)token;
            }

            return array;
        }


        public virtual DataSerializer DataAction(JObject o, Action<object> action)
        {
            var type = getModelType(o);
            var models = getModels(o);
            var rezult = new List<object>();

            foreach (var model in models)
            {
                var instance = JsonConvert.DeserializeObject(model.ToString(), type);
                action(instance);
                rezult.Add(instance);
            }

            return new DataSerializer(rezult);
        }


        [DirectMethod]
        [ParseAsJson]
        public virtual DataSerializer Read(JObject o)
        {
            IList records = ActiveRecordMediator.FindAll(getModelType(o));
            return new DataSerializer(records);
        }

        [DirectMethod]
        [ParseAsJson]
        public virtual DataSerializer Create(JObject o)
        {
            return DataAction(o, ActiveRecordMediator.SaveAndFlush);
        }

        [DirectMethod]
        [ParseAsJson]
        public virtual DataSerializer Update(JObject o)
        {

            Action<object> a = delegate (object obj)
            {
                var aObj = obj as ActiveRecordBase;
                aObj.UpdateAndFlush();
            };
            return DataAction(o,a);
        }               

        [DirectMethod]
        [ParseAsJson]
        public virtual DataSerializer Destroy(JObject o)
        {

            Action<object> a = delegate(object obj)
            {
                var aObj = obj as ActiveRecordBase;
                aObj.Delete();
            };

            return DataAction(o, a);
        }
        
        
        public override string ProviderName
        {
            get
            {
                return "Kdn.DirectProvider";
            }
        }

        public override string Namespace
        {
            get
            {
                return "Kdn";
            }
        }
    }
}
