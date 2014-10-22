using System.Collections.Generic;
using Ext.Direct;
using Newtonsoft.Json.Linq;
using Castle.ActiveRecord.Queries;
using NHibernate.Criterion;
using Kdn.Direct;
using Transport.Models;


namespace Transport.Direct
{
   public partial class Direct
    {

       [DirectMethod]
       [ParseAsJson]
       public DataSerializer WaybillTaskCreate(JObject o)
       {
           var rezult = new List<object>();
          
           foreach (var task in GetModels<WaybillTask>(o) )
           {
               task.Save();
               task.CheckDefaultIncreases();
               task.CheckWinter();
               rezult.Add(task);
           }

           return new DataSerializer(rezult);
       }


       [DirectMethod]
       [ParseAsJson]
       public DataSerializer WaybillTaskIncreasesUpdate(JObject o)
       {
           var rezult = new List<object>();

           foreach (var task in GetModels<WaybillTask>(o))
           {
               task.Save();

               var waybillstate = new ScalarQuery<short>(typeof(Waybill),
                  @" SELECT w.WaybillState FROM Waybill as w
                     WHERE w.WaybillId = ?",
                  task.WaybillId
                  ).Execute();

               if (waybillstate == 1)
               {
                   var incr = WaybillTaskIncrease.FindAll(Restrictions.Where<WaybillTaskIncrease>(x => x.key.TaskId == task.TaskId));

                   //Убрать все надбавки ??

                   var increases = task.TaskIncreases;
                   var increaseList = new List<WaybillTaskIncrease>();

                   if (increases != null)
                   {
                       increaseList.AddRange(increases);
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

          var rezult = new List<object>();

          foreach (var task in GetModels<WaybillTask>(o))
          {
             task.Save();

             var waybillstate = new ScalarQuery<short>(typeof(Waybill),
                @" SELECT w.WaybillState FROM Waybill as w
                     WHERE w.WaybillId = ?",
                task.WaybillId
                ).Execute();

             if (waybillstate == 1)
             {
                 if (task.Temperature == null)
                 {
                     task.CheckDefaultIncreases();
                     task.CheckWinter();
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
       public DataSerializer WaybillTaskConsumptionUpdate(JObject o)
       {
          var rezult = new List<object>();

          foreach (var task in GetModels<WaybillTask>(o))
          {
             var waybillstate = new ScalarQuery<short>(typeof(Waybill),
                @" SELECT w.WaybillState FROM Waybill as w
                     WHERE w.WaybillId = ?",
                task.WaybillId
                ).Execute();

             if (waybillstate == 1)
             {
                 task.isTruck = false;
                 task.Save();
                 task.WorkAmount = task.CalculateAmount();
             }

             rezult.Add(task);
          }
          return new DataSerializer(rezult);
       }


       [DirectMethod]
       [ParseAsJson]
       public DataSerializer WaybillTaskNormUpdate(JObject o)
       {

         var rezult = new List<object>();

           foreach (var task in GetModels<WaybillTask>(o))
           {
               task.Save();

               var waybillstate = new ScalarQuery<short>(typeof(Waybill),
                  @" SELECT w.WaybillState FROM Waybill as w
                     WHERE w.WaybillId = ?",
                  task.WaybillId
                  ).Execute();

               if (waybillstate == 1)
               {

                   var incr = WaybillTaskIncrease.FindAll(Restrictions.Where<WaybillTaskIncrease>(x => x.key.TaskId == task.TaskId));

                   //Убрать все надбавки ??

                   var increases = task.TaskIncreases;
                   var increaseList = new List<WaybillTaskIncrease>();

                   if (increases != null)
                   {
                       increaseList.AddRange(increases);
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


       [DirectMethod]
       [ParseAsJson]
       public DataSerializer WaybillTaskDateUpdate(JObject o)
       {
           var rezult = new List<object>();

           foreach (var task in GetModels<WaybillTask>(o))
           {
               task.Save();

               var waybillstate = new ScalarQuery<short>(typeof(Waybill),
                  @" SELECT w.WaybillState FROM Waybill as w
                     WHERE w.WaybillId = ?",
                  task.WaybillId
                  ).Execute();

               if (waybillstate == 1)
               {
                   task.CheckWinter();
                   task.CheckDefaultIncreases();
                   task.Consumption = task.CalculateConsumption();
                   task.Save();
               }
               rezult.Add(task);
           }
           return new DataSerializer(rezult);
       }


    }
}
