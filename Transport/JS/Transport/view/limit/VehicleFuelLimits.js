T.view.limit.VehicleFuelLimits = Ext.extend(Ext.grid.GridPanel, {
    constructor: function(cfg)
    {
        cfg = cfg || {};

        var store = new Ext.data.DirectStore({
            autoDestroy: true,
            api: {
                read: Kdn.Direct.FuelLimitsRead
            },
            idProperty: 'VehicleId',
            fields: [
            'VehicleId',
            'GarageNumber',
            'Model',
            'RegistrationNumber',
            'FuelLimit',
            'Quantity',
            'Consumption',
            'Diff'
            ],
            root: 'data'
        });



        Ext.apply(cfg, {
            store:store,
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
                            header: 'Лимит, л',
                            dataIndex: 'FuelLimit'
                        },
                        {
                            header: 'Заправлено, л',
                            dataIndex: 'Quantity'
                        },
                        {
                            header: 'Расход в комм-ке, л',
                            dataIndex: 'Consumption',
                            width: 130
                        },
                        {
                            header: 'Остаток по лимиту, л',
                            dataIndex: 'Diff',
                            width: 130
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
               '-'
            ]
    })

    T.view.limit.VehicleFuelLimits.superclass.constructor.call(this, cfg);

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
}
});

Ext.reg('view.limit.vehiclefuellimits', T.view.limit.VehicleFuelLimits);