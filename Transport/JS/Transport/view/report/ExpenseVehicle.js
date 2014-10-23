

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
            'Период:',
            {
                xtype: 'datefield',
                plugins: 'monthPickerPlugin',
                format: 'F Y',
                width: 250,
                dataIndex: 'period',
                value: new Date(),
                width: 120
            },
            '-'
   ],

    buildReportParams: function(params) {
        var p = {};
        p.month = params.period.getMonth() + 1;
        p.year = params.period.getFullYear();
        p.garagenumber = params.garagenumber;
        p.ownerId = 1;
        return p;
    }

});


Ext.reg('view.report.expensevehicle', T.view.report.ExpenseVehicle);