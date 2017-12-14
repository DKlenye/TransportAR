T.view.report.NSTCarWork = Ext.extend(Kdn.view.Report, {
   
    reportName: 'NSTCarWork',
   
   params:[
        '-',
       
        {
            xtype: 'daterangefield',
            dataIndex: 'date',
            value: new Date()
        }
   ],
    
   buildReportParams: function (params) {
       var p = {};
       p.start = params.date.start;
       p.end = params.date.end;
       p.format = params.format;
       return p;
   }
        
});

Ext.reg('view.report.nstcarwork', T.view.report.NSTCarWork);