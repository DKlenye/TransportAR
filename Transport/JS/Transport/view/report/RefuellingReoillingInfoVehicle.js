T.view.report.RefuellingReoillingInfoVehicle = Ext.extend(Kdn.view.Report, {

   reportName: 'RefuellingReoillingInfoVehicle',
   
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
                dataIndex: 'Start',
                value: new Date().getFirstDateOfMonth().clearTime()
            },
            '-',
            'По:',
            {
                xtype: 'datefield',
                dataIndex: 'End',
                value: new Date().clearTime()
            }
   ]
});

Ext.reg('view.report.refuellingreoillinginfovehicle', T.view.report.RefuellingReoillingInfoVehicle);