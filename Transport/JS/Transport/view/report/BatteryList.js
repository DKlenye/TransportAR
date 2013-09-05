T.view.report.BatteryList = Ext.extend(Kdn.view.Report, {

reportName: 'BatteryList',

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

Ext.reg('view.report.batterylist', T.view.report.BatteryList);

