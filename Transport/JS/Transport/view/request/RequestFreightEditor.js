T.view.RequestFreightEditor = Ext.extend(Ext.Panel, {

    constructor: function(cfg)
    {
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
                        RequestTypeName:'',
                        WithInvoice: '',
                        RequestDate: '',
                        LoadingTime: '',
                        Shipper: '',
                        Consignee: '',
                        ConsigneeContactName: '',
                        DeliveryTime:'',
                        DestinationPoint:'',
                        VehicleType: '',
                        VehicleCount: '',
                        VehicleCapacityTonns:"",
                        CustomerName: '',
                        OrderNumber: '№ 321 от 12.12.2012',
                        LoadingType: '',
                        LoadingAddress: '',
                        ContactName: '',
                        Responsible: '',
                        Attachments: '',
                        MobileConnection: '',
                        LocationInfo: '',
                        ChangesInfo: '',
                        OtherInformation:''
                    },
                    propertyNames: {
                        RequestTypeName: "Вид заявки",
                        WithInvoice:'оформление ТТН',
                        RequestDate: 'Выделить транспорт на дату',
                        LoadingTime: "Время подачи ТС под загрузку",
                        Shipper: "Грузоотправитель",
                        ContactName: 'Контактное лицо грузоотправителя, тел',
                        Consignee: "Грузополучатель",
                        ConsigneeContactName: "Контактное лицо грузополучателя, тел",
                        DeliveryTime:"Срок доставки груза",
                        DestinationPoint: 'Пункт назначения',
                        VehicleType: 'Тип транспортного средства',
                        VehicleCount: 'Количество ТС',
                        VehicleCapacityTonns:'Грузоподъёмность ТС',
                        CustomerName: 'Наименование заказчика',
                        LoadingType: 'Способ загрузки',
                        LoadingAddress: 'Адрес загрузки',
                        Responsible: 'Ответственный за заказ, цех, тел',
                        OrderNumber: 'Номер договора, контракта, приказа',
                        Attachments: 'Файлы',
                        MobileConnection: 'Наличие постоянной мобильной обратной связи обязательно',
                        LocationInfo: 'Сообщать о прибытии на погрузку\разгрузку, ежедневное местонахождение ТС',
                        ChangesInfo: 'Незамедлительно информировать о всех изменениях в процессе выполнения перевозки',
                        OtherInformation:'Дополнительные условия'
                        
                    },
                    customRenderers: {
                        Attachments: function (e) {
                            if (e && e.length > 0) {
                                var ar = [];
                                Ext.iterate(e, function (i) {
                                    ar.push(String.format("<a href='#' attachmentId='{1}'>{0}</a>", i.Name,i.Id));
                                    console.log(i, i.Name, ar);
                                });

                                
                                return ar.join("<br/>");
                            }
                        }
                    },
                    listeners: {
                        beforeedit: this.onBeforeEdit,
                        cellclick:this.onCellClick,
                        scope:this
                    }
                },
                {
                    region: 'south',
                    margins: '0 2 2 2',
                    height: 150,
                    xtype: 'grid',
                    columnLines:true,
                    stripeRows:true,
                    title: 'Груз',
                    iconCls: 'icon-package',
                    store: new Ext.data.JsonStore({
                            fields: [
                                'CargoName', 'Weight', 'Length', 'Width', 'Height', 'Volume','NumberOfPackages','KindOfPacking','Cost','SpecialProperties'
                            ]
                        }),
                    viewConfig:{
                        forceFit:true
                    },
                    colModel:new Ext.grid.ColumnModel({
                        defaults:{
                            //fixed:true,
                            //width:70,
                            align:'center'
                        },
                        columns: [
                            {
                                header: 'Наименование',
                                dataIndex: 'CargoName',
                               // fixed:false,
                                align:'left'
                            }, 
                            {
                                header: 'Вид упаковки',
                                dataIndex: 'KindOfPacking'
                            },
                            {
                                header: 'Кол гр. мест',
                                dataIndex: 'NumberOfPackages'
                            },
                            {
                                header: 'Вес,т',
                                dataIndex: 'Weight'                               
                            },
                             {
                                 header: 'Длина,м',
                                 dataIndex: 'Length'
                             },
                              {
                                  header: 'Ширина,м',
                                  dataIndex: 'Width'
                              },
                               {
                                   header: 'Высота,м',
                                   dataIndex: 'Height'
                               },
                                {
                                    header: 'Объём,м3',
                                    dataIndex: 'Volume'
                                },
                            {
                                header: 'Стоимость',
                                dataIndex: 'Cost'
                            },
                             {
                                 header: 'Особые свойства',
                                 dataIndex: 'SpecialProperties'
                             }
                        ]
                    })
                }
            ]
        });

        T.view.RequestFreightEditor.superclass.constructor.call(this, cfg);
    },

    fill: function(request)
    {
        var prop = this.items.itemAt(0);
        var source = prop.getSource();

        Ext.iterate(source, function(key, val)
        {
            source[key] = request[key];
        });

        prop.setSource(source);
        this.fillCargo(request.Cargo);

    },

    fillCargo: function(cargo)
    {
        var grid = this.items.itemAt(1);
        grid.store.loadData(cargo,false);
    },

    onBeforeEdit:function(o) {
        return false;
    },
    onCellClick:function(grid, rowIndex, columnIndex, e) {
        var el = Ext.get(e.target);
        if (el.dom.tagName == "A") {
            var id = el.getAttribute("attachmentId");
             location.href = "Handlers/Attachment.ashx?id="+id;
        }
    }

});

Ext.reg('view.requestfreighteditor', T.view.RequestFreightEditor);