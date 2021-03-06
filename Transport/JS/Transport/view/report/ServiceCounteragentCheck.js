T.view.report.ServiceCounteragentCheck = Ext.extend(Kdn.view.Report, {
    reportName: 'ServiceCounteragentCheck',

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

    buildReportParams:function(params){
        var p = {}; 
        p.month = params.period.getMonth()+1;
        p.year = params.period.getFullYear();
                
        return p;        
    }

});

        Ext.reg('view.report.servicecounteragentcheck', T.view.report.ServiceCounteragentCheck);