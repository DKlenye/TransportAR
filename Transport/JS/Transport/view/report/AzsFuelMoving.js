T.view.report.AzsFuelMoving = Ext.extend(Kdn.view.Report,{

    reportName: 'AzsFuelMoving',

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
            }
   ],

    buildReportParams: function (params) {
        var p = {};
        p.month = params.period.getMonth() + 1;
        p.year = params.period.getFullYear();

        Ext.copyTo(p, params, 'format');

        return p;
    }   
   
});

Ext.reg('view.report.azsfuelmoving', T.view.report.AzsFuelMoving);


T.view.report.AzsFuelMovingExt = Ext.extend(T.view.report.AzsFuelMoving, {
    reportName: 'AzsFuelMovingExt'
});

Ext.reg('view.report.azsfuelmovingext', T.view.report.AzsFuelMovingExt);