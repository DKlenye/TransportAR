
T.view.report.VehicleWork = Ext.extend(Kdn.view.Report, {

reportName: 'VehicleWork',

    params: [
       '-',
            'Период:',
            {
               xtype:'datefield',
               plugins:'monthPickerPlugin',
               format:'F Y',
               width:250,
               dataIndex:'period1',
               value:new Date(),
               width:120
            },
            '-', 
            {
               xtype:'datefield',
               plugins:'monthPickerPlugin',
               format:'F Y',
               width:250,
               dataIndex:'period2',
               value:new Date(),
               width:120
           },
            '-'
   ],

    buildReportParams: function(params) {
        var p = {};
        p.month1 = params.period1.getMonth() + 1;
        p.year1 = params.period1.getFullYear();
        p.month2 = params.period2.getMonth() + 1;
        p.year2 = params.period2.getFullYear();
        return p;
    }

});

Ext.reg('view.report.vehiclework', T.view.report.VehicleWork);