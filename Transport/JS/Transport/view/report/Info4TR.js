T.view.report.Info4TR = Ext.extend(T.view.report.AccFuelObReport, {
    reportName: '4TRInfo',

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
            'Код затрат:',
            {
                xtype: 'numberfield',
                dataIndex: 'debet',
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

        p.debet = (!params.debet) ? '90' : params.debet;
        p.accountingId = params.accountingId;

        return p;
    }
  
    
});
Ext.reg('view.report.4trinfo', T.view.report.Info4TR);
