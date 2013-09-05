T.view.limit.VehicleKmLimits = Ext.extend(Ext.Panel, {
    constructor: function(cfg)
    {
        cfg = cfg || {};

        var LimitsStore = new Ext.data.DirectStore({
            autoSave: true,
            autoDestroy: true,
            writer: new Ext.data.JsonWriter({
                encode: false,
                writeAllFields: true
            }),
            api: {
                read: Kdn.Direct.KmLimitsRead,
                update: Kdn.Direct.AccRefuellingUpdate
            },
            idProperty: 'VehicleId',
            fields: [
            'VehicleId',
            'GarageNumber',
            'Model',
            'Quantity',
            'RegistrationNumber',
            'KmLimit',
            'Km',
            'TripKm',
            'Diff'
            ],
            root: 'data'
        });

        var DetailsStore = new Ext.data.DirectStore({
            autoDestroy: true,
            api: {
                read: Kdn.Direct.KmLimitsDetailsRead
            },
            idProperty: 'WaybillId',
            fields: [
            'WaybillId',
            'ScheduleName',
            'DepartureDate',
            'DepartureCount',
            'ReturnCount',
            'StartKm',
            'EndKm',
            'Km'
            ],
            root: 'data'
        });



        Ext.apply(cfg, {
            layout: 'border',
            LimitsStore: LimitsStore,
            DetailsStore: DetailsStore,
            items: [
                {
                    region: 'center',
                    split: true,
                    xtype: 'grid',
                    view: new Ext.ux.grid.BufferView({
                        scrollDelay: false,
                        getRowClass: function(record, index)
                        {
                            var val = record.data.Diff;
                            return val > 50 ? 'green' : val >= 0 ? 'yellow' : 'red';
                        }
                    }),
                    plugins: [
				       'filterrow'
				    ],
                    columnLines: true,
                    loadMask: true,
                    stripeRows: true,
                    store: LimitsStore,
                    columns: [
                        {
                            header: 'Гар.№',
                            dataIndex: 'GarageNumber',
                            filter: {}
                        },
                        {
                            header: 'Марка',
                            dataIndex: 'Model',
                            width: 240,
                            filter: {}
                        },
                        {
                            header: 'Гос.№',
                            dataIndex: 'RegistrationNumber',
                            filter: {}
                        },
                        {
                            header: 'Лимит, км',
                            dataIndex: 'KmLimit'
                        },
                        {
                            header: 'Пробег, км',
                            dataIndex: 'Km'
                        },
                        {
                            header: 'Пробег в комм-ке, км',
                            dataIndex: 'TripKm',
                            width: 130
                        },
                        {
                            header: 'Остаток по лимиту, км',
                            dataIndex: 'Diff',
                            width: 130
                        }
                    ]
                },
                {
                    region: 'south',
                    height: 250,
                    split: true,
                    collapsible: true,
                    title: 'Детализация пробега',
                    xtype: 'grid',
                    columnLines: true,
                    loadMask: true,
                    stripeRows: true,
                    store: DetailsStore,
                    columns: [
                        {
                            header: '№ п.л.',
                            dataIndex: 'WaybillId'
                        },
                        {
                            header: 'Дата выезда',
                            dataIndex: 'DepartureDate',
                            width: 120,
                            format: 'd.m.Y H:i',
                            xtype: 'datecolumn'
                        },
                        {
                            header: 'График',
                            dataIndex: 'ScheduleName',
                            width: 170
                        },
                        {

                            header: 'Спидометр выезд, км',
                            dataIndex: 'DepartureCount',
                            width: 170
                        },
                        {
                            header: 'Спидометр приезд, км',
                            dataIndex: 'ReturnCount',
                            width: 170
                        },
                        {
                            header: 'Пробег, км',
                            dataIndex: 'Km'
                        }
                    ]
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
               'Период:',
               {
                   xtype: 'datefield',
                   plugins: 'monthPickerPlugin',
                   format: 'F Y',
                   value: new Date(),
                   width: 130,
                   listeners: {
                       scope: this,
                       select: this.reload
                   },
                   dataIndex: 'period'
               },
               '-',
               {
                   xtype: 'tbspacer',
                   width: 30
               },
            '-',
             {
                 xtype: 'button',
                 text: 'Отчёт',
                 iconCls: 'icon-blue-document-word',
                 handler: function()
                 {

                     var url = 'http://db2.lan.naftan.by/ReportServer/Pages/ReportViewer.aspx?/Transport/VehicleKmLimits&rs:Command=Render&rc:Toolbar=false&'

                     var o = {};
                     this.getTopToolbar().items.each(function(e)
                     {

                         if (e.dataIndex)
                         {
                             o[e.dataIndex] = e.getValue();
                         }

                     });

                     var params = {};
                     params['rs:Format'] = 'Excel';
                     params.month = o.period.getMonth() + 1;
                     params.year = o.period.getFullYear();

                     location.href = url + Ext.urlEncode(params);

                 },
                 scope: this
             },
             '-'
            ]
    })

    T.view.limit.VehicleKmLimits.superclass.constructor.call(this, cfg);


    this.items.items[0].getSelectionModel().on({
        selectionchange: this.onSelectionChange,
        scope: this
    });
    this.items.items[1].disable();


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
    this.LimitsStore.reload({ params: params });
},

onSelectionChange: function(sm)
{
    var rec = sm.getSelected();

    if (rec)
    {
        var params = this.getParams();
        params.VehicleId = rec.get('VehicleId');
        this.DetailsStore.reload({ params: params });
        this.items.items[1].getEl().unmask();
    }
    else
    {
        this.items.items[1].store.clearData();
        this.items.items[1].view.refresh();
        this.items.items[1].getEl().mask();
    }
}
});

Ext.reg('view.limit.vehiclekmlimits', T.view.limit.VehicleKmLimits);