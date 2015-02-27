T.view.report.ReoillingJournal = Ext.extend(Kdn.view.Report, {

   reportName: 'ReoillingJournalOperationalAccounting',

   params: [
             '-',
            'Дата:',
            {
               xtype:'datefield',
               dataIndex:'Date',
               value:new Date(),
               width:120
            },
            '-',
            'Производство:',
            {
                xtype: 'combo.department',
                enableClear: true,
                objectValue: false,
                width: 400,
                dataIndex: 'DepartmentId'
            },
            '-',
            'Колонна:',
            {
                xtype: 'combo.transportcolumn',
                enableClear: true,
                objectValue: false,
                width: 400,
                dataIndex: 'ColumnId',
                ref:'../column'
            },
            '-'
   ],

   buildReportParams: function (params) {
       var p = {};
       p.Date = params.Date;
       p.DepartmentId = params.DepartmentId || 0;
       if (p.DepartmentId == 9)
           p.ColumnId = params.ColumnId || 0;
       else {
           p.ColumnId = 0;
           this.column.clearValue();
       }
       return p;
   }
        
});

Ext.reg('view.report.reoillingjournal', T.view.report.ReoillingJournal);
