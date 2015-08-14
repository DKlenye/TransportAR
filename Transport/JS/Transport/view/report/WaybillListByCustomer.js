T.view.report.WaybillListByCustomer = Ext.extend(Kdn.view.Report, {

    reportName: 'WaybillListByCustomer',

params: [
        'C:',
            {
                xtype: 'datefield',
                dataIndex: 'start',
                value: new Date(),
                width:130
            },
            'По',
            {
                xtype: 'datefield',
                dataIndex: 'end',
                value: new Date(),
                width: 130
            },
            '-',
            'Заказчик:',
            {
                xtype: 'combo.customer',
                objectValue: false,
                width: 400,
                dataIndex: 'CustomerId'
            }
   ],
            buildReportParams: function (params) {
                var p = {};
                p.start = params.start;
                p.end = params.end;

                p.CustomerId = params.CustomerId.CustomerId;
                return p;
            }


});

        Ext.reg('view.report.waybilllistbycustomer', T.view.report.WaybillListByCustomer);

