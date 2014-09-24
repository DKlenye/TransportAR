T.view.report.TireList = Ext.extend(Kdn.view.Report, {

reportName: 'TireList',

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

Ext.reg('view.report.tirelist', T.view.report.TireList);

