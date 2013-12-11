T.view.report.VehicleNotUsing = Ext.extend(Kdn.view.Report,{
   
   reportName:'VehicleNotUsing',
   
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

Ext.reg('view.report.vehiclenotusing', T.view.report.VehicleNotUsing);
