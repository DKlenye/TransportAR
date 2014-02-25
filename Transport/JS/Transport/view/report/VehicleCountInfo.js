
T.view.report.VehicleCountInfo = Ext.extend(Kdn.view.Report, {

reportName: 'VehicleCountInfo',

params: [

       '-',
       'На дату',
       {
               xtype:'datefield',
               width:250,
               dataIndex:'date',
               value:new Date(),
               width:120
           },
           '-',
        {
            xtype: 'combo',
            width: 200,
            typeAhead: true,
            triggerAction: 'all',
            lazyRender: true,
            mode: 'local',
            store: new Ext.data.ArrayStore({
                fields: ['id', 'name'],
                data: [[0, 'Весь транспорт'], [1, 'Цех 46']]
            }),
            value: 0,
            valueField: 'id',
            displayField: 'name',
            dataIndex: 'ceh46'
        }
   ]

});

Ext.reg('view.report.vehiclecountinfo', T.view.report.VehicleCountInfo);