T.view.report.VehiclesWork = Ext.extend(Kdn.view.Report, {

    reportName: 'VehiclesWork',
   
   params:[
        '-',
         'C:',
        {
            xtype: 'datefield',
            dataIndex: 'start',
            value: new Date(),
            width: 130
        },
        'По',
        {
            xtype: 'datefield',
            dataIndex: 'end',
            value: new Date(),
            width: 130
        },

        'Гаражные номера через запятую:',
            {
               xtype:'textfield',
               width:250,
               dataIndex:'garageNumbers'
            }
   ]
        
});

       Ext.reg('view.report.vehicleswork', T.view.report.VehiclesWork);