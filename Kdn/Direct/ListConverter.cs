using System;
using System.Reflection;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Converters;
using Kdn.Ext.Attributes;

namespace Kdn.Direct
{
   public class ListConverter:JsonConverter
    {

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {

            Type t = value.GetType();
            Type type = t.GetGenericArguments()[0];

            string IdPropName = getIdPropertyName(type);

            IList list = (IList)value;
            
            List<string> values = new List<string>();

            foreach (var itm in list)
            {
                var obj = itm.GetType().GetProperty(IdPropName).GetValue(itm,null);
                values.Add(obj.ToString());
            }

            writer.WriteValue(String.Join(",",values.ToArray()));
        }


        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {

            var s = (string)reader.Value;
            Type genericType = objectType.GetGenericArguments()[0];

            IList list = (IList)Activator.CreateInstance(typeof(List<>).MakeGenericType(genericType));

            string IdPropName = getIdPropertyName(genericType);

            if (s == "") return list;
            else
            {
                foreach (var itm in s.Split(','))
                {
                    var instance = Activator.CreateInstance(genericType);
                    genericType.GetProperty(IdPropName).SetValue(instance,Int32.Parse(itm),null);
                    list.Add(instance);
                }
            }
            return list;
        }


        string getIdPropertyName(Type type)
        {
            string IdPropName = "";

            foreach (var prop in type.GetProperties())
            {
                if (Attribute.GetCustomAttribute(prop, typeof(IdPropertyAttribute)) != null)
                {
                    IdPropName = prop.Name;
                    break;
                }
            }
            return IdPropName;
        }

        public override bool CanConvert(Type objectType)
        {
            var name = objectType.Name;
            return (name == "IList`1" || name == "ICollection`1");
        }

    }
}
