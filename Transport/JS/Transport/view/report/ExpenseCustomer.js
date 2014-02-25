
T.view.report.ExpenseCustomer = Ext.extend(Kdn.view.Report, {

reportName: 'ExpenseCustomer',

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
            'Заказчик:',
            {
                xtype: 'combo.customer',
                dataIndex: 'customerId',
                objectValue: false,
                width: 300
            },
            'Код затрат:',
            {
                xtype: 'textfield',
                dataIndex: 'costCode',
                objectValue: false,
                width: 120
            },
            {
                xtype: 'combo',
                width: 200,
                typeAhead: true,
                triggerAction: 'all',
                lazyRender: true,
                mode: 'local',
                store: new Ext.data.ArrayStore({
                    fields: ['id', 'name'],
                    data: [[0, 'Общая'], [1, 'Бухгалтерия ОАО"Нафтан"'], [2, 'Бухгалтерия ОАО"Полиимр"']]
                }),
                value: 0,
                valueField: 'id',
                displayField: 'name',
                dataIndex: 'accountingId'
            }
   ],

    buildReportParams: function(params) {
        var p = {};
        p.month = params.period.getMonth() + 1;
        p.year = params.period.getFullYear();

        p.customerId = (!!params.costCode) ? 0 : params.customerId.CustomerId;
        p.costcode = params.costCode || " ";
        p.accountingId = params.accountingId;

        return p;
    }

});

Ext.reg('view.report.expensecustomer', T.view.report.ExpenseCustomer);
