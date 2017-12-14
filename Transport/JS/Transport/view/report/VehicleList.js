T.view.report.VehicleList = Ext.extend(Kdn.view.Report,{
    reportName: 'VehicleList',
    params: [
        'Колонна:',
        {
            xtype: 'combo.multicolumn',
            objectValue: false,
            width: 400,
            dataIndex: 'columns'
        }
    ],
    
    buildReportParams: function (params) {

        var p = {};
        p.columns = params.columns.join(',');
        p.format = params.format;
        return p;
    }
    


});

Ext.reg('view.report.vehiclelist', T.view.report.VehicleList);