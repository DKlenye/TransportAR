T.view.report.ExpenseCode = Ext.extend(Kdn.view.Report, {

reportName: 'ExpenseCostCode',

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
    /*{
    xtype:'combo',
    width:200,
    typeAhead: true,
    triggerAction: 'all',
    lazyRender:true,
    mode: 'local',
    store: new Ext.data.ArrayStore({
    fields: ['id','name'],
    data: [[0,'Общая'],[1,'Бухгалтерия ОАО"Нафтан"'],[2,'Бухгалтерия ОАО"Полиимр"']]
    }),
    value:0,
    valueField: 'id',
    displayField: 'name', 
    dataIndex:'accountingId'                
    },    */
            'Код затрат:',
            {
                xtype: 'numberfield',
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
            },
            {
                xtype: 'combo.accgroup',
                objectValue: false,
                enableClear: true,
                dataIndex: 'accGroupId'
            }
   ],

    buildReportParams: function(params) {
        var p = {};
        p.month = params.period.getMonth() + 1;
        p.year = params.period.getFullYear();
        p.accGroupId = params.accGroupId || 0;
        Ext.copyTo(p, params, 'costCode,accountingId');

        return p;
    }

});

Ext.reg('view.report.expensecode', T.view.report.ExpenseCode);



