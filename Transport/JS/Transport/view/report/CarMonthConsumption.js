T.view.report.CarMonthConsumption = Ext.extend(Kdn.view.Report, {
    reportName: 'CarMonthConsumption',

    params: [
        '-',
        'С:',
        {
            xtype: 'datefield',
            width: 100,
            value: new Date(),
            dataIndex: 'start'
        },
        '-',
        'По',
        {
            xtype: 'datefield',
            width: 100,
            value: new Date(),
            dataIndex: 'end'
        }
    ]

});

        Ext.reg('view.report.carmonthconsumption', T.view.report.CarMonthConsumption);

