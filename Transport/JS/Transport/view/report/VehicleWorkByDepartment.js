
T.view.report.VehicleWorkByDepartment = Ext.extend(Kdn.view.Report, {

    reportName: 'VehicleWorkByDepartment',

    params: [
       '-',
            'Период:',
            {
               xtype:'datefield',
               dataIndex:'start',
               value:new Date(),
               width:120
            },
            '-', 
            {
               xtype:'datefield',
               dataIndex:'end',
               value:new Date(),
               width:120
           },
            '-',
            {
                xtype: 'combo.transportcolumn',
                dataIndex:'columnId',
                objectValue:false,
                enableClear:true
            }
   ],

    buildReportParams: function(params) {
        var p = {};
        p.start = params.start;
        p.end = params.end;
        p.columnId = params.columnId||0;
        return p;
    }

});

Ext.reg('view.report.vehicleworkbydepartment', T.view.report.VehicleWorkByDepartment);