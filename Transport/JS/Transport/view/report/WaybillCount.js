T.view.report.WaybillCount = Ext.extend(Kdn.view.Report, {

reportName  : 'WaybillCount',

params: [
        'C:',
            {
                xtype: 'datefield',
                dataIndex: 'startDate',
                value: new Date(),
                width:130
            },
            'По',
            {
                xtype: 'datefield',
                dataIndex: 'endDate',
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
            'По группам',
            {
                xtype:'checkbox',
                ref:'./isInGroups'
            }
   ],

            buildReportParams: function (params) {

                this.reportName = this.isInGroups.checked ? "WaybillCountByGroup" : "WaybillCount";

        var p = {};
        p.startDate = params.startDate;
        p.endDate = params.endDate;
        p.columns = params.columns.join(',');
        
        return p;  
    }

});

Ext.reg('view.report.waybillcount', T.view.report.WaybillCount);

