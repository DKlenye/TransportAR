
T.view.report.ReoillingFact = Ext.extend(Kdn.view.Report, {

    reportName: 'ReoillingFact',

    params: [
       '-',
            'Месяц, год:',
            {
               xtype:'datefield',
               plugins:'monthPickerPlugin',
               format:'F Y',
               width:250,
               dataIndex:'period1',
               value:new Date()
            },
            '-'
   ],

    buildReportParams: function(params) {
        var p = {};
        p.month = params.period1.getMonth() + 1;
        p.year = params.period1.getFullYear();
        return p;
    }

});

Ext.reg('view.report.reoillingfact', T.view.report.ReoillingFact);