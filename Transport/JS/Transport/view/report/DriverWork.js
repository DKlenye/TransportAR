T.view.report.DriverWork = Ext.extend(Kdn.view.Report, {

reportName: 'DriverWork',

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
            {
                xtype: 'combo.driver',
                objectValue: false,
                width: 400,
                dataIndex: 'driverId'
            }
   ],

    buildReportParams: function(params) {
        var p = {};
        p.month = params.period.getMonth() + 1;
        p.year = params.period.getFullYear();
        p.driverId = params.driverId.DriverId;

        return p;
    }

});

Ext.reg('view.report.driverwork', T.view.report.DriverWork);

