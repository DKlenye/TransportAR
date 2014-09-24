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
        public int Norm { get; set; }

        //Начальный пробег(машиночасы)
        [Property]
        public int InitWork { get; set; }

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
            bat.InitWork = InitWork;
            bat.MakeDate = MakeDate;
            bat.MonthStart = MonthStart;
            bat.Norm = Norm;
            bat.OwnerId = OwnerId;
            bat.Warrantly = Warrantly;
            bat.WorkUnitId = WorkUnitId;

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
                InitWork = InitWork,
                MakeDate = MakeDate,
                MonthStart = MonthStart,
                Norm = Norm,
                OwnerId = OwnerId,
                Warrantly = Warrantly,
                WorkUnitId = WorkUnitId
            };

            bat.Save();
                       
            var moving = new BatteryMoving()
            {
                BatteryId = bat.BatteryId,
                InstallDate = InstallDate.Value,
                Vehicle = Vehicle
            };

            moving.SaveAndFlush();

        }


    }   


}
