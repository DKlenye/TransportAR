using System;
using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models
{
    [ActiveRecord, Model]
    public class v_Battery : ActiveRecordBase<v_Battery>, Interfaces.IOwnered
    {
        [IdProperty, PrimaryKey]
        public int BatteryId { get; set; }


        [Property, AllowBlank]
        public int OwnerId { get; set; }
        public void setOwner(int OwnerId) { this.OwnerId = OwnerId; }

        [Property]
        public int BatteryTypeId { get; set; }
        [Property]
        public int BatteryMakerId { get; set; }

        //Дата изготовления
        [Property]
        public DateTime? MakeDate { get; set; }

        //Стоимость
        [Property]
        public decimal? Cost { get; set; }

        //Гарантия мес.
        [Property]
        public short Warrantly { get; set; }

        //Начальная наработка
        [Property]
        public short MonthStart { get; set; }

        [Property]
        public int WorkUnitId { get; set; }

        //Норма на пробег(машиночасы)
        [Property]
        public int? KmNorm { get; set; }

        //Норма на пробег(машиночасы)
        [Property]
        public int? MhNorm { get; set; }

        //Начальный пробег(машиночасы)
        [Property]
        public int? InitKmWork { get; set; }
        
        //Начальный пробег(машиночасы)
        [Property]
        public int? InitMhWork { get; set; }

        //Номер документа
        [Property, AllowBlank]
        public string Doc { get; set; }

        //Дата списания
        [Property]
        public bool? IsWriteOff { get; set; }
       
        [Property]
        public DateTime? InstallDate { get; set; }
        [Property]
        public DateTime? RemoveDate { get; set; }
        
        [Property, AllowBlank]
        public string BatGarageNumber { get; set; }

        [Property]
        public int? RemainCost { get; set; }
        [Property]
        public int? RemainPrcn { get; set; }

        [Property]
        public bool? IsInStock { get; set; }

        [Property]
        public short? Wear { get; set; }


        [BelongsTo("VehicleId")]
        public BaseVehicle Vehicle { get; set; }


        public override void Delete()
        {
            var query = String.Format(
                @" DELETE BatteryMoving WHERE BatteryId = {0} ",
                BatteryId
            );

            var s = ActiveRecordMediator.GetSessionFactoryHolder().CreateSession(this.GetType());
            s.CreateQuery(query).ExecuteUpdate();

            Battery.Find(BatteryId).DeleteAndFlush();
        }

        public override void UpdateAndFlush()
        {

            var bat = Battery.Find(BatteryId);
            
            bat.BatteryMakerId = BatteryMakerId;
            bat.BatteryTypeId = BatteryTypeId;
            bat.Cost = Cost;
            bat.Doc = Doc;
            bat.InitKmWork = InitKmWork;
            bat.InitMhWork = InitMhWork;
            bat.MakeDate = MakeDate;
            bat.MonthStart = MonthStart;
            bat.KmNorm = KmNorm;
            bat.MhNorm = MhNorm;
            bat.OwnerId = OwnerId;
            bat.Warrantly = Warrantly;
            bat.SaveAndFlush();

            Refresh();


        }

        public override void SaveAndFlush()
        {
                       
            var bat = new Battery()
            {
                BatteryMakerId = BatteryMakerId,
                BatteryTypeId = BatteryTypeId,
                Cost = Cost,
                Doc = Doc,
                InitKmWork = InitKmWork,
                InitMhWork = MhNorm,
                MakeDate = MakeDate,
                MonthStart = MonthStart,
                KmNorm = KmNorm,
                MhNorm = MhNorm,
                OwnerId = OwnerId,
                Warrantly = Warrantly
            };

            bat.Save();
                       
            var moving = new BatteryMoving()
            {
                BatteryId = bat.BatteryId,
                InstallDate = InstallDate.Value,
                WorkUnitId = WorkUnitId,
                Vehicle = Vehicle
            };

            moving.SaveAndFlush();

        }


    }   


}
