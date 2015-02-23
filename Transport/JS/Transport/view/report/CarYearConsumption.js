T.view.report.CarYearConsumption = Ext.extend(Kdn.view.Report, {

    reportName: 'CarYearConsumption',

    params: [
            '-',
            'Год:',
            {
                xtype: 'numberfield',
                width: 100,
                dataIndex: 'year',
                value:new Date().getFullYear()
            },
            '-'
   ]

});

Ext.reg('view.report.caryearconsumption', T.view.report.CarYearConsumption);

