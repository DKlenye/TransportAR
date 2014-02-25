
T.view.report.VehicleDayWork = Ext.extend(Kdn.view.Report, {

reportName: 'VehicleDayWork',

    params: [
       '-',
       
            'Гаражный №',
            {
                xtype:'numberfield',
                dataIndex:'garageNumber'
            },
            'Период:',
            {
               xtype:'datefield',
               width:250,
               dataIndex:'start',
               value:new Date(),
               width:120
            },
            '-', 
            {
               xtype:'datefield',
               width:250,
               dataIndex:'end',
               value:new Date(),
               width:120
           },
           '-'
   ]

});

Ext.reg('view.report.vehicledaywork', T.view.report.VehicleDayWork);