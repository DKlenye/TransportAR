T.view.report.AverageConsumption = Ext.extend(Kdn.view.Report, {

    reportName: 'AverageConsumption',

params: [
        'C:',
            {
                xtype: 'datefield',
                dataIndex: 'start',
                value: new Date(),
                width:130
            },
            'По',
            {
                xtype: 'datefield',
                dataIndex: 'end',
                value: new Date(),
                width: 130
            },
   ]

});

        Ext.reg('view.report.averageconsumption', T.view.report.AverageConsumption);

