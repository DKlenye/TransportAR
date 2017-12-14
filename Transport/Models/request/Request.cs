using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;

namespace Transport.Models
{

    public enum RequestStatus
    {
        Publish = 0, //опубликована
        Approve = 1, //утверждена      
        Confirm = 2, //принята диспетчером
        Return = 3, //возвращена
        Cancel = 4, //отменена
        Inprogress = 5, //выполняется
        Executed = 6 //выполнена
    }

    [Model, ActiveRecord, JoinedBase]
    public class Request : ActiveRecordBase<Request>
    {

        [IdProperty, PrimaryKey]
        public int RequestId { get; set; }

        [Property]
        public DateTime RequestDate { get; set; } //дата

        [Property]
        public RequestStatus Status { get; set; } //статус

        [Property]
        public string UserFio { get; set; }

        [Property]
        public string UserLogin { get; set; }

        [Property]
        public string ApproverFio { get; set; }

        [Property]
        public string ApproverLogin { get; set; }

        [Property]
        public DateTime? PublishDate { get; set; }

        [Property]
        public DateTime? ApproveDate { get; set; }


        [BelongsTo("CustomerId")]
        public Customer Customer { get; set; }
        [BelongsTo("RequestTypeId"),AllowBlank]
        public RequestType RequestType { get; set; }


        public string RequestTypeName 
        {
            get { return RequestType == null ? "" : RequestType.RequestTypeName; }
        }

        public string CustomerName
        {
            get { return Customer == null ? "" : Customer.CustomerName; }
        }

        public IEnumerable<RequestAttachments> Attachments { get; set; }

        [Property]
        public bool isDeleted { get; set; }

        [HasMany(typeof (RequestEvent), Table = "RequestEvent", ColumnKey = "RequestId", Fetch = FetchEnum.SubSelect,
            Cascade = ManyRelationCascadeEnum.AllDeleteOrphan)]
        public ICollection<RequestEvent> Events { get; set; }

        public virtual string type
        {
            get { return this.GetType().Name; }
        }

        [Property, AllowBlank]
        public string OtherInformation { get; set; }


        public void Confirm(string message)
        {
            Events.Add(new RequestEvent()
            {
                EventDate = DateTime.Now,
                Message = message,
                Request = this,
                Status = RequestStatus.Confirm
            });
            Status = RequestStatus.Confirm;
        }

        public void Inprogress()
        {
            Events.Add(new RequestEvent()
            {
                EventDate = DateTime.Now,
                Request = this,
                Status = RequestStatus.Inprogress
            });
            Status = RequestStatus.Inprogress;
        }

        public void Executed()
        {
            Events.Add(new RequestEvent()
            {
                EventDate = DateTime.Now,
                Request = this,
                Status = RequestStatus.Executed
            });
            Status = RequestStatus.Executed;
        }
    }

    [ActiveRecord]
    public class RequestPassengers : Request
    {

        [JoinedKey]
        public int RequestId
        {
            get { return base.RequestId; }
            set { base.RequestId = value; }
        }

        [Property]
        public string DestinationPoint { get; set; } //Пункт назначения

        [Property]
        public short PassengerAmount { get; set; } //Кол-во пасс.

        [Property]
        public short ChildAmount { get; set; } //Кол-во детей

        [Property]
        public string TripPurpose { get; set; } //Цель поездки

        [Property]
        public string SeatPlace { get; set; } //Место посадки

        [Property]
        public short TripDuration { get; set; } //Срок коммандировки      

        [Property]
        public string SecondedPeople { get; set; } //Фио, номер телефона

        [Property]
        public string OrderNumber { get; set; } //№ приказа

        [Property]
        public DateTime? OrderDate { get; set; } //Дата приказа

        [Property]
        public string OrderName { get; set; } //Название приказа

        [Property]
        public string ConfirmTelFax { get; set; } //Подтверждение направить на тел./факс

        [Property]
        public string ConfirmEmail { get; set; } //Подтверждение направить по электронной почте

        public string Order
        {
            get
            {
                return String.Format("{0}, {1}, {2}", OrderNumber,
                    OrderDate == null ? "" : OrderDate.Value.ToString("dd.MM.yyyy"), OrderName);
            }
        }


    }

    [ActiveRecord]
    public class RequestFreight : Request
    {

        [JoinedKey]
        public int RequestId
        {
            get { return base.RequestId; }
            set { base.RequestId = value; }
        }

        #region Loading

        [Property]
        public string LoadingTime { get; set; }

        [Property]
        public string Shipper { get; set; }

        [Property]
        public string LoadingAddress { get; set; } //адрес загрузки

        [Property]
        public string ContactName { get; set; } //контактное лицо
        
        #endregion

        #region Unloading

        [Property]
        public string Consignee { get; set; }

        [Property]
        public string DestinationPoint { get; set; } //Пункт назначения

        [Property]
        public string ConsigneeContactName { get; set; } //контактное лицо

        #endregion

        [Property]
        public String DeliveryTime { get; set; }





        [Property]
        public string OrderNumber { get; set; } //№ приказа

        [Property]
        public string LoadingType { get; set; } //Способ загрузки

        


        [Property]
        public string Responsible { get; set; } //ответственный за заказ

        [Property]
        public string VehicleType { get; set; } //тип транспорта

        [Property]
        public int VehicleCount { get; set; } //кол-во ТС
        [Property]
        public decimal VehicleCapacityTonns { get; set; }//грузоподъёмность транспорта

        [Property]
        public bool MobileConnection { get; set; }
        
        [Property]
        public bool LocationInfo { get; set; }

        [Property]
        public bool ChangesInfo { get; set; }

        [Property]
        public bool WithInvoice { get; set; }

        [HasMany(typeof (RequestFreightCargo), Table = "RequestFreightCargo", ColumnKey = "RequestId",
            Fetch = FetchEnum.SubSelect, Where = "IsDeleted = 0")]
        public ICollection<RequestFreightCargo> Cargo { get; set; }

    }

    [ActiveRecord(Where = "IsDeleted = 0")]
    public class RequestFreightCargo : ActiveRecordBase<RequestFreightCargo>
    {
        [PrimaryKey]
        public int CargoId { get; set; } //код

        [BelongsTo("RequestId"), JsonIgnore]
        public Request Request { get; set; } //код заявки

        [Property]
        public string CargoName { get; set; } //наимнование груза

        [Property]
        public int NumberOfPackages { get; set; } //кол-во грузовых мест

        [Property]
        public string KindOfPacking { get; set; } //Вид упауовки
        
        [Property]
        public decimal? Weight { get; set; } //вес,т

        [Property]
        public decimal? Length { get; set; } //длина, см

        [Property]
        public decimal? Width { get; set; } //ширина, см

        [Property]
        public decimal? Height { get; set; } //высота, см

        [Property]
        public decimal? Volume { get; set; } //объём, см

        [Property]
        public decimal? Cost { get; set; } //стоимость груза, руб

        [Property]
        public string SpecialProperties { get; set; }//особые свойства груза

        [Property]
        public bool IsDeleted { get; set; }

    }

    [ActiveRecord]
    public class RequestCrane : Request
    {

        [JoinedKey]
        public int RequestId
        {
            get { return base.RequestId; }
            set { base.RequestId = value; }
        }

        [Property]
        public string LicenceNumber { get; set; } //номер лицензии

        [Property]
        public string WorkPlace { get; set; } //Место работы

        [Property]
        public string WorkObject { get; set; } //Объект

        [Property]
        public string WorkType { get; set; } //Вид работ

        [Property]
        public string CraneType { get; set; } //Тип подъёмника

        [Property]
        public bool PowerLineExists { get; set; } //наличие ЛЭП

        [Property]
        public string PowerPermission { get; set; } //Разрешение

        [Property]
        public string Responsible { get; set; } //ответственный за проведение работ

        [Property]
        public bool ProjectExists { get; set; } //наличие проекта или технологии работ

        [Property]
        public string ResponsibleOrder { get; set; } //Приказ о назначении ответственных


        [HasMany(typeof (RequestCraneSlingers), Table = "RequestCraneSlingers", ColumnKey = "RequestId",
            Fetch = FetchEnum.SubSelect)]
        public ICollection<RequestCraneSlingers> Slingers { get; set; }
    }

    [ActiveRecord]
    public class RequestCraneSlingers : ActiveRecordBase<RequestCraneSlingers>
    {
        [BelongsTo("RequestId"), JsonIgnore]
        public Request Request { get; set; }

        [PrimaryKey]
        public int SlingerId { get; set; }

        [Property]
        public string Office { get; set; } //должность     

        [Property]
        public string FIO { get; set; } //фио 

        [Property]
        public string CertificateNumber { get; set; } //номер удостоверения

        [Property]
        public DateTime? DateKnowledge { get; set; } //дата проверки знаний 

    }

    [ActiveRecord]
    public class RequestInternational : Request
    {
        [JoinedKey]
        public int RequestId
        {
            get { return base.RequestId; }
            set { base.RequestId = value; }
        }

        [Property]
        public string Way { get; set; }
        [Property]
        public string DeliveryBasis { get; set; }
        [Property]
        public int VehicleCount { get; set; }
        [Property]
        public string Consignor { get; set; }
        [Property]
        public string LoadingContactName { get; set; }
        [Property]
        public string DepartureCustoms { get; set; }
        [Property]
        public DateTime? DeliveryDate { get; set; }
        [Property]
        public string DeliveryAddress { get; set; }
        [Property]
        public string UnloadingContactName { get; set; }
        [Property]
        public string ReturnCustoms { get; set; }
        [Property]
        public string CargoName { get; set; }
        [Property]
        public string DangerCargo { get; set; }
        [Property]
        public string PackageListNumber { get; set; }
        [Property]
        public string Code { get; set; }
        [Property]
        public string CargoDimensions { get; set; }
        [Property]
        public string Brutto { get; set; }
        [Property]
        public string Netto { get; set; }
        [Property]
        public string LoadingType { get; set; }
        [Property]
        public string CargoCost { get; set; }
        [Property]
        public string CargoOverloading { get; set; }
        [Property]
        public string CargoStackability { get; set; }
        [Property]
        public string VehicleType { get; set; }
        [Property]
        public string CargoPlaces { get; set; }
        [Property]
        public string VehicleCapacityTonns { get; set; }
        [Property]
        public string CargoVolume { get; set; }
        [Property]
        public string Currency { get; set; }
        [Property]
        public DateTime? DeliveryDateEnd { get; set; }
        [Property]
        public DateTime? RequestDateEnd { get; set; }

    }


    [ActiveRecord]
    public class RequestEvent : ActiveRecordBase<RequestEvent>
    {
        [PrimaryKey]
        public int RequestEventId { get; set; }

        [BelongsTo("RequestId"), JsonIgnore]
        public Request Request { get; set; }

        [Property]
        public DateTime EventDate { get; set; }

        [Property]
        public string Message { get; set; }

        [Property]
        public RequestStatus Status { get; set; }
    }

}
