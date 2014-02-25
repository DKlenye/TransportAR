T.view.report.VehicleWorkSummary = Ext.extend(Kdn.view.Report,{
   
   reportName:'VehicleWorkSummary',
   
   params:[
        '-',
        'Период:',
            {
               xtype:'datefield',
               dataIndex:'start',
               value:new Date(),
               width:120
            },
          '-',
          {
               xtype:'datefield',
               dataIndex:'end',
               value:new Date(),
               width:120
            },
            '-',
            'Гар.№',
            {
               xtype:'numberfield',
               dataIndex:'garegeNumber',
               width:100
            }
   ]
        
});

Ext.reg('view.report.vehicleworksummary', T.view.report.VehicleWorkSummary);