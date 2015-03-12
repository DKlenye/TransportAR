T.view.report.TruckEffiency = Ext.extend(Kdn.view.Report, {
    reportName: 'TruckEffiency',

    params: [
        '-',
        'Год',
        {
            xtype: 'numberfield',
            dataIndex: 'year',
            value: new Date().getFullYear(),
            width: 120
        }
    ]

});

    Ext.reg('view.report.truckeffiency', T.view.report.TruckEffiency);