T.view.report.TireUmtuGN = Ext.extend(Kdn.view.Report, {

reportName: 'TireUmtuGN',

    params: [
            '-',
            'Гар.№:',
            {
                xtype: 'numberfield',
                dataIndex: 'garageNumber',
                width: 120
            }
   ]

});

Ext.reg('view.report.tireumtugn', T.view.report.TireUmtuGN);

