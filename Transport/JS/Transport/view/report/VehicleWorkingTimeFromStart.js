T.view.report.VehicleWorkingTimeFromStart = Ext.extend(Kdn.view.Report, {

    reportName: 'VehicleWorkingTimeFromStart',
   
   params:[
        '-',
        'Гаражные номера через запятую:',
            {
               xtype:'textfield',
               width:250,
               dataIndex:'garagenumbers'
            }
   ]
        
});

Ext.reg('view.report.vehicleworkingtimefromstart', T.view.report.VehicleWorkingTimeFromStart);