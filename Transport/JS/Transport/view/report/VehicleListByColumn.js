T.view.report.VehicleListByColumn = Ext.extend(Kdn.view.Report, {
   reportName:'VehicleListByColumn',
    params: [
            '-',
            'Колонна:',
            {
                xtype: 'combo.transportcolumn',
                enableClear:true,
                objectValue: false,
                width: 400,
                dataIndex: 'columnId'
            }
   ]   
});

Ext.reg('view.report.vehiclelistbycolumn', T.view.report.VehicleListByColumn);