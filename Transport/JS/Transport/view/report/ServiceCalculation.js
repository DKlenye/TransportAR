
T.view.report.ServiceCalculation = Ext.extend(Kdn.view.Report, {

reportName: 'ServiceCalculation',

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
            },
   ],

    buildReportParams: function(params) {
        var p = {};
        p.month = params.period.getMonth() + 1;
        p.year = params.period.getFullYear();
        return p;
    }

});

Ext.reg('view.report.servicecalculation', T.view.report.ServiceCalculation);
