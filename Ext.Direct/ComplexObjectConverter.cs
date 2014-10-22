using System;
using System.Collections;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace Ext.Direct
{
    internal class ComplexObjectConverter : JsonConverter
    {
        public override bool CanConvert(Type objectType)
        {
            if (objectType == typeof(object[]) || objectType == typeof(object)) { return true; }
            return false;
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            if (reader.TokenType == JsonToken.StartArray)
                return ReadArray(reader);
            if (reader.TokenType == JsonToken.StartObject)
                return ReadObject(reader);
            return null;
        }


        private object[] ReadArray(JsonReader reader)
        {
            var output = new ArrayList();
            while (reader.Read())
            {
                if (reader.TokenType == JsonToken.EndArray)
                {
                    return output.ToArray();
                }
                if (reader.TokenType == JsonToken.StartArray)
                {
                    output.Add(ReadArray(reader));
                }
                if (reader.TokenType == JsonToken.StartObject)
                {
                    output.Add(ReadObject(reader));
                }
                else
                {
                    output.Add(reader.Value);
                }
            }

            throw new JsonReaderException();
        }

        private object ReadObject(JsonReader reader)
        {
            var subobject = new Dictionary<string, object>();
            string currentKey = null;

            while (reader.Read())
            {
                if (reader.TokenType == JsonToken.EndObject)
                {
                    return subobject;
                }
                if (currentKey == null)
                {
                    currentKey = reader.Value.ToString();
                }
                else
                {
                    if (reader.TokenType == JsonToken.StartArray)
                    {
                        subobject.Add(currentKey, ReadArray(reader));
                    }
                    else if (reader.TokenType == JsonToken.StartObject)
                    {
                        subobject.Add(currentKey, ReadObject(reader));
                    }
                    else
                    {
                        subobject.Add(currentKey, reader.Value);
                    }
                    currentKey = null;
                }
            }
            return null;
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            throw new NotImplementedException();
        }
    }
}