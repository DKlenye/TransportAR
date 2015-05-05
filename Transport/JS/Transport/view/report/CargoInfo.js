T.view.report.CargoInfo = Ext.extend(Kdn.view.Report, {
    reportName: 'CargoInfo',

    params: [
        '-',
        'c',
        {
            xtype: 'datefield',
            dataIndex: 'start',
            value: new Date(),
            width: 120
        },
        '-',
        'по',
        {
            xtype: 'datefield',
            dataIndex: 'end',
            value: new Date(),
            width: 120
        }
    ]

});

    Ext.reg('view.report.cargoinfo', T.view.report.CargoInfo);