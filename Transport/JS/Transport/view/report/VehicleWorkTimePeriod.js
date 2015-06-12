T.view.report.VehicleWorkTimePeriod = Ext.extend(Kdn.view.Report, {

    reportName: 'VehicleWorkingTimePeriod',

    params: [
        '-',
        'Период c:',
            {
                xtype: 'datefield',
                width: 120,
                dataIndex: 'start',
                value: new Date(),
                width: 120
            },
          '-',
          'по:',
            {
                xtype: 'datefield',
                width: 120,
                dataIndex: 'end',
                value: new Date(),
                width: 120
            },
            '-',
        'Гаражные номера через запятую:',
            {
                xtype: 'textfield',
                width: 250,
                dataIndex: 'garagenumbers'
            }
   ]

});

Ext.reg('view.report.vehicleworktimeperiod', T.view.report.VehicleWorkTimePeriod);