T.view.report.VehicleWorkList = Ext.extend(Kdn.view.Report, {
    reportName: 'VehicleWorkList',

    params: [
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
        '-',
        'Колонна:',
        {
            xtype: 'combo.multicolumn',
            objectValue: false,
            width: 400,
            dataIndex: 'columns'
        },
        '-',
        {
            fieldLabel: 'Показывать по группам',
            labelWidth:140,
            xtype:'checkbox',
            dataIndex: 'showInGroup',
            checked:true
        }
        
    ],

    buildReportParams: function(params) {
        var p = {};
        p.start = params.start;
        p.end = params.end;
        p.columns = params.columns.join(',');
        p.showInGroup = params.showInGroup;
        return p;
    }

});

Ext.reg('view.report.vehicleworklist', T.view.report.VehicleWorkList);

