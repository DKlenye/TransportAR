T.view.report.ServiceWaybillCount = Ext.extend(Kdn.view.Report, {
   
   reportName:'ServiceWaybillCount',
   
   params:[
        '-',
            'Период:',
            {
               xtype:'datefield',
               plugins:'monthPickerPlugin',
               format:'F Y',
               dataIndex:'period',
               value:new Date(),
               width:120
            }
   ],
   
   buildReportParams:function(params){
        var p = {}; 
        p.month = params.period.getMonth()+1;
        p.year = params.period.getFullYear();
        return p;        
    }
        
});

Ext.reg('view.report.servicewaybillcount', T.view.report.ServiceWaybillCount);