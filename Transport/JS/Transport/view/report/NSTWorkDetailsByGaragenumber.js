T.view.report.NSTWorkDetailsByGarageNumber = Ext.extend(Kdn.view.Report, {
   
    reportName: 'NSTWorkDetailsByGarageNumber',
   
    params: [
        'Гаражные номера через запятую',
        {
            xtype: 'textfield',
            dataIndex:'garagenumbers'
        },

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
       p.garagenumbers = params.garagenumbers;
       p.format = params.format;
       return p;
   }
        
});

Ext.reg('view.report.nstworkdetailsbygaragenumber', T.view.report.NSTWorkDetailsByGarageNumber);