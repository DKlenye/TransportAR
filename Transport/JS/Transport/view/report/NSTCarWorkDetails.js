T.view.report.NSTCarWorkDetails = Ext.extend(Kdn.view.Report, {
   
    reportName: 'NSTCarWorkDetails',
   
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

Ext.reg('view.report.nstcarworkdetails', T.view.report.NSTCarWorkDetails);