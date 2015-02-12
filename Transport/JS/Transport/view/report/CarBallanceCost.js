T.view.report.CarBallanceCost = Ext.extend(Kdn.view.Report, {
    reportName: 'CarBalanceCost',

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

    Ext.reg('view.report.carballancecost', T.view.report.CarBallanceCost);