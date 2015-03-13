T.view.report.RefuellingReoillingInfoVehicle = Ext.extend(Kdn.view.Report, {

   reportName: 'RefuellingReoillingInfoVehicle',
   
   params:[
        '-',
        'Гаражный №:',
            {
                xtype: 'numberfield',
                dataIndex: 'GarageNumber'
            },
          '-'
   ]
});

Ext.reg('view.report.refuellingreoillinginfovehicle', T.view.report.RefuellingReoillingInfoVehicle);