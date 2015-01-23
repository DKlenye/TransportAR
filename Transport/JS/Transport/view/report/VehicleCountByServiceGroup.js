T.view.report.VehicleCountByServiceGroup = Ext.extend(Kdn.view.Report, {
    reportName: 'VehicleCountByServiceGroup',

    params: [
        '-',
        'На дату',
        {
            xtype: 'datefield',
            width: 250,
            dataIndex: 'date',
            value: new Date(),
            width: 120
        }
    ]

});

Ext.reg('view.report.vehiclecountbyservicegroup', T.view.report.VehicleCountByServiceGroup);