T.view.report.WaybillCountByCustomer = Ext.extend(Kdn.view.Report, {

    reportName: 'WaybillCountByCustomer',

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
            }
   ]

});

        Ext.reg('view.report.waybillcountbycustomer', T.view.report.WaybillCountByCustomer);

