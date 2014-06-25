T.view.inspection.VehicleDayInspection = Ext.extend(Ext.grid.EditorGridPanel, {
    constructor: function(cfg)
    {
        cfg = cfg || {};
        var f = [];
        var fields = [
            'WaybillId',
            'Shift',
            'DepartureDate',
            'DepartureTime',
            'ReturnDate',
            'ReturnTime',
            'GarageNumber',
            'Model',
            'RegistrationNumber',
            'Drivers',
            'Inspection',
            'Insurance',
            'CheckCO',
            'Column'];

        Ext.each(fields, function(i) {
            f.push({
                name: i,
                allowBlank: true,
                allowNull:true
            });
        });
        
        
        
        var store = new Ext.data.DirectStore({
            autoSave: true,
            autoDestroy: true,
            writer: new Ext.data.JsonWriter({
                encode: false,
                writeAllFields: true
            }),
            api: {
                read: Kdn.Direct.VehicleDayInspectionRead,
                update: Kdn.Direct.VehicleDayInspectionUpdate
            },
            idProperty: 'WaybillId',
            fields: f,
            root: 'data'
        });

       

        Ext.apply(cfg, {
            loadMask:true,
            columnLines: true,
            stripeRows: true,
            store: store,
            selModel: new Ext.grid.RowSelectionModel(),
            colModel: new Ext.grid.ColumnModel({
                    defaults: { filter: {} },
                    columns: [
                        {
                            header: 'Колонна',
                            dataIndex: 'Column',
                            width: 50
                        },
                        {
                            header: '№.пут.',
                            dataIndex: 'WaybillId',
                            width: 70
                        },
                        {
                            header: 'Выезд',
                            dataIndex: 'DepartureTime',
                            width: 90,
                            renderer: function(e, metaData, record) {
                                var date = record.get('DepartureDate');
                                var time = e;
                                if (!time) {
                                    time = date.format("H:i");
                                } else {
                                    metaData.css = 'green';
                                }
                                
                                return String.format(
                                    '{0} <span style="color:blue;">{1}</span>',
                                    date.format('d.m'),
                                    time
                                );
                            },
                            editor: { xtype: 'kdn.editor.fulltimefield', enableClear: true }
                        },
                        {
                            header: 'Возвр',
                            dataIndex: 'ReturnTime',
                            width: 90,
                            renderer: function(e, metaData, record, rowIndex, colIndex, store) {
                                var date = record.get('ReturnDate');
                                var time = e;
                                if (!time) {
                                    time = date.format("H:i");
                                } else {
                                    metaData.css = 'green';
                                }

                                return String.format(
                                    '{0} <span style="color:blue;">{1}</span>',
                                    date.format('d.m'),
                                    time
                                );
                            },
                            editor: { xtype: 'kdn.editor.fulltimefield', enableClear: true } 
                        },
                        {
                            header: 'см',
                            dataIndex: 'Shift',
                            width: 30
                        },
                        {
                            header: 'Гар.№',
                            dataIndex: 'GarageNumber',
                            width: 50
                        },
                        {
                            header: 'Марка',
                            dataIndex: 'Model',
                            width: 160
                        },
                        {
                            header: 'Гос.№',
                            dataIndex: 'RegistrationNumber',
                            width: 80
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
                                scope: this,
                                fn: function(e) {
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
                                scope: this,
                                fn: function(e) {
                                    if (e) {
                                        return this.formatDate(e);
                                    }
                                }
                            }

                        },
                        {
                            header: 'Водитель',
                            dataIndex: 'Drivers',
                            width: 140,
                            renderer: {
                                scope: this,
                                fn: function(e) {
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
                                    d.push(driver.Licence ? me.formatDate(driver.Licence) : '&nbsp;');
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
                                    var d = [], me = this;

                                    Ext.iterate(e, function(driver) {
                                        d.push(driver.Medical ? me.formatDate(driver.Medical) : '&nbsp;');
                                    });

                                    return d.join('<br/>');
                                }
                            }
                        }
                    ]
                }),
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
            ],
            plugins: ['filterrow']
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
},

DateRenderer: function(e) {
    
    if (!e) return null;
    return String.format(
                '{0} <span style="color:blue;">{1}</span>',
                e.format('d.m'),
                e.format('H:i')
            );
}

});

Ext.reg('view.inspection.vehicledayinspection', T.view.inspection.VehicleDayInspection);