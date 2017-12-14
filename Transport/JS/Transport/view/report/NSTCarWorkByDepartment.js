T.view.report.NSTCarWorkByDepartment = Ext.extend(Kdn.view.Report, {
    reportName: 'NSTCarWorkByDepartment',
    
    params: [
       '-',

       {
           xtype: 'daterangefield',
           dataIndex: 'date',
           value: new Date()
       },
         '-',
        'Показать детализацию',
        {
            labelWidth: 150,
            xtype: 'checkbox',
            dataIndex: 'showDetails',
            checked: true
        }

    ],

    buildReportParams: function (params) {
        var p = {};
        p.start = params.date.start;
        p.end = params.date.end;
        p.format = params.format;
        p.showDetails = !!params.showDetails ? 1 : 0;
        return p;
    }
});

Ext.reg('view.report.nstcarworkbydepartment', T.view.report.NSTCarWorkByDepartment);