T.view.report.NSTLimitDetailsWithCustomer = Ext.extend(Kdn.view.Report, {
   
    reportName: 'NSTLimitDetailsWithCustomer',
   
   params:[
        '-',
        'C:',
            {
                xtype: 'datefield',
                dataIndex: 'start',
                value: new Date(),
                width: 120
            },
            'По:',
            {
                xtype: 'datefield',
                dataIndex: 'end',
                value: new Date(),
                width: 120
            },
        '-',
       'Подразделение',
       {
           xtype: 'combo.servicedepartment',
           dataIndex: 'DepartmentId',
           objectValue:false,
           width:200
       },
       '-',
        'Заказчик Нафтана',
        {
            xtype: 'combo.naftancustomer',
            dataIndex: 'customerId',
            objectValue: false,
            width: 200
        }
   ],
    
    buildReportParams: function (params) {
        var p = {};
        p.customerId = params.customerId.CustomerId;

        Ext.copyTo(p, params, 'start,end,DepartmentId,format');

        return p;
    }   
        
});

Ext.reg('view.report.nstlimitdetailswithcustomer', T.view.report.NSTLimitDetailsWithCustomer);