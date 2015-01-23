T.view.report.CarInfo = Ext.extend(Kdn.view.Report, {
    reportName: 'CarInfo',

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

    Ext.reg('view.report.carinfo', T.view.report.CarInfo);