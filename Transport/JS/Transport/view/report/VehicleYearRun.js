
T.view.report.VehicleYearRun = Ext.extend(Kdn.view.Report, {

    reportName: 'VehicleYearRun',

    params: [
       '-',
            'Год:',
            {
                xtype: 'numberfield',
                dataIndex: 'year'
            },
        '-',
        'Колонна:',
        {
            xtype: 'combo.multicolumn',
            objectValue: false,
            width: 400,
            dataIndex: 'columns'
        }
    ],
    buildReportParams: function (params) {
        var p = {};
        p.year = params.year;
        p.columns = params.columns.join(',');
        p.format = params.format;
        return p;
    }

});

        Ext.reg('view.report.vehicleyearrun', T.view.report.VehicleYearRun);