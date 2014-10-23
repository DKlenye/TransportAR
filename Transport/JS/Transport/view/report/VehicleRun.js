
T.view.report.VehicleRun = Ext.extend(Kdn.view.Report, {

reportName: 'VehicleRun',

    params: [
       '-',
            'Гаражный №:',
            {
                xtype: 'numberfield',
                dataIndex: 'garagenumber'
            },
            '-',
            'C:',
            {
                xtype: 'datefield',
                dataIndex: 'startDate'
            },
            '-',
            'По:',
            {
                xtype: 'datefield',
                dataIndex: 'endDate'
            },
            '-'
   ],

    buildReportParams: function(params) {
        var p = {};
        p.ownerId = 1,
        Ext.copyTo(p, params, 'startDate,endDate,garagenumber');
        return p;
    }

});

Ext.reg('view.report.vehiclerun', T.view.report.VehicleRun);