
T.view.report.CustomerWorkInfo = Ext.extend(Kdn.view.Report, {

reportName: 'CustomerWorkInfo',

    params: [
       '-',
            'Авто',
            {
                xtype: 'combo.car2',
                enableClear:true,
                dataIndex:'VehicleId',
                width:300
            },
            '-',
            'Заказчик',
            {
                xtype: 'combo.customer',
                enableClear: true,
                width:300,
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

       var vehicleId = 0, customerId = 0;
       if (params.VehicleId) {
           vehicleId = params.VehicleId.VehicleId;
       }

       if (params.Customer) {
           customerId = params.Customer.CustomerId;
       }


        p.Start = params.start;
        p.End = params.end;
        p.VehicleId = vehicleId;
        p.customerId = customerId;

        return p;
    }

});

Ext.reg('view.report.customerworkinfo', T.view.report.CustomerWorkInfo);