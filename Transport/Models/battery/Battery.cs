using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using System.Text;
using Kdn.Ext.Attributes;
using Kdn.Attributes;
using Newtonsoft.Json;
using NHibernate.Criterion;

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
        public decimal Cost { get; set; }

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
        [Property,AllowBlank]
        public string Doc { get; set; }

        //Дата списания
        [Property]
        public DateTime? WriteOff { get; set; }

        [Property]
        public int? BatteryMovingId { get; set; }
    }
}
