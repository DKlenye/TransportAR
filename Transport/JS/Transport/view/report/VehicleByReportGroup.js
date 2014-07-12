
T.view.report.VehicleByReportGroup = Ext.extend(Kdn.view.Report, {

reportName: 'VehicleByReportGroup',

    params: [
       '-',
            'Дата:',
            {
               xtype:'datefield',
               width:250,
               dataIndex:'targetDate',
               value:new Date(),
               width:120
            }
   ]

});

Ext.reg('view.report.vehiclebyreportgroup', T.view.report.VehicleByReportGroup);