T.view.report.VehicleFuelConsumptionFactNorm = Ext.extend(Kdn.view.Report, {
   
   reportName:'VehicleFuelConsumptionFactNorm',
   
   params:[
        '-',
        'C:',
            {
                xtype: 'datefield',
                dataIndex: 'start',
                value: new Date(),
                width: 120
            },
            'По:',
            {
                xtype: 'datefield',
                dataIndex: 'end',
                value: new Date(),
                width: 120
            },
            ' ',
            'Предел, л:',
            {
                xtype: 'numberfield',
                dataIndex: 'diff'
            }
   ]
        
});

Ext.reg('view.report.vehiclefuelconsumptionfactnorm', T.view.report.VehicleFuelConsumptionFactNorm);
