T.view.report.WaybillListCustomers = Ext.extend(Kdn.view.Report, {

    reportName: 'WaybillListCustomers',

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
   ],
            buildReportParams: function (params) {
                var p = {};
                p.start = params.start;
                p.end = params.end;

                return p;
            }


});

        Ext.reg('view.report.waybilllistcustomers', T.view.report.WaybillListCustomers);

