
T.view.report.CustomerWorkInfo = Ext.extend(Kdn.view.Report, {

reportName: 'CustomerWorkInfo',

    params: [
       '-',
             'Гар.№:',
            {
               xtype:'textfield',              
               width:100,
               dataIndex:'garageNumber'
            },
            '-',
            'Заказчик',
            {
                xtype: 'combo.customer',
                showNotActual:true,
                enableClear: true,
                width:150,
                dataIndex:'Customer'        
            },
            '-',
            'Период:',
            {
               xtype:'datefield',
               width:250,
               dataIndex:'start',
               value:new Date(),
               width:120
            },
            '-', 
            {
               xtype:'datefield',
               width:250,
               dataIndex:'end',
               value:new Date(),
               width:120
           },
           '-'
   ],

   buildReportParams: function(params) {
       var p = {};

       var customerId = 0;
       
       if (params.Customer) {
           customerId = params.Customer.CustomerId;
       }


        p.Start = params.start;
        p.End = params.end;
        p.customerId = customerId;
        p.garageNumber = params.garageNumber||" ";

        return p;
    }

});

Ext.reg('view.report.customerworkinfo', T.view.report.CustomerWorkInfo);