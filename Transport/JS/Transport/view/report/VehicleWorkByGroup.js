
T.view.report.VehicleWorkByGroup = Ext.extend(Kdn.view.Report, {

reportName: 'VehicleWorkByGroup',

    params: [
       '-',
            'Период:',
            {
               xtype:'datefield',
               width:250,
               dataIndex:'date1',
               value:new Date(),
               width:120
            },
            '-', 
            {
               xtype:'datefield',
               width:250,
               dataIndex:'date2',
               value:new Date(),
               width:120
           },
           '-'
   ]

});

Ext.reg('view.report.vehicleworkbygroup', T.view.report.VehicleWorkByGroup);