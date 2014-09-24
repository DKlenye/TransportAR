T.view.report.BatteryUmtuGN = Ext.extend(Kdn.view.Report, {

reportName: 'BatteryUmtuGN',

    params: [
            '-',
            'Гар.№:',
            {
                xtype: 'numberfield',
                dataIndex: 'GarageNumber',
                width: 120
            }
   ]

});

Ext.reg('view.report.batteryumtugn', T.view.report.BatteryUmtuGN);

