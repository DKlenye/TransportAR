

T.view.report.VehiclePerformance = Ext.extend(Kdn.view.Report, {
    reportName: 'VehiclePerformance',

    params: [
        '-',
        {
            xtype: 'daterangefield',
            dataIndex: 'date',
            value: new Date()
        },
        '-',
        'Колонна:',
        {
            xtype: 'combo.multicolumn',
            objectValue: false,
            width: 200,
            dataIndex: 'columns'
        },
        '-',
        {
            fieldLabel: 'Показывать детализацию',
            labelWidth: 150,
            xtype: 'checkbox',
            dataIndex: 'withDetails',
            checked: true
        }
    ],

    buildReportParams: function(params) {
        var p = {};
        p.columns = params.columns.join(',') || " ",
            p.start = params.date.start;
        p.end = params.date.end;
        p.withDetails = !!params.withDetails ? 1 : 0;
        return p;
    }

});


Ext.reg('view.report.vehicleperformance', T.view.report.VehiclePerformance);