T.view.report.OilNorms = Ext.extend(Kdn.view.Report,{

   reportName: 'OilNorms',

   params: [
            '-',
            'Колонна:',
            {
                xtype: 'combo.transportcolumn',
                enableClear: true,
                objectValue: false,
                width: 400,
                dataIndex: 'column'
            },
            '-'
   ],

   buildReportParams: function (params) {
       var p = {};
       p.column = params.column || 0;
       return p;
   }
        
});

Ext.reg('view.report.oilnorms', T.view.report.OilNorms);
