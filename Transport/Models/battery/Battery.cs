using System;
using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models
{
   [ActiveRecord, Model]
   public class Battery : ActiveRecordBase<Battery>, Interfaces.IOwnered
    {
       [IdProperty,PrimaryKey]
        public int BatteryId { get; set; }

      [Property,AllowBlank]
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

        //Норма на пробег
        [Property]
        public int? KmNorm { get; set; }

        //Норма на машиночасы
        [Property]
        public int? MhNorm { get; set; }

        //Начальный пробег
        [Property]
        public int? InitKmWork { get; set; }

        //Начальные машиночасы
        [Property]
        public int? InitMhWork { get; set; }

        //Номер документа
        [Property,AllowBlank]
        public string Doc { get; set; }

        //Дата списания
        [Property]
        public DateTime? WriteOff { get; set; }

        [Property]
        public int? BatteryMovingId { get; set; }

       [Property]
       public short? Wear { get; set; }

    }
}
