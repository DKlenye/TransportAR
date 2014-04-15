T.view.inspection.VehicleDayInspection = Ext.extend(Ext.grid.GridPanel, {
    constructor: function(cfg)
    {
        cfg = cfg || {};

        var store = new Ext.data.DirectStore({
            autoSave: false,
            autoDestroy: true,
            writer: new Ext.data.JsonWriter({
                encode: false,
                writeAllFields: true
            }),
            api: {
                read: Kdn.Direct.VehicleDayInspection
            },
            idProperty: 'WaybillId',
            fields: [
            'WaybillId',
            'Shift',
            'DepartureDate',
            'ReturnDate',
            'GarageNumber',
            'Model',
            'RegistrationNumber',
            'Drivers'
            ],
            root: 'data'
        });


        Ext.apply(cfg, {
            loadMask:true,
            columnLines: true,
            stripeRows: true,
            store: store,
            columns: [
                {
                    header: '№.пут.',
                    dataIndex: 'WaybillId'
                },
                {
                    header: 'Смена',
                    dataIndex: 'Shift',
                    width:40
                },
                {
                    header: 'Гар.№',
                    dataIndex: 'GarageNumber'
                    
                },
                {
                    header: 'Марка',
                    dataIndex: 'Model'
                },
                 {
                     header: 'Гос.№',
                     dataIndex: 'RegistrationNumber'
                 },
                {
                    header: 'Тех. осмотр',
                    dataIndex: 'Inspection',
                    renderer: {
                        scope: this,
                        fn: function(e) {
                            if (e) {
                                return this.formatDate(e);
                            }
                        }
                    }
                },
                {
                    header: 'Страховка',
                    dataIndex: 'Insurance',
                    renderer: {
                        scope:this,
                        fn:function(e) {
                            if (e) {
                                return this.formatDate(e);
                            } 
                        }
                    }
                },
                {
                    header: 'Проверка СО',
                    dataIndex: 'CheckCO',
                    renderer: {
                        scope:this,
                        fn:function(e) {
                            if (e) {
                                return this.formatDate(e);
                            } 
                        }
                    }
                    
                },
                {
                    header: 'Водитель',
                    dataIndex: 'Drivers',
                    renderer: {
                        scope:this,
                        fn:function(e) {
                            var date = this.getParams()["date"],
                                d = [];
                            
                            Ext.iterate(e, function(driver) {
                                d.push(driver.Fio);
                            });

                            return d.join('<br/>');
                        }
                    }
                },
                {
                    header: 'Вод. удостоверение',
                    dataIndex: 'Drivers',
                    renderer: {
                        scope: this,
                        fn: function(e) {
                            var d = [], me = this;

                            Ext.iterate(e, function(driver) {
                            d.push(driver.Licence ? me.formatDate(driver.Medical) : '&nbsp;');
                            });

                            return d.join('<br/>');
                        }
                    }
                },
                {
                    header: 'Мед. справка',
                    dataIndex: 'Drivers',
                    renderer: {
                        scope: this,
                        fn: function(e) {
                            var d = [],me = this;

                            Ext.iterate(e, function(driver) {
                                d.push(driver.Medical ? me.formatDate(driver.Medical): '&nbsp;');
                            });

                            return d.join('<br/>');
                        }
                    }
                }
                
            ],
            tbar: [
                '-',
                {
                    text: 'Обновить',
                    iconCls: 'icon-refresh',
                    scope: this,
                    handler: this.reload
                },
                '-',
                'Дата:',
                {
                    xtype: 'kdn.form.datefield',
                    value: new Date(),
                    width: 130,
                    listeners: {
                        scope: this,
                        select: this.reload
                    },
                    dataIndex: 'date'
                },
                '-',
                {
                    xtype: 'tbspacer',
                    width: 30
                },
                '-'
            ]
        });

    T.view.inspection.VehicleDayInspection.superclass.constructor.call(this, cfg);

    this.reload();

},

getParams: function()
{
    var tbar = this.getTopToolbar();
    var params = {};
    tbar.items.each(function(i)
    {
        if (i.dataIndex)
        {
            params[i.dataIndex] = i.getValue();
        }
    });

    return params;

},

reload: function()
{
    var params = this.getParams();
    this.store.reload({ params: params });
},

formatDate: function(date) {

    if (!date) return null;
    var d = this.getParams()["date"];
    return String.format("<span style='color:{0}'>{1}<span>",d < date ? 'green' : 'red',date.format('d.m.Y'));
}

});

Ext.reg('view.inspection.vehicledayinspection', T.view.inspection.VehicleDayInspection);