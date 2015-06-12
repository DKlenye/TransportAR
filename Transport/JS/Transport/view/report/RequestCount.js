T.view.report.RequestCount = Ext.extend(Kdn.view.Report,{
   
   reportName:'RequestCount',
   
   params:[
        '-',
        'Период c:',
            {
               xtype:'datefield',              
               width:120,
               dataIndex:'startDate',
               value:new Date(),
               width:120
            },
          '-',
          'по:',
            {
               xtype:'datefield',              
               width:120,
               dataIndex:'endDate',
               value:new Date(),
               width:120
            }
   ]
        
});

Ext.reg('view.report.requestcount', T.view.report.RequestCount);