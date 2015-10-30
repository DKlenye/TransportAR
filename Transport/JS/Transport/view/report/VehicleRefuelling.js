T.view.report.VehicleRefuelling = Ext.extend(Kdn.view.Report, {

   reportName: 'VehicleRefuelling',
   
   params:[
        '-',
        'Гаражный №:',
            {
                xtype: 'numberfield',
                dataIndex: 'GarageNumber'
            },
          '-',
           'C:',
            {
                xtype: 'datefield',
                dataIndex: 'start',
                value: new Date().getFirstDateOfMonth().clearTime()
            },
            '-',
            'По:',
            {
                xtype: 'datefield',
                dataIndex: 'end',
                value: new Date().clearTime()
            }
   ]
});

        Ext.reg('view.report.vehiclerefuelling', T.view.report.VehicleRefuelling);