
T.view.report.OrderRegister = Ext.extend(Kdn.view.Report, {

    reportName: 'OrderRegister',

    params: [
       '-',
             'Диспетчер',
            {
               xtype: 'combo.multiregisterdispatcher',              
               width:150,
               dataIndex:'User'
            },
            '-',
            'Заказчик',
            {
                xtype: 'combo.customer',
                enableClear: true,
                width:150,
                dataIndex:'Customer'        
            },
            '-',
            'Период:',
            {
               xtype:'datefield',
               dataIndex:'start',
               value:new Date(),
               width:120
            },
            '-', 
            {
               xtype:'datefield',
               dataIndex:'end',
               value:new Date(),
               width:120
           },
           '-'
   ],

   buildReportParams: function(params) {
       var p = {};

       var customerId = 0, userId = "";
       
       if (params.Customer) {
           customerId = params.Customer.CustomerId;
       }

       if (params.User) {
           userId = params.User.join(',');
       }

        p.start = params.start;
        p.end = params.end;
        p.CustomerId = customerId;
        p.userId = userId;
        p.format = params.format;

        return p;
    }

});

Ext.reg('view.report.orderregister', T.view.report.OrderRegister);