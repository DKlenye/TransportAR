using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using Castle.ActiveRecord.Queries;
using System.Text;
using Kdn.Ext.Attributes;
using NHibernate.Hql;
using NHibernate.Criterion;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Transport.Models {


   public enum WaybillState{
      Open,DispClose,AccClose
   }

   [Model, ActiveRecord]
   public class Waybill : ActiveRecordBase<Waybill>,Interfaces.IOwnered {

      [IdProperty, PrimaryKey]
      public int WaybillId { get; set; }
      [BelongsTo("VehicleId",UniqueKey="VehiclePosition_idx")]
      public BaseVehicle Car { get; set; }
      [Property(UniqueKey="VehiclePosition_idx")]
      public int Position { get; set; }

      [BelongsTo("DriverId")]
      public Driver ResponsibleDriver { get; set; }

      [Property]
      public DateTime DepartureDate { get; set; }
      [Property]
      public DateTime ReturnDate { get; set; }

      [AllowBlank,Property(Length=20)]
      public string FormNumber { get; set; }
      [AllowBlank,Property(Length=5)]
      public string FormSerial { get; set; }

      [AllowBlank, Property(Update = false, Insert = false)]
      public int? WaybillNumber { get; set; }
      
      [Property]
      public int WaybillTypeId { get; set; }

      [Property]
      public int? PackageId { get; set; }

      [Property]
      public int? ScheduleId { get; set; }
      [Property]
      public short Shift { get; set; }

      [Property]
      public string Way { get; set; }

      [Property]
      public DateTime? UnloadDate { get; set; }

      [Property]
      public int? TrailerId { get; set; }

      //Состояние путевого листа
      [Property]
      public short? WaybillState { get; set; }

      [Property]
      public int? AccPeriod { get; set; }

      [Property]
      public int? UserClose { get; set; }
      
      [Property]
      public DateTime? WhenClose { get; set; }

            
      #region Owner
      public void setOwner(int OwnerId) { }
      public void readWithOwner(DetachedCriteria c, int owner) {
         c.CreateAlias("Car", "Car").Add(Expression.Eq("Car.OwnerId", owner));
      }
      #endregion


       [Property(Index="idx_ReplicationId",Length=30,Update=false,Insert=false)]
       public string ReplicationId { get; set; }
       [Property(Update = false, Insert = false)]
       public ReplicationSource? ReplicationSource { get; set; }



      //Установка позиции путевого листа
      public void SetPosition() {
         //Если путёвка вставляется между существующими путёвками, то NewPosition будет иметь значение
         int NewPosition = GetMinPosition(Car.VehicleId,DepartureDate);
         int OldPosition = Position;
         bool maxFlag = false;

         //Если NewPosition=0, то это означает, что путёвка будет устанавливаться в последнюю позицию,
         // т.е. дата путевого листа максимальная и она должна быть последней в списке
         if( NewPosition == 0 ) {
            NewPosition = GetMaxPosition(Car.VehicleId);
            //устанавливаем флаг , того что путёвка максимальная по позиции
            maxFlag = true;
         }

         if( OldPosition < NewPosition ) {
            --NewPosition;
            if( OldPosition < NewPosition ) {

               Position = -1;
               Update();

               DecrementPosition(Car.VehicleId, OldPosition, NewPosition);
               
               Position = NewPosition;
               Update();
            }
         }
         else if( OldPosition > NewPosition ) {

            Position = -1;
            Update();

            IncrementPosition(Car.VehicleId, NewPosition, OldPosition);

            Position = NewPosition;
            Update();
         }

      }

      public static void IncrementPosition(int VehicleId, int Start, int End) { SetWaybillsPosition("+", VehicleId, Start, End); }
      public static void DecrementPosition(int VehicleId, int Start, int End) { SetWaybillsPosition("-", VehicleId, Start, End); }
      private static void SetWaybillsPosition(string operation, int VehicleId, int Start, int End) {
         var query = String.Format(
            @" UPDATE Waybill SET Position = Position{0}1 WHERE VehicleId={1} AND Position BETWEEN {2} AND {3} ",
            operation,
            VehicleId,
            Start,
            End
         );

         var s = ActiveRecordMediator.GetSessionFactoryHolder().CreateSession(typeof(Waybill));
         s.CreateQuery(query).ExecuteUpdate();
      }

      public static Waybill FirstOpen(BaseVehicle Vehicle) { 
         return FirstOpen(Vehicle.VehicleId);
      }
      public static Waybill FirstOpen(int VehicleId){

        return FindFirst(
            Asc("Position"),
            Expression.Where<Waybill>(
               x=>
                  x.Car.VehicleId==VehicleId &&
                  x.WaybillState==1
            )
         );

      }

      public static Waybill LastClose(int VehicleId) {

         return FindFirst(
            Desc("Position"),
            Expression.Where<Waybill>(
               x =>
                  x.Car.VehicleId == VehicleId &&
                  x.WaybillState > 1
            )
         );

      }

      public Waybill Next() {

         return FindFirst(
            Asc("Position"),
            Expression.Where<Waybill>(
               x=>
                  x.Position>this.Position &&
                  x.Car.VehicleId==this.Car.VehicleId
            )
         );

      }
      public Waybill Prev() {

         return FindFirst(
            Desc("Position"),
            Expression.Where<Waybill>(
               x =>
                  x.Position < this.Position &&
                  x.Car.VehicleId == this.Car.VehicleId
            )
         );

      }
      
      public bool isLast()
      {
         return !Exists(Expression.Where<Waybill>(x => x.Position > Position && x.Car==Car));
      }

      public bool isCurrent() {
         return WaybillState==1 && !Exists(Expression.Where<Waybill>(x => x.Position < Position && x.Car == Car && x.WaybillState==1));
      }


      //Поиск максимальной позиции в путевых листах
      public static int GetMaxPosition(int VehicleId) {

         var query = new ScalarQuery<int>(typeof(Waybill),
            @" SELECT max(Position) 
               FROM Waybill
               WHERE VehicleId = ?",
            VehicleId);
         int position = query.Execute();
         return ++position;   
    
      }

      //Поиск минимальной позиции в путёвках с большей датой
      public static int GetMinPosition(int VehicleId,DateTime DepartureDate) {

         var query = new ScalarQuery<int>(typeof(Waybill),
            @" SELECT min(Position)
               FROM Waybill
               WHERE VehicleId = ? AND DepartureDate > ?",
            VehicleId,
            DepartureDate
         );
         return query.Execute();

      }




      public JObject FullInfo()
      {
         string[] details = new string[] {
            "WaybillCounter",
            "WaybillFuelRemain",
            "WaybillDriver",
            "WaybillTask",
            "VehicleRefuelling"
         };
         JObject obj = Info(details);

         obj["isLast"] = isLast();
         obj["isCurrent"] = isCurrent();
         return obj;
      }

            
      public JObject Info( params string [] details ) {
         JObject obj = JObject.FromObject(this);         

         Action<string> action = delegate(string s){
            var type = Type.GetType("Transport.Models."+s);

            if (type.GetMethod("findByWaybillId") != null)
            {
               var list = type.GetMethod("findByWaybillId").Invoke(null, new object[] { WaybillId });
               JArray a = JArray.FromObject(list);
               obj.Add(s, a);
            }
            else
            {
               var list = ActiveRecordMediator.FindAllByProperty(type, "WaybillId", WaybillId);
               JArray a = JArray.FromObject(list);
               obj.Add(s, a);
            }


            
         };

         foreach( var detail in details ) action(detail);
         return obj;

      }


      public void SetRemains()
      {

         var destRemains = WaybillFuelRemain.findByWaybillId(WaybillId);
         var destCounters = WaybillCounter.findByWaybillId(WaybillId);

         var remainsMap = new Dictionary<int, WaybillFuelRemain>();
         var countersMap = new Dictionary<int, WaybillCounter>();

         foreach (var rem in destRemains)
         {
            remainsMap.Add(rem.FuelId, rem);
         }

         foreach (var cou in destCounters)
         {
            countersMap.Add(cou.CounterId, cou);
         }
                  
         var norms = Norm.FindAll(Expression.Where<Norm>(x => x.Car == this.Car));

         foreach (var norm in norms)
         {
            foreach (var fuel in norm.NormFuels)
            {
               if (!remainsMap.ContainsKey(fuel))
               {
                  var remain = new WaybillFuelRemain()
                  {
                     WaybillId = WaybillId,
                     FuelId = fuel,
                     DepartureRemain = 0
                  };

                  remainsMap.Add(fuel,remain);
                  remain.SaveAndFlush();
               }
            }

            if (norm.CounterId != null)
            {
               if (!countersMap.ContainsKey(norm.CounterId.Value))
               {
                  var counter = new WaybillCounter()
                  {
                     WaybillId = WaybillId,
                     CounterId = norm.CounterId.Value,
                     Departure = 0,
                     isBroken = false
                  };
                  countersMap.Add(norm.CounterId.Value, counter);
                  counter.SaveAndFlush();
               }
            }
         }



      }

      public void MoveRemains(Waybill targetWaybill)
      {
         MoveRemains(targetWaybill, false);
      }

      public void MoveRemains(Waybill targetWaybill,bool setEmpty) {

         var destRemains = WaybillFuelRemain.findByWaybillId(WaybillId);
         var destCounters = WaybillCounter.findByWaybillId(WaybillId);

         var targetRemains = WaybillFuelRemain.findByWaybillId(targetWaybill.WaybillId);
         var targetCounters = WaybillCounter.findByWaybillId(targetWaybill.WaybillId);

         var remainsMap = new Dictionary<int, WaybillFuelRemain>();
         var countersMap = new Dictionary<int, WaybillCounter>();

         foreach( var rem in targetRemains ) {
            remainsMap.Add(rem.FuelId, rem);
         }

         foreach( var cou in targetCounters ) {
            countersMap.Add(cou.CounterId, cou);
         }

         foreach( var rem in destRemains ) {

            if( !remainsMap.ContainsKey(rem.FuelId) ) {

               new WaybillFuelRemain(){
                  WaybillId=targetWaybill.WaybillId,
                  FuelId=rem.FuelId,
                  DepartureRemain = setEmpty?null:rem.ReturnRemain
               }.SaveAndFlush();
            }
            else {
               remainsMap[rem.FuelId].DepartureRemain = setEmpty ? null : rem.ReturnRemain;
               remainsMap[rem.FuelId].SaveAndFlush();
            }
         }

         foreach( var cou in destCounters ) {

            if( !countersMap.ContainsKey(cou.CounterId) ) {

               new WaybillCounter() {
                  WaybillId = targetWaybill.WaybillId,
                  CounterId = cou.CounterId,
                  Departure = setEmpty ? null : cou.Return,
                  isBroken=false
               }.SaveAndFlush();
            }
            else {
               countersMap[cou.CounterId].Departure = setEmpty ? null : cou.Return;
               countersMap[cou.CounterId].SaveAndFlush();
            }
         }
         

      }

      public void DispClose() {
         var next = Next();
         if( next != null) {
            MoveRemains(next);
         }
         this.WaybillState = 2;
         this.UserClose = ((User)User.GetCurrent(typeof(User))).UserId;
         this.WhenClose = DateTime.Now;
         SaveAndFlush();
      }


      public void DispOpen() {
         var nextWaybills = Waybill.FindAll(Expression.Where<Waybill>(x => x.WaybillState == 2 && x.Position > Position && x.Car == Car));

         foreach( var next in nextWaybills ) {
            next.WaybillState = 1;
            next.SaveAndFlush();
         }

         WaybillState = 1;
         SaveAndFlush();

      }

      public void DeleteWaybill() {

         if( WaybillState>1 ) {
            throw new Exception("Путевой лист закрыт. Удалять можно только открытые путевые листы.");
         }

         
         var prev = Prev();
         var next = Next();
         var position = Position;

         DeleteAndFlush();

         if( next != null ) {

            if( prev.WaybillState > 1 ) {
               prev.MoveRemains(next);  
            }

            var query = String.Format(
            @" UPDATE Waybill SET Position = Position-1 WHERE VehicleId={0} AND Position > {1} ",           
            next.Car.VehicleId,
            position
         );

            var s = ActiveRecordMediator.GetSessionFactoryHolder().CreateSession(typeof(Waybill));
            s.CreateQuery(query).ExecuteUpdate();
            s.Flush();
         }


      }


      public static Waybill GetPolymirWaybill(string id)
      {
         return Waybill.FindFirst(
               Expression.Where<Waybill>(
                  x =>
                     x.ReplicationId == id &&
                     x.ReplicationSource == Transport.ReplicationSource.dbfPolymir
               )
        );
      }


      public static Waybill GetPolymirWaybill(string id, DateTime dvy)
      {
          return Waybill.FindFirst(
                Expression.Where<Waybill>(
                   x =>
                      x.ReplicationId == id &&
                      x.ReplicationSource == Transport.ReplicationSource.dbfPolymir &&
                      x.DepartureDate == dvy
                )
         );
      }



   }



}

