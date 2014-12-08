using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using Kdn.Ext.Attributes;
using NHibernate.Criterion;

namespace Transport.Models
{
   [ActiveRecord, Model]
   public class BatteryMoving : ActiveRecordBase<BatteryMoving>
   {
      [PrimaryKey, IdProperty]
      public int BatteryMovingId { get; set; }

      [Property]
      public int BatteryId { get; set; }

      [Property]
      public DateTime InstallDate { get; set; }
      [Property]
      public DateTime? RemoveDate { get; set; }

      [BelongsTo("VehicleId")]
      public BaseVehicle Vehicle { get; set; }

      [Property, AllowBlank]
      public string BatGarageNumber { get; set; }

      [Property]
      public int? BatteryRemoveReasonId { get; set; }

      [Property]
      public bool? IsWriteOff { get; set; }

       [AllowBlank]
      public int GarageNumber
      {
          get
          {
              if (BatGarageNumber == null) return 0;
              if (BatGarageNumber.IndexOf('-') != -1)
              {
                  return int.Parse(BatGarageNumber.Split('-')[0]);
              }
              else return int.Parse(BatGarageNumber);
          }
      }

       [AllowBlank]
      public short Num
      {
          get
          {
              if (BatGarageNumber == null) return 0;
              if (BatGarageNumber.IndexOf('-') != -1)
              {
                  return short.Parse(BatGarageNumber.Split('-')[1]);
              }
              else return 1;
          }
      }
      
      public void setGarageNumber(int GarageNumber, short? Num){
          if (Num == null)
          {
              BatGarageNumber = GarageNumber.ToString();
          }
          else
          {
              BatGarageNumber = String.Format("{0}-{1}", GarageNumber, Num.Value);
          }
      }

      public void setBatGarageNumber()
      {
          
          var BatList = new List<BatteryMoving>();

          short i = 0;
          for (; i < 10; i++)
          {
              BatList.Add(null);
          }

          var batteries = FindAll(Expression.Where<BatteryMoving>(x => x.RemoveDate == null && x.Vehicle == Vehicle && x.BatteryMovingId != BatteryMovingId));


          if (Vehicle.GarageNumber == GarageNumber)
          {
              if (batteries.Length == 0)
              {
                  setGarageNumber(Vehicle.GarageNumber, null);
              }
              return;
          }

          foreach (var bat in batteries)
          {
              BatList.Insert(bat.Num, bat);
          }
                    
          for (i = 1; i < 10; i++ )
          {
              if (BatList[i] == null)
              {

                if(batteries.Length==0)
                    setGarageNumber(Vehicle.GarageNumber,null);
                else if (batteries.Length == 1 && i==2)
                {
                    setGarageNumber(Vehicle.GarageNumber, i);
                    BatList[1].setGarageNumber(Vehicle.GarageNumber, 1);
                }
                else
                {
                    setGarageNumber(Vehicle.GarageNumber, i);
                }

                break;
              }
          }

                   
      }


      public override void SaveAndFlush()
      {          
          base.SaveAndFlush();
          setBatGarageNumber();
          var Batery = Battery.Find(BatteryId);
          Batery.BatteryMovingId = BatteryMovingId;
          Batery.SaveAndFlush();
      }



      public override void UpdateAndFlush()
      {          
          base.UpdateAndFlush();
          //setBatGarageNumber();
      }

      public override void Delete()
      {
          setLastMoving();
          base.Delete();
      }


      public void setLastMoving()
      {
          var moving = FindFirst(Order.Desc(Projections.Property<BatteryMoving>(x => x.InstallDate)),
              Expression.Where<BatteryMoving>(                
                x => x.BatteryId == BatteryId && x.BatteryMovingId != BatteryMovingId
          ));

          var Bat = Battery.Find(BatteryId);
          Bat.BatteryMovingId = moving.BatteryMovingId;

      }



   }




}
