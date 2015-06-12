T.view.report.DriversWorkingTime = Ext.extend(Kdn.view.Report, {

reportName: 'DriversWorkingTime',

    params: [
        '-',
            'Период:',
            {
                xtype: 'datefield',
                plugins: 'monthPickerPlugin',
                format: 'F Y',
                width: 250,
                dataIndex: 'period',
                value: new Date(),
                width: 120
            },
            '-',
            'Водитель',
            {
                xtype: 'combo.driver',
                objectValue: false,
                enableClear:true,
                width: 400,
                dataIndex: 'driverId'
            }
   ],

    buildReportParams: function(params) {
        return {
            format:params.format,
            month:params.period.getMonth()+1,
            year:params.period.getFullYear(),
            driverId: (params.driverId || {}).DriverId || 0
        };
    }

});

Ext.reg('view.report.driverworkingtime', T.view.report.DriversWorkingTime);

