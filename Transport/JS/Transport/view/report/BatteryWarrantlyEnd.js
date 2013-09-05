T.view.report.BatteryWarrantlyEnd = Ext.extend(Kdn.view.Report, {

reportName: 'BatteryWarrantlyEnd',

    params: [
            '-',
            'Колонна:',
            {
                xtype: 'combo.transportcolumn',
                enableClear:true,
                objectValue: false,
                width: 400,
                dataIndex: 'ColumnId'
            },
            '-'
   ],

    buildReportParams: function(params) {
        var p = {};
        if(params.ColumnId){
            p.ColumnId = params.ColumnId;
        }
        return p;
    }

});

Ext.reg('view.report.batterywarrantlyend', T.view.report.BatteryWarrantlyEnd);

