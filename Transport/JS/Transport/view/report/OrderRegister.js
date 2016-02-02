
T.view.report.OrderRegister = Ext.extend(Kdn.view.Report, {

    reportName: 'OrderRegister',

    params: [
       '-',
             'Диспетчер',
            {
               xtype: 'combo.registerdispatcher',              
               width:120,
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

       var customerId = 0, userId = 0;
       
       if (params.Customer) {
           customerId = params.Customer.CustomerId;
       }

       if (params.User) {
           userId = params.User.UserId;
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