
T.view.report.ExpenseListByYear = Ext.extend(Kdn.view.Report, {

    reportName: 'ExpenseListByYear',

    params: [
       '-',
            'Год:',
            {
                xtype: 'numberfield',
                dataIndex: 'year',
                value: new Date().getFullYear(),
                width: 120
            }
   ]

});

Ext.reg('view.report.expenselistbyyear', T.view.report.ExpenseListByYear);
