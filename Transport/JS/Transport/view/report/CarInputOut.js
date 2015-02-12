T.view.report.CarInputOut = Ext.extend(Kdn.view.Report, {
    reportName: 'CarInputOut',

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

    Ext.reg('view.report.carinputout', T.view.report.CarInputOut);