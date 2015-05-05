

T.view.report.ExpenseVehicle = Ext.extend(Kdn.view.Report, {

    reportName: 'ExpenseVehicle',

    params: [
       '-',
            'Гаражный №',
            {
                xtype: 'numberfield',
                dataIndex: 'garagenumber'
            },
            '-',
            'Период c:',
            {
                xtype: 'datefield',
                plugins: 'monthPickerPlugin',
                format: 'F Y',
                width: 250,
                dataIndex: 'start',
                value: new Date(),
                width: 120
            },
            '-',
            'Период по:',
            {
                xtype: 'datefield',
                plugins: 'monthPickerPlugin',
                format: 'F Y',
                width: 250,
                dataIndex: 'end',
                value: new Date(),
                width: 120
            },
   ],

    buildReportParams: function(params) {
        var p = {};
        p.start = params.start.getFullYear() * 100 + params.start.getMonth() + 1;
        p.end = params.end.getFullYear() * 100 + params.end.getMonth() + 1;
        p.garagenumber = params.garagenumber;        
        p.ownerId = 1;
        return p;
    }

});


Ext.reg('view.report.expensevehicle', T.view.report.ExpenseVehicle);