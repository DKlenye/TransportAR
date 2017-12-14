T.view.report.TransportQuarterConsumption = Ext.extend(Kdn.view.Report,{

    reportName: 'TransportQuarterConsumption',
   
    params: [
            
        '-',
        {
            xtype: 'daterangefield2',
            dataIndex: 'date',
            value: new Date()
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
       p.monthStart = params.date.start.getMonth() + 1;
       p.monthEnd = params.date.end.getMonth() + 1;
       p.year = params.date.start.getFullYear();
       p.columns = params.columns.join(',');
       p.format = params.format;
       return p;
   }
        
});

Ext.reg('view.report.transportquarterconsumption', T.view.report.TransportQuarterConsumption);