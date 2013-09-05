using System;
using System.Web;
using System.Reflection;
using System.Collections;
using System.Collections.Generic;
using Ext.Direct;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Castle.ActiveRecord;
using Castle.ActiveRecord.Queries;
using Kdn.CommonModels;
using NHibernate;
using NHibernate.Hql;
using NHibernate.Criterion.Lambda;
using NHibernate.Criterion;
using Kdn.Direct;
using Transport.Models;


namespace Transport.Direct
{
   public partial class Direct:Kdn.Direct.Direct
    {

       [DirectMethod]
       [ParseAsJson]
       public DataSerializer WaybillTaskCreate(JObject o)
       {
           JArray models = getModels(o);
           List<object> rezult = new List<object>();
          
           foreach (JObject model in models)
           {
               var instance = JsonConvert.DeserializeObject<WaybillTask>(model.ToString());
                             
               instance.Save();
                                                          
               instance.CheckDefaultIncreases();
               instance.CheckWinter();
               rezult.Add(instance);
           }

           return new DataSerializer(rezult);
       }


       [DirectMethod]
       [ParseAsJson]
       public DataSerializer WaybillTaskIncreasesUpdate(JObject o)
       {

           List<object> rezult = new List<object>();
           JArray models = getModels(o);

           foreach (JObject model in models)
           {
               var task = JsonConvert.DeserializeObject<WaybillTask>(model.ToString());
               task.Save();

               var waybillstate = new ScalarQuery<short>(typeof(Waybill),
                  @" SELECT w.WaybillState FROM Waybill as w
                     WHERE w.WaybillId = ?",
                  task.WaybillId
                  ).Execute();

               if (waybillstate == 1)
               {
                   var incr = WaybillTaskIncrease.FindAll(Expression.Where<WaybillTaskIncrease>(x => x.key.TaskId == task.TaskId));

                   //Убрать все надбавки ??

                   var increases = task.TaskIncreases;
                   var increaseList = new List<WaybillTaskIncrease>();

                   if (increases != null)
                   {
                       foreach (var i in increases)
                       {
                           increaseList.Add(i);
                       }
                   }

                   foreach (var i in incr)
                   {
                       if (!increaseList.Contains(i))
                       {
                           i.DeleteAndFlush();
                       }
                   }

                   task.Consumption = task.CalculateConsumption();
                   task.Save();

               }

               rezult.Add(task);
           }
           return new DataSerializer(rezult);

       }


       [DirectMethod]
       [ParseAsJson]
       public DataSerializer WaybillTaskUpdate(JObject o) {

          List<object> rezult = new List<object>();
          JArray models = getModels(o);

          foreach (JObject model in models)
          {
             var task = JsonConvert.DeserializeObject<WaybillTask>(model.ToString());
             task.Save();

             var waybillstate = new ScalarQuery<short>(typeof(Waybill),
                @" SELECT w.WaybillState FROM Waybill as w
                     WHERE w.WaybillId = ?",
                task.WaybillId
                ).Execute();

             if (waybillstate == 1)
             {

                var incr = WaybillTaskIncrease.FindAll(Expression.Where<WaybillTaskIncrease>(x => x.key.TaskId == task.TaskId));

                //Убрать все надбавки ??

                var increases = task.TaskIncreases;
                var increaseList = new List<WaybillTaskIncrease>();

                if (increases != null)
                {
                   foreach (var i in increases)
                   {
                      increaseList.Add(i);
                   }
                }

                foreach (var i in incr)
                {
                   if (!increaseList.Contains(i))
                   {
                      i.DeleteAndFlush();
                   }
                }


                task.CheckDefaultIncreases();
                task.CheckWinter();
                task.Consumption = task.CalculateConsumption();
                task.Save();

             }

             rezult.Add(task);
          }
          return new DataSerializer(rezult);
       }
           


    }
}
