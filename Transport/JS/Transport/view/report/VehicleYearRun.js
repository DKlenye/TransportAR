
T.view.report.VehicleYearRun = Ext.extend(Kdn.view.Report, {

    reportName: 'VehicleYearRun',

    params: [
       '-',
            'Год:',
            {
                xtype: 'numberfield',
                dataIndex: 'year'
            }
   ]

});

        Ext.reg('view.report.vehicleyearrun', T.view.report.VehicleYearRun);