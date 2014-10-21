using System;
using System.Collections;
using System.Collections.Generic;
using Newtonsoft.Json;
using Kdn.Ext.Attributes;

namespace Kdn.Direct
{
   public class ListConverter:JsonConverter
    {

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {

            var t = value.GetType();
            var type = t.GetGenericArguments()[0];

            var idPropName = getIdPropertyName(type);

            var list = (IList)value;
            var values = new List<string>();

            foreach (var itm in list)
            {
                var obj = itm.GetType().GetProperty(idPropName).GetValue(itm,null);
                values.Add(obj.ToString());
            }

            writer.WriteValue(String.Join(",",values.ToArray()));
        }


        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {

            var s = (string)reader.Value;
            var genericType = objectType.GetGenericArguments()[0];

            var list = (IList)Activator.CreateInstance(typeof(List<>).MakeGenericType(genericType));

            string idPropName = getIdPropertyName(genericType);

            if (s == "") return list;
            foreach (var itm in s.Split(','))
            {
                var instance = Activator.CreateInstance(genericType);
                genericType.GetProperty(idPropName).SetValue(instance,Int32.Parse(itm),null);
                list.Add(instance);
            }
            return list;
        }


        string getIdPropertyName(Type type)
        {
            string idPropName = "";

            foreach (var prop in type.GetProperties())
            {
                if (Attribute.GetCustomAttribute(prop, typeof(IdPropertyAttribute)) != null)
                {
                    idPropName = prop.Name;
                    break;
                }
            }
            return idPropName;
        }

        public override bool CanConvert(Type objectType)
        {
            var name = objectType.Name;
            return (name == "IList`1" || name == "ICollection`1");
        }

    }
}
