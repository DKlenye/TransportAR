using System;
using System.Web;
using System.Reflection;
using System.Collections;
using System.Collections.Generic;
using Ext.Direct;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Castle.ActiveRecord;
using Kdn.CommonModels;
using NHibernate;
using NHibernate.Criterion;


namespace Kdn.Direct
{

    [DirectAction]
    public partial class Direct : DirectHandler
    {

        protected virtual Type getModelType(JObject o)
        {
            string TypeModel = o["typeName"].Value<string>();
            Type t = Type.GetType(TypeModel);
            return t;

        }

        protected JArray getModels(JObject o)
        {
            JToken token = o["data"];
            Type T = token.GetType();
            JArray array = new JArray();

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
            JArray models = getModels(o);
            List<object> rezult = new List<object>();

            foreach (JObject model in models)
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
            return DataAction(o, x => ActiveRecordMediator.SaveAndFlush(x));
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

           // return DataAction(o, x => ActiveRecordMediator.UpdateAndFlush(x));
        }               

        [DirectMethod]
        [ParseAsJson]
        public virtual DataSerializer Destroy(JObject o)
        {

            Action<object> a = delegate(object obj)
            {
                var aObj = obj as ActiveRecordBase;
                //aObj.Refresh();
                aObj.Delete();
            };

            return DataAction(o, a);

           // return DataAction(o, x => ActiveRecordMediator.Delete(x));
        }


        /*[DirectMethod]
        [ParseAsJson]
        public DataSerializer ReCreateDatabase(JObject o)
        {
            ActiveRecordStarter.DropSchema();
            ActiveRecordStarter.CreateSchema();

            CreateDefaultModels();
           
           return new DataSerializer(new List<object>()); 
        }*/

        [DirectMethod]
        [ParseAsJson]
        public DataSerializer UpdateDatabase(JObject o)
        {
            ActiveRecordStarter.UpdateSchema();

            return new DataSerializer(new List<object>());
        }

        protected virtual void CreateDefaultModels(){
        
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
