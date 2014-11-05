using System;
using System.Collections;
using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Castle.ActiveRecord;
using NHibernate;
using NHibernate.Criterion;
using Kdn.Direct;
using PetaPoco;


namespace Transport.Direct
{
    public partial class Direct
    {

        private PetaPoco.Database db;

        public Direct()
        {
            db = new Database("db2");
        }


        protected override Type getModelType(JObject o)
        {
            Type t = base.getModelType(o);

            if (t == null)
            {
                var TypeModel = o["typeName"].Value<string>();
                t = Type.GetType(TypeModel);
            }
            return t;
        }

        public override DataSerializer Read(JObject o)
        {

            Type modelType = getModelType(o);
            IList records;
            int recordsCount = 0;

            var c = DetachedCriteria.For(modelType);
            c.SetResultTransformer(CriteriaSpecification.DistinctRootEntity);


            JToken token;

            //Если в запросе присутствует id то выбираем запись по ключу
            if (o.TryGetValue("id", out token))
            {
                records = new List<object>() {ActiveRecordMediator.FindByPrimaryKey(modelType, token.Value<int>())};
                return new DataSerializer(records);
            }

            //Если класс может относится к разным подразделениям, то учитываем это в запросе
            if (modelType.GetInterface("IOwnered") != null)
            {
                var owner = o["owner"].Value<int>();
                Action<int> defaultOwnered = x => c.Add(Restrictions.Eq("OwnerId", x));
                var methodName = "readWithOwner";

                if (modelType.GetMethod(methodName) == null)
                {
                    defaultOwnered(owner);
                }
                else
                {
                    modelType.GetMethod(methodName).Invoke(Activator.CreateInstance(modelType), new object[] {c, owner});
                }
            }

            //Если осуществляется фильтрация, то устонавливаем фильтр
            if (o.TryGetValue("filter", out token))
            {
                var filter = (JObject) token;

                if (modelType.GetMethod("Filter") != null)
                {
                    modelType.GetMethod("Filter").Invoke(null, new object[] {c, filter});
                }
                else
                {
                    foreach (var f in filter)
                    {
                        if (modelType.GetProperty(f.Key) != null)
                        {
                            object filterValue;

                            var _type = modelType.GetProperty(f.Key).PropertyType;
                            filterValue = JsonConvert.DeserializeObject(f.Value.ToString(), _type);

                            if (filterValue != null)
                            {

                                if (filterValue is string)
                                {
                                    c.Add(
                                        Restrictions.Like(f.Key, filterValue.ToString(), MatchMode.Anywhere)
                                            .IgnoreCase());
                                }
                                else if (filterValue is DateTime)
                                {
                                    var dt = (DateTime) filterValue;
                                    c.Add(Restrictions.Between(f.Key, dt, dt.AddDays(1).AddMinutes(-1)));
                                }
                                else
                                {
                                    c.Add(Restrictions.Eq(f.Key, filterValue));
                                }
                            }

                        }
                    }
                }
            }

            //Если задана постоянная фильтрация на store
            if (o.TryGetValue("sqlFilter", out token) && token.Value<string>().Trim() != "")
            {
                c.Add(Expression.Sql(token.Value<string>()));
            }



            //Если постраничный запрос, то нужно в начале выбрать количество записей
            if (o.TryGetValue("start", out token))
            {

                recordsCount = ActiveRecordMediator.Count(modelType, CriteriaTransformer.Clone(c));

                c.SetFirstResult(token.Value<int>());

                if (o.TryGetValue("limit", out token))
                {
                    c.SetMaxResults(token.Value<int>());
                }

            }

            if (o.TryGetValue("sort", out token))
            {

                if (modelType.GetMethod("Sort") != null)
                {
                    modelType.GetMethod("Sort").Invoke(null, new object[] {c, o});
                }
                else
                {
                    var sortField = token.Value<string>();
                    c.AddOrder(o["dir"].Value<string>() == "ASC" ? Order.Asc(sortField) : Order.Desc(sortField));
                }


            }

            records = ActiveRecordMediator.FindAll(modelType, c);

            return new DataSerializer(records, recordsCount);

        }

        public override DataSerializer Create(JObject o)
        {
            var type = getModelType(o);
            var isOwnered = type.GetInterface("IOwnered") != null;
            var owner = 0;
            JArray models = getModels(o);
            var rezult = new List<object>();


            if (isOwnered)
            {
                owner = o["owner"].Value<int>();
            }


            foreach (var model in models)
            {
                var instance = JsonConvert.DeserializeObject(model.ToString(), type);
                if (isOwnered)
                {
                    var io = (Interfaces.IOwnered) instance;
                    io.setOwner(owner);
                }

                var ar = instance as ActiveRecordBase;
                ar.SaveAndFlush();
                rezult.Add(instance);
            }

            return new DataSerializer(rezult);
        }


    }
}
