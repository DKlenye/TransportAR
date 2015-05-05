T.view.report.TechnicalCoefficient = Ext.extend(Kdn.view.Report, {
    reportName: 'TechnicalCoefficient',

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
        },
        '-',
        {
            fieldLabel: 'Показывать по группам',
            labelWidth: 140,
            xtype: 'checkbox',
            dataIndex: 'inGroup',
            checked: true
        }

    ]

});

    Ext.reg('view.report.technicalcoefficient', T.view.report.TechnicalCoefficient);