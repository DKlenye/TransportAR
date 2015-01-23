T.view.report.ExpenseListByGroup = Ext.extend(T.view.report.AccFuelObReport, {
    reportName: 'ExpenseListByGroup',
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
                    fields: ['id', 'name'],
                    data: [[0, 'Общая'], [1, 'Бухгалтерия ОАО"Нафтан"'], [2, 'Бухгалтерия ОАО"Полимир"']]
                }),
                value: 0,
                valueField: 'id',
                displayField: 'name',
                dataIndex: 'accountingId'
            },
            '-',
            {
                xtype: 'combo',
                width: 120,
                typeAhead: true,
                triggerAction: 'all',
                lazyRender: true,
                mode: 'local',
                store: new Ext.data.ArrayStore({
                    fields: ['id', 'name'],
                    data: [[0, 'Все'], [1, 'Цех 46']]
                }),
                value: 0,
                valueField: 'id',
                displayField: 'name',
                dataIndex: 'c46only'
            }
   ],

    buildReportParams: function (params) {
        var p = {};
        p.month = params.period.getMonth() + 1;
        p.year = params.period.getFullYear();
        Ext.copyTo(p, params, 'accountingId,c46only');

        return p;
    }
});
Ext.reg('view.report.expenselistbygroup', T.view.report.ExpenseListByGroup);