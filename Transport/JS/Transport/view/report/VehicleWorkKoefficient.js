T.view.report.VehicleWorkKoefficient = Ext.extend(Kdn.view.Report, {

reportName: 'VehicleWorkKoefficient',

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
            'Группа',
            {
                xtype:'combo.accgroup',
                dataIndex: 'groupId',
                objectValue:false,
                enableClear:true
            }   

   ],

   buildReportParams: function(params) {
        var p = {};
        p.month = params.period.getMonth() + 1;
        p.year = params.period.getFullYear();
        p.groupId = params.groupId || 0;
        return p;
    }

});

Ext.reg('view.report.vehicleworkkoefficient', T.view.report.VehicleWorkKoefficient);

