﻿T.view.RequestPassengersEditor = Ext.extend(Ext.Panel, {

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
                        RequestDate: '',
                        DestinationPoint: '',
                        PassengerAmount: '',
                        ChildAmount: '',
                        TripDuration: '',
                        CustomerName: '',
                        TripPurpose: '',
                        SeatPlace:'',
                        SecondedPeople : '',
                        Order: '',
                        OtherInformation: '',
                        ConfirmTelFax: '',
                        ConfirmEmail:''
                    },
                    propertyNames: {
                        RequestTypeName:"Вид заявки",
                        DestinationPoint: 'Пункт назначения',
                        RequestDate: 'Выделить транспорт на дату',
                        ChildAmount: 'Количество детей',
                        PassengerAmount: 'Количество пассажиров',
                        TripDuration: 'Срок фрахтования (дней)',
                        TripPurpose: 'Цель поездки',
                        CustomerName:'Наименование заказчика (цель)',
                        Order:'Номер, дата, название приказа о командировании',
                        SecondedPeople:'ФИО командируемых, номер телефона',
                        SeatPlace: 'Место и время посадки',
                        OtherInformation: "Другая информация",
                        ConfirmTelFax: "Подтверждение о принятии заявки направить на тел.",
                        ConfirmEmail: "Подтверждение о принятии заявки направить на эл. почту"
                    }
                }
            ]
        });

        T.view.RequestPassengersEditor.superclass.constructor.call(this, cfg);
    },

    fill: function(request)
    {
        console.log(request);
        var prop = this.items.itemAt(0);
        var source = prop.getSource();
        
        Ext.iterate(source, function(key, val)
        {
            source[key]=request[key];
        });

        prop.setSource(source);

    }


});

Ext.reg('view.requestpassengerseditor', T.view.RequestPassengersEditor);