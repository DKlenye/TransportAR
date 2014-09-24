T.view.report.TireWarrantlyEnd = Ext.extend(Kdn.view.Report, {

reportName: 'TireWarrantlyEnd',

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

Ext.reg('view.report.tirewarrantlyend', T.view.report.TireWarrantlyEnd);

