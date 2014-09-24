using System;
using Castle.ActiveRecord;
using Kdn.Ext.Attributes;
using Transport.Models.tire;


namespace Transport.Models
{
    [Model, ActiveRecord]
    public class v_Tire : ActiveRecordBase<v_Tire>, Interfaces.IOwnered
    {
        [IdProperty, PrimaryKey]
        public int TireId { get; set; }

        [Property, AllowBlank]
        public int OwnerId { get; set; }

        [BelongsTo("TireModelId"), AllowBlank]
        public TireModel TireModel { get; set; }

        [Property(Length = 30)]
        public string FactoryNumber { get; set; }

        [Property]
        public bool? isWriteOff { get; set; }

        [Property]
        public int? Cost { get; set; }

        [Property]
        public int? TireMakerId { get; set; }

        [Property(Length = 20)]
        public string Size { get; set; }

        [Property]
        public TireSeason? Season { get; set; }

        [Property]
        public int? KmNorm { get; set; }

        [Property]
        public int? KmStart { get; set; }

        [Property]
        public int? MonthNorm { get; set; }

        [Property]
        public DateTime? InstallDate { get; set; }

        [BelongsTo("VehicleId")]
        public BaseVehicle Vehicle { get; set; }

        [Property]
        public int? GarageNumber { get; set; }

        [Property(Length = 150), AllowBlank]
        public string Description { get; set; }

        [Property, AllowBlank]
        public bool? IsSpare { get; set; }
        [Property, AllowBlank]
        public bool? IsNotReplaceable { get; set; }
        [Property, AllowBlank]
        public bool? IsInStock { get; set; }

        [Property]
        public short? Wear { get; set; }

        public void setOwner(int OwnerId) { this.OwnerId = OwnerId; }


        public override void Delete()
        {
            var query = String.Format(
               @" DELETE TireMoving WHERE TireId = {0} ",
               TireId
           );

            var s = ActiveRecordMediator.GetSessionFactoryHolder().CreateSession(this.GetType());
            s.CreateQuery(query).ExecuteUpdate();

            Tire.Find(TireId).DeleteAndFlush();
        }

        public override void UpdateAndFlush()
        {

            var tire = Tire.Find(TireId);

            tire.TireMakerId = TireMakerId;
            tire.TireModel = TireModel;
            tire.FactoryNumber = FactoryNumber;
            tire.KmNorm = KmNorm;
            tire.KmStart = KmStart;
            tire.MonthNorm = MonthNorm;
            tire.Season = Season;
            tire.Size = Size;
            tire.Description = Description;
            tire.Cost = Cost;

            tire.SaveAndFlush();

            Refresh();
            
        }

        public override void SaveAndFlush()
        {

            var tire = new Tire()
            {
                Cost = Cost,
                Description = Description,
                FactoryNumber = FactoryNumber,
                IsInStock = IsInStock??false,
                KmNorm = KmNorm,
                KmStart = KmStart,
                MonthNorm = MonthNorm,
                OwnerId = OwnerId,
                Season = Season,
                Size = Size,
                TireMakerId = TireMakerId,
                TireModel = TireModel
            };

            tire.Save();

            var moving = new TireMoving()
            {
                TireId = tire.TireId,
                InstallDate = InstallDate.Value,
                IsNotReplaceable = IsNotReplaceable??false,
                IsSpare  = IsSpare??false,
                Vehicle  = Vehicle

            };

            moving.SaveAndFlush();

            TireId = tire.TireId;
        }


    }



}
