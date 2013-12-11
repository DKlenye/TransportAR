using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using Castle.ActiveRecord.Queries;
using System.Text;
using Kdn.Ext.Attributes;
using Kdn.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NHibernate.Criterion;
using Iesi.Collections.Generic;

namespace Transport.Models {
   /*
    * Класс используется для того, чтобы Hibernate не загружал лишнюю информацию из базы
    * в классах, использующих ссылку на транспорт 
    */
   [Model,ActiveRecord("Vehicle",DiscriminatorColumn="DSC",DiscriminatorType="short",DiscriminatorValue="0")]
   public class BaseVehicle : ActiveRecordBase<BaseVehicle>, Interfaces.IOwnered {
      [IdProperty,PrimaryKey]
      public int VehicleId { get; set; }
      [Property]
      public string Model { get; set; }
      [Property]
      public int GarageNumber { get; set; }
      [Property]
      public string RegistrationNumber { get; set; }
      [Property]
      public string InventoryNumber { get; set; }
      [Property]
      public int? DepartmentId { get; set; }
      [Property]
      public int? ColumnId { get; set; }
       [Property]
      public decimal? CapacityTonns { get; set; }
       [Property]
       public DateTime? WriteOffDate { get; set; }
      [Property]
      public int? BodyTypeId { get; set; }
       [Property]
      public int? GroupRequestId { get; set; }


      [Property(Index="idx_ReplicationVehicle")]
      public int? ReplicationId { get; set; }
      [Property]
      public ReplicationSource? ReplicationSource { get; set; }
      
      #region Owner
      [Property, AllowBlank]
      public int OwnerId { get; set; }
      public void setOwner(int OwnerId) {
         this.OwnerId = OwnerId;
      }
      #endregion
   }
   
   [Model, ActiveRecord(DiscriminatorValue = "1")]
   public class Car : BaseVehicle {

      [AllowBlank, BelongsTo("CustomerId")]
      public Customer Customer { get; set; }
      [Property]
      public int? DriverId { get; set; }

      #region График работы

      [Property]
      public int? ScheduleId { get; set; }
      [AllowBlank, Property(Length = 5)]
      public string StartWork { get; set; }
      [AllowBlank, Property(Length = 5)]
      public string EndWork { get; set; }
      [Property]
      public int? TrailerId { get; set; }
      [Property]
      public int? WaybillTypeId { get; set; }


      #endregion

   }

   [Model, ActiveRecord(DiscriminatorValue = "2")]
   public class Trailer : BaseVehicle { }
   






   [ActiveRecord(DiscriminatorColumn="DSC",DiscriminatorType="short",DiscriminatorValue="0")]
   public abstract class Vehicle : ActiveRecordBase<Vehicle>, Interfaces.IOwnered {
      [IdProperty, PrimaryKey]
      public int VehicleId { get; set; }

      #region Owner
      [Property,AllowBlank]
      public int OwnerId { get; set; }
      public void setOwner(int OwnerId) {
         this.OwnerId = OwnerId;
      }
      #endregion

      [Property]
      public int? DepartmentId { get; set; }
      [Property]
      public int? ColumnId { get; set; }
      
      [Property(Length=40)]
      public string Model { get; set; }

      [AllowBlank,Property(Length=150)]
      public string FullModel { get; set; }

      [AllowBlank,Property(Length=150)]
      public string FondModel { get; set; }

      [Property]
      public int GarageNumber { get; set; }

      [Property,AllowBlank]
      public string RegistrationNumber { get; set; }

      [Property,AllowBlank]
      public string InventoryNumber { get; set; }
      [Property]
      public int? MakeYear { get; set; }

      [Property,AllowBlank]
      public string ServiceDocNumber { get; set; }


      #region Группы

      [Property]
      public int? GroupAccId { get; set; } //устаревшая (убрать после доработки АЗС)
      [Property]
      public int? RefuellingGroupId { get; set; } //устаревшая (убрать после доработки АЗС)
      
      [Property]
      public int? AccGroupId { get; set; } //Актуальная

       [Property]
      public int? GroupRequestId { get; set; }

      #endregion


      
      [Property]
      public DateTime? InputDate { get; set; }
      [Property]
      public DateTime? WriteOffDate { get; set; }

      [AllowBlank,Property]
      public string PolymirSHU { get; set; }

      #region Кузов
      [Property,AllowBlank]
      public string BodyNumber { get; set; }
      
      [Property,AllowBlank]
      public string ChassisNumber { get; set; }
      
      [Property]
      public int? BodyTypeId { get; set; }

      [Property, AllowBlank]
      public string Color { get; set; }
      
      #endregion

      #region Габариты
      [Property]
      public decimal? Width { get; set; }
      [Property]
      public decimal? Length { get; set; }
      [Property]
      public decimal? Height { get; set; }
      #endregion

      #region Свидетельство о регистрации
      [Property,AllowBlank]
      public string RegSertificate { get; set; }
      [Property]
      public DateTime? RegEnd { get; set; }
      #endregion

      #region Масса и грузоподъёмность
      [Property]
      public decimal? SelfMass { get; set; }
      [Property]
      public decimal? FullMass { get; set; }
      [Property]
      public decimal? CapacityTonns { get; set; }
      #endregion

      [Property]
      public int? ReplicationId { get; set; }
      [Property]
      public ReplicationSource? ReplicationSource { get; set; }

   }

   [Model,ActiveRecord(DiscriminatorValue="1")]
   public class FullCar : Vehicle {

      [AllowBlank,BelongsTo("DriverId")]
      public Driver ResponsibleDriver { get; set; }

      [AllowBlank, BelongsTo("CustomerId")]
      public Customer Customer { get; set; }
      
      [Property]
      public int? TrailerId { get; set; }

      [Property]
      public int? WaybillTypeId { get; set; }

      [AllowBlank,Property]
      public string Category { get; set; }

      [AllowBlank, Property(Length=30)]
      public string CabinNumber { get; set; }
      
      [Property]
      public int? PackageTypeId { get; set; }

      [Property]
      public decimal? TkmNorm { get; set; }

      #region Двигатель
      [AllowBlank, Property]
      public string EngineNumber { get; set; }
      
      [Property]
      public int? EngineTypeId { get; set; }
      [Property]
      public int? EcologyClassId { get; set; }
      
      [Property]
      public short? EngineVolume { get; set; }
      
      [Property]
      public decimal? EnginePower { get; set; }

      [AllowBlank,Property]
      public string EngineModel { get; set; }
      
      #endregion

      #region Заправочные объёмы
      [Property]
      public decimal? FuelVolume { get; set; }
      [Property]
      public decimal? CoolantVolume { get; set; }
      [Property]
      public decimal? EngineOilVolume { get; set; }
      [Property]
      public decimal? HydraulicOilVolume { get; set; }
      #endregion

      #region Кол-во пассажиров
      [Property]
      public decimal? CapacityPassengers { get; set; }
      #endregion

      #region График работы

      [Property]
      public int? ScheduleId { get; set; }

      [AllowBlank,Property(Length=5)]
      public string StartWork { get; set; }
      [AllowBlank, Property(Length = 5)]
      public string EndWork { get; set; }


      #endregion

      [AllowBlank,Property(Length=10)]
      public string CostCode { get; set; }

      [AllowBlank,Property(Length=50)]
      public string Disposal { get; set; }
       
       [AllowBlank,Property(Length=50)]
       public string ModelHeater { get; set; }

       public JObject Info()
      {
         var obj = JObject.FromObject(this);

         var norms = Norm.FindAll(Expression.Where<Norm>(x => x.Car.VehicleId == this.VehicleId));

         obj["Norms"] = JArray.FromObject(norms);
         obj["Drivers"] = JArray.FromObject(VehicleDriver.FindAll(Expression.Where<VehicleDriver>(x => x.Car.VehicleId == this.VehicleId)));
         obj["Increases"] = JArray.FromObject(VehicleIncrease.FindAll(Expression.Where<VehicleDriver>(x => x.Car.VehicleId == this.VehicleId)));

         var fuels = new List<int>();
         var counters = new List<int>();

         foreach (var norm in norms)
         {
            foreach (var fuel in norm.NormFuels)
            {
               if (!fuels.Contains(fuel)) fuels.Add(fuel);
            }

            if (norm.CounterId != null && !counters.Contains(norm.CounterId.Value))
            {
               counters.Add(norm.CounterId.Value);
            }
         }

         obj["Fuels"] = JArray.FromObject(fuels);
         obj["Counters"] = JArray.FromObject(counters);
         
         return obj;
      }
      public static FullCar GetByWaybill(int WaybillId)
      {
         ScalarQuery<int> q = new ScalarQuery<int>(typeof(Waybill),"select w.Car.VehicleId from Waybill w where w.WaybillId = ?", WaybillId);
         return (FullCar)FullCar.Find(q.Execute());
      }

   }

   [Model,ActiveRecord(DiscriminatorValue="2")]
   public class FullTrailer : Vehicle { }


   #region NHibernate relation

   [ActiveRecord("Vehicle")]
   public class relation_Vehicle {
      [PrimaryKey]
      public int VehicleId { get; set; }
      [BelongsTo("BodyTypeId")]
      public BodyType BodyType { get; set; }
      [BelongsTo("DepartmentId")]
      public Department Department { get; set; }
      [BelongsTo("ColumnId")]
      public TransportColumn Column { get; set; }
      [BelongsTo("WaybillTypeId")]
      public WaybillType Type { get; set; }
      [BelongsTo("OwnerId")]
      public TransportOwner Owner { get; set; }
   }

   #endregion




}
