T.view.report.VehicleWorkKoefficient = Ext.extend(Kdn.view.Report, {

reportName: 'VehicleWorkKoefficient',

    params: [
            '-',
            'C:',
        {
            xtype: 'datefield',
            dataIndex: 'start',
            value: new Date(),
            width: 130
        },
        'По',
        {
            xtype: 'datefield',
            dataIndex: 'end',
            value: new Date(),
            width: 130
        },
            'Группа',
            {
                xtype: 'combo.reportgroup',
                dataIndex: 'groupId',
                objectValue:false,
                enableClear:true
            }   

   ],

   buildReportParams: function(params) {
        var p = {};
       Ext.copyTo(p, params, "start,end");
        p.groupId = params.groupId || 0;
        return p;
    }

});

Ext.reg('view.report.vehicleworkkoefficient', T.view.report.VehicleWorkKoefficient);

