T.view.report.WorkCoefficient = Ext.extend(Kdn.view.Report, {
    reportName: 'WorkCoefficient',

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

    Ext.reg('view.report.workcoefficient', T.view.report.WorkCoefficient);