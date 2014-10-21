
T.view.report.VehicleWorkFromStart = Ext.extend(Kdn.view.Report, {

reportName: 'VehicleWorkFromStart',

    params: [
       '-',
            'На дату:',
            {
               xtype:'datefield',
               dataIndex:'date',
               value:new Date(),
               width:120
            }
   ]

});

Ext.reg('view.report.vehicleworkfromstart', T.view.report.VehicleWorkFromStart);