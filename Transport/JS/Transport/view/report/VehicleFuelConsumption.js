T.view.report.VehicleFuelConsumption = Ext.extend(Kdn.view.Report,{
    reportName: 'VehicleFuelConsumption',
    params: [
        '-',
        {
            xtype: 'daterangefield',
            dataIndex: 'date',
            value: new Date()
        },
        '-',
        'Подразделение:',
        {
            xtype: 'combo.department',
            objectValue: false,
            width: 400,
            dataIndex: 'department',
            objectValue:false
        }
    ],
    
    buildReportParams: function (params) {

        var p = {};
        p.department = params.department;
        p.start = params.date.start;
        p.end = params.date.end;
        p.owner = 1;
        p.format = params.format;
        return p;
    }
    


});

Ext.reg('view.report.vehiclefuelconsumption', T.view.report.VehicleFuelConsumption);