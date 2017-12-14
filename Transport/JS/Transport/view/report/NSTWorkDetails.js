T.view.report.NSTWorkDetails = Ext.extend(Kdn.view.Report, {
   
    reportName: '',
   
    params: [
        {
            xtype: 'daterangefield',
            dataIndex: 'date',
            value: new Date()
        },
        '-',
        {
            xtype: 'combo',
            mode: 'local',
            value:1,
            typeAhead: true,
            triggerAction: 'all',
            displayField: 'text',
            valueField: 'id',
            store: new Ext.data.ArrayStore({
                fields: ['id', 'text'],
                data: [[1,'Без детализации'],[2, 'Детализация по подразделениям'],[3,'Детализация по гаражным номерам']]
            }),
            dataIndex: 'reportType',
            width:250
        }
    
   ],
    
   buildReportParams: function (params) {
       var p = {};
       
       p.start = params.date.start;
       p.end = params.date.end;
       p.format = params.format;

       this.reportName = "NSTWorkDetails" + params.reportType;

       
       return p;
   }
        
});

Ext.reg('view.report.nstworkdetails', T.view.report.NSTWorkDetails);