
T.view.report.WaybillDateErrors = Ext.extend(Kdn.view.Report, {

reportName: 'WaybillDateErrors',

    params: [
        '-',
            'Период:',
            {
                xtype: 'datefield',
                plugins: 'monthPickerPlugin',
                format: 'F Y',
                width: 250,
                dataIndex: 'period',
                value: new Date(),
                width: 120
            }
   ],

    buildReportParams: function(params) {
        var p = {};
        p.month = params.period.getMonth() + 1;
        p.year = params.period.getFullYear();
        Ext.copyTo(p, params, 'accountingId');

        return p;
    }

});

Ext.reg('view.report.waybilldateerrors', T.view.report.WaybillDateErrors);