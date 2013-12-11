T.view.report.VehicleNorms = Ext.extend(Kdn.view.Report,{
   
   reportName:'VehicleNorms',
   
   params:[
        '-',
        'Дата:',
            {
               xtype:'datefield',
               dataIndex:'date',
               value:new Date(),
               width:120
            },
          '-'
   ]
});

Ext.reg('view.report.vehiclenorms', T.view.report.VehicleNorms);