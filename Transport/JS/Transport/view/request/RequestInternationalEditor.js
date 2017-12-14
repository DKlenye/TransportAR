T.view.RequestInternationalEditor = Ext.extend(Ext.Panel, {

    constructor: function (cfg) {
        cfg = cfg || {};

        Ext.apply(cfg, {
            layout: {
                type: 'border'
            },

            items: [
                {
                    region: 'center',
                    margins: '2 2 2 2',
                    xtype: 'kdn.grid.propertygrid',
                    source: {
                        Responsible: '',
                        RequestDate: '',
                        RequestDateEnd: '',
                        Way: '',
                        DepartmentId: '',
                        DeliveryBasis: '',
                        VehicleCount: '',
                        Consignor: '',
                        LoadingContactName: '',
                        DepartureCustoms: '',
                        DeliveryDate: '',
                        DeliveryDateEnd: '',
                        DeliveryAddress: '',
                        UnloadingContactName: '',
                        ReturnCustoms: '',
                        CargoName: '',
                        DangerCargo: '',
                        PackageListNumber: '',
                        Code: '',
                        CargoPlaces: '',
                        VehicleType: '',
                        VehicleCapacityTonns: '',
                        CargoDimensions: '',
                        CargoVolume: '',
                        Brutto: '',
                        Netto: '',
                        LoadingType: '',
                        CargoCost: '',
                        Currency: '',
                        CargoOverloading: '',
                        CargoStackability: '',
                        OtherInformation: '',
                        Attachments: ''
                    },
                    propertyNames: {
                        Responsible: 'Фио, тел. исполнителя',
                        RequestDate: 'Дата загрузки с',
                        RequestDateEnd: 'Дата загрузки по',
                        Way: 'Направление (экспорт/импорт), маршрут перевозки',
                        DepartmentId: 'Наименование уcтановки/производства/цеха',
                        DeliveryBasis: "Базис поставки по контракту",
                        VehicleCount: "Количество транспортных средств",
                        Consignor: "Адрес загрузки,(почтовый индекс) наименование грузоотправителя на языке страны отгрузки",
                        LoadingContactName: "Контактное лицо/телефон (на загрузке)",
                        DepartureCustoms: "Таможня отправления, адрес выдачи экспортной декларации (EX-1)",
                        DeliveryDate: "Дата доставки с",
                        DeliveryDateEnd: "Дата доставки по",
                        DeliveryAddress: "Адрес доставки, (почтовый индекс) наименование грузополучателя",
                        UnloadingContactName: "Контактное лицо/телефон (на выгрузке)",
                        ReturnCustoms: 'Таможня назначения',
                        CargoName: 'Наименование груза',
                        DangerCargo: 'Опасный груз (номер ООН, паспорт безопасности)',
                        PackageListNumber: '№ упаковочного листа',
                        Code: 'Код ТНВЭД',
                        CargoPlaces: 'Количество грузовых мест',
                        VehicleType: 'Требуемый тип транспортного средства, кг',
                        VehicleCapacityTonns: 'Грузоподъёмность транспортного средства, кг',
                        CargoDimensions: 'Габариты груза (м), упаковка',
                        CargoVolume: 'Объём груза, м3',
                        Brutto: 'Вес груза брутто, кг',
                        Netto: 'Вес груза нетто, кг',
                        LoadingType: 'Способ загрузки и разгрузки (боковой, задний, верхний, полное расчехление бортов, гидролифт, и др.)',
                        CargoCost: 'Стоимость груза',
                        Currency: 'Валюта',
                        CargoOverloading: 'Возможность перегрузки груза',
                        CargoStackability: 'Информация о штабелируемости груза',

                        OtherInformation: 'Другие дополнительные сведения',
                        Attachments: 'Файлы'
                    },
                    customRenderers: {
                        Attachments: function (e) {
                            if (e && e.length > 0) {
                                var ar = [];
                                Ext.iterate(e, function (i) {
                                    ar.push(String.format("<a href='#' attachmentId='{1}'>{0}</a>", i.Name, i.Id));
                                    console.log(i, i.Name, ar);
                                });


                                return ar.join("<br/>");
                            }
                        },
                        DepartmentId: function (v) {
                            if (!v) return v;
                            var store = Kdn.ModelFactory.getStore('ServiceDepartment'),
                               rec = store.getById(v);
                            if (rec) return rec.get('DepartmentName');
                            return null;
                        }
                    }
                }
            ]
        });

        T.view.RequestInternationalEditor.superclass.constructor.call(this, cfg);
    },

    fill: function (request) {
        var prop = this.items.itemAt(0);
        var source = prop.getSource();

        Ext.iterate(source, function (key, val) {
            source[key] = request[key];
        });

        prop.setSource(source);

    }


});

Ext.reg('view.requestinternationaleditor', T.view.RequestInternationalEditor);