using System;
using System.Collections.Generic;
using System.Reflection;
using Kdn.Ext.Attributes;
using Kdn.Ext.data;
using Newtonsoft.Json;

namespace Kdn.Ext
{
    public static class ModelConverter
    {

        static Dictionary<Type, FieldType> typeMap;
        static Dictionary<Type, string> editorXTypeMap;
        static ModelConverter()
        {
            typeMap = new Dictionary<Type, FieldType>();

            typeMap.Add(typeof(String), FieldType.@string);
            typeMap.Add(typeof(int), FieldType.@int);
            typeMap.Add(typeof(float), FieldType.@float);
            typeMap.Add(typeof(decimal), FieldType.@float);
            typeMap.Add(typeof(DateTime), FieldType.date);
            typeMap.Add(typeof(Boolean), FieldType.boolean);


            editorXTypeMap = new Dictionary<Type, string>();

            editorXTypeMap.Add(typeof(String), "kdn.editor.textfield");
            editorXTypeMap.Add(typeof(int), "kdn.editor.numberfield");
            editorXTypeMap.Add(typeof(float), "kdn.editor.decimalfield");
            editorXTypeMap.Add(typeof(decimal), "kdn.editor.decimalfield");
            editorXTypeMap.Add(typeof(DateTime), "kdn.editor.datefield");
            editorXTypeMap.Add(typeof(Boolean), "kdn.editor.booleanfield");



        }

        static FieldType typeConvert(Type t){
            if (typeMap.ContainsKey(t))
            {
                return typeMap[t];
            }
            else
            {
                return FieldType.auto;
            }
        }

        static string editorConver(Type t)
        {
            if (editorXTypeMap.ContainsKey(t))
            {
                return editorXTypeMap[t];
            }
            else
            {
                return null;
            }
            
        }


        public static Model Convert(Type Entity)
        {

            var Props = Entity.GetProperties();

            var model = new Model()
                {
                    name = Entity.Name,
                    typeName = Entity.FullName
                };

            foreach (var Prop in Props)
            {
                if (checkAttribute(Prop, typeof(JsonIgnoreAttribute))) continue;
                
                Field field = ConvertProperty(Prop);
                ColumnAttribute attr = (ColumnAttribute)findColumn(Prop);

                bool isId = isID(Prop);

                if (isId)
                {
                    model.idProperty = Prop.Name;
                    field.allowBlank = true;
                    if (attr != null)
                    {
                        attr.align = "center";
                    }
                }

                if (attr!= null)
                {
                    attr.dataIndex = Prop.Name;

                    if (attr.Editor == null && !attr.Readonly && !isId)
                    {
                        attr.Editor = editorConver(Prop.PropertyType);
                    }

                    model.columns.Add(attr);
                }     
                
                //Проверка если List то нужен конвертер

                model.fields.Add(field);

            }

            return model;

        }

        public static Field ConvertProperty(PropertyInfo property)
        {
            var field = new Field()
            {               
                name = property.Name
            };

            Type type = Nullable.GetUnderlyingType(property.PropertyType);
            if (type == null)
            {
                type = property.PropertyType;
            }
            else
            {
                field.allowBlank = true;
            }

            if (checkAttribute(property,typeof(AllowBlankAttribute))){
                field.allowBlank = true;
            }

            field._type = typeConvert(type);
            
            return field;
        }

        public static Attribute findColumn(PropertyInfo property)
        {
                return Attribute.GetCustomAttribute(property,typeof(ColumnAttribute));
        }

        static bool isID(PropertyInfo property)
        {
            return checkAttribute(property, typeof(IdPropertyAttribute));
        }

        static bool checkAttribute(MemberInfo p, Type attributeType)
        {
            return Attribute.GetCustomAttribute(p, attributeType, true) != null;
        }

        public static List<Model> ConvertAssembly(Assembly a)
        {
            var models = new List<Model>();

            foreach (var type in a.GetTypes())
            {
                if (checkAttribute(type, typeof(ModelAttribute)))
                {
                    models.Add(Convert(type));
                }
            }
            return models;
        }


    }
}
