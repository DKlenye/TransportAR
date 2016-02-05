T.view.report.VehicleNorms = Ext.extend(Kdn.view.Report,{
   
   reportName:'VehicleNorms',
   
   params:[
        '-',
        'Дата:',
            {
               xtype:'datefield',
               dataIndex:'date',
               value:new Date(),
               width:120
            },
          '-',
            'Колонна:',
            {
                xtype: 'combo.multicolumn',
                objectValue: false,
                width: 400,
                dataIndex: 'columns'
            }
   ],

            buildReportParams: function (params) {

                var p = {};
                p.date = params.date;
                p.columns = params.columns.join(',');
                p.format = params.format;

                return p;
            }

});

Ext.reg('view.report.vehiclenorms', T.view.report.VehicleNorms);