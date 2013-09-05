

T.view.report.Expense90 = Ext.extend(Kdn.view.Report, {

    reportName: 'Expense90',

    params: [
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
            '-',
            {
                xtype: 'combo',
                width: 200,
                typeAhead: true,
                triggerAction: 'all',
                lazyRender: true,
                mode: 'local',
                store: new Ext.data.ArrayStore({
                    fields: ['code', 'costCode'],
                    data: [['90090160', 'Сторонние(90090160)'], ['90440160', 'Населению(90440160)'], ['90260160', 'Услуги(90260160)'], ['90810100', 'Ритуальные(90810100)'], ['90644500', 'Аренда(90644500)']]
                }),
                value: '90090160',
                valueField: 'code',
                displayField: 'costCode',
                dataIndex: 'costCode'
            }
   ],

    buildReportParams: function(params) {
        var p = {};
        p.month = params.period.getMonth() + 1;
        p.year = params.period.getFullYear();
        Ext.copyTo(p, params, 'costCode');

        return p;
    }

});

Ext.reg('view.report.expense90', T.view.report.Expense90)

