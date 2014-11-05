using System;
using System.Collections.Generic;
using Ext.Direct;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NHibernate.Criterion;
using Kdn.Direct;
using Transport.Models;

namespace Transport.Direct
{
   public partial class Direct:Kdn.Direct.Direct
    {

       [DirectMethod]
       [ParseAsJson]
       public DataSerializer RequestTaskVehicle(JObject o)
       {
           JToken p;

           var date = o["date"].Value<DateTime>();

           var hash = new Dictionary<int, VehicleOrderDTO>();

           var list = new List<VehicleOrderDTO>();

           try
           {
               list = db.Fetch<Customer, v_Driver, VehicleOrderDTO, VehicleOrderDTO>(
                   (customer,driver, x) =>
                   {
                       if(customer.CustomerId!=0) x.Customer = customer;
                       if (driver.DriverId != 0) x.Driver = driver;

                       if (x.VehicleOrderId != null)
                           hash.Add(x.VehicleOrderId.Value, x);
                       return x;
                   },
                   ";exec VehicleOrderSelect @0",
                   date
                   );
           }
           catch (Exception ex)
           {
               throw ex;
           }

           /*
           var requests = db.Fetch<VehicleOrderRequests>(";exec VehicleOrderRequestsSelect @0",date);
                      
           foreach (var r in requests)
           {
               if (hash.ContainsKey(r.VehicleOrderId))
               hash[r.VehicleOrderId].Requests.Add(v_Request.Find(r.RequestId));
           }*/
           
          return new DataSerializer(list);

       }

       [DirectMethod]
       [ParseAsJson]
       public DataSerializer VehicleOrderUpdate(JObject o)
       {

          var a = getModels(o);
          var list = new List<object>();
           /*foreach(var _a in a){
               var dto = JsonConvert.DeserializeObject<VehicleOrderDTO>(o["data"].ToString());
               VehicleOrder order;
               if (dto.VehicleOrderId == null)
               {
                   order = new VehicleOrder()
                   {
                       VehicleId = dto.VehicleId,
                       OrderDate = dto.OrderDate
                   };
                   order.SaveAndFlush();
                   dto.VehicleOrderId = order.VehicleOrderId;
               }
               else
               {
                   order = VehicleOrder.Find(dto.VehicleOrderId.Value);
               }

               if (dto.Customer == null && dto.Requests.Count == 0)
               {
                   //dto.BusinessTripDate = null;
                   dto.VehicleOrderId = null;
                   order.DeleteAndFlush();
               }
               else
               {
                   order.BusinessTripDate = dto.BusinessTripDate;
                   order.Customer = dto.Customer;
                   order.Requests = new List<int>();
                   order.Driver = dto.Driver;
                   order.SaveAndFlush();

                   var duplicate = new List<v_Request>();
                   
                   
                   foreach(var r in dto.Requests){
                       if (!order.Requests.Contains(r.RequestId))
                       {
                           order.Requests.Add(r.RequestId);                           
                       }
                       else
                       {
                           duplicate.Add(r);
                       }
                   }

                   foreach (var d in duplicate)
                   {
                       dto.Requests.Remove(d);
                   }

               }
               
               list.Add(dto);
           }
                     */
           return new DataSerializer(list);
       }

       /*
      [DirectMethod]
      [ParseAsJson]
       public DataSerializer RequestRead(JObject o)
       {
           JToken p;           
           
          var start = o["start"].Value<int>();
          var limit = o["limit"].Value<int>();
          
          var db = new PetaPoco.Database("db2");
           var rez = db.Query<RequestDTO>(@"
            select 
	            r.Status,
	            r.UserFio,
	            r.RequestId,
	            r.RequestDate,
	            r.PublishDate,
                c.CustomerName,
	            case when rc.RequestId is not null then 'Кран' when rf.RequestId is not null then 'Грузовой' else 'Пассажирский' end RequestType
            from Request r
            left join RequestCrane rc on rc.RequestId = r.RequestId
            left join RequestFreight rf on rf.RequestId = r.RequestId
            left join RequestPassengers rp on rp.RequestId = r.RequestId
            left join Customer c on c.CustomerId = r.CustomerId
            where r.IsDeleted = 0 order by r.RequestId desc
           ");
           return new DataSerializer(new List<RequestDTO>(rez));
       }*/


      [DirectMethod]
      [ParseAsJson]
      public DataSerializer RequestLoad(JObject o)
      {
          var id = o["id"].Value<int>();
          var request = Request.Find(id);

          return new DataSerializer(new List<object>() { request});
      }


      [DirectMethod]
      [ParseAsJson]
      public DataSerializer RefreshRequests(JObject o)
      {
          var list = new List<object>();
          var requests = o["requests"].Value<JArray>();

              foreach (var r in requests)
              {
                  var obj = JsonConvert.DeserializeObject<v_Request>(r.ToString());
                  obj.Refresh();
                  list.Add(obj);
              }    
                
          return new DataSerializer(list);
      }


      [DirectMethod]
      [ParseAsJson]
      public DataSerializer ConfirmRequests(JObject o)
      {
          var a = getModels(o);
          var isAccept = o["isAccept"].Value<bool>();
          var message = o["message"].Value<string>();

          var list = new List<object>();

          foreach (var _a in a)
          {
              var dto = JsonConvert.DeserializeObject<v_Request>(_a.ToString());
              var request = Request.Find(dto.RequestId);

              var status = isAccept ? RequestStatus.Confirm : RequestStatus.Return;

              request.Status = status;
              request.Events.Add(new RequestEvent()
              {
                  EventDate= DateTime.Now,
                  Message=message,
                  Status=status,
                  Request=request
              });

              request.SaveAndFlush();

              dto.Status = status;

              //dto.Refresh();

              list.Add(dto);
          }

          return new DataSerializer(list);
      }



      [DirectMethod]
      [ParseAsJson]
      public DataSerializer CreateOrders(JObject o)
      {
          var date = o["date"].Value<DateTime>();
          VehicleOrder.Create(date);
          return new DataSerializer(new List<object>());
      }

      [DirectMethod]
      [ParseAsJson]
      public DataSerializer OrderRead(JObject o)
      {
          var date = o["date"].Value<DateTime>();

          var orders = VehicleOrder.FindAll(Expression.Where<VehicleOrder>(x => x.DepartureDate >= date && x.DepartureDate <= date.AddDays(1)));
          
          return new DataSerializer(orders);
      }




    }

}
