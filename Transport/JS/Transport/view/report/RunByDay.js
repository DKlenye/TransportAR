
T.view.report.RunByDay = Ext.extend(Kdn.view.Report, {
    reportName: 'RunByDay',

    params: [
        'Период:',
        {
            xtype: 'datefield',
            dataIndex: 'start',
            value: new Date(),
            width: 120
        },
        '-',
        {
            xtype: 'datefield',
            dataIndex: 'end',
            value: new Date(),
            width: 120
        }
    ]
});

Ext.reg('view.report.runbyday', T.view.report.RunByDay);