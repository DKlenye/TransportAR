
T.view.report.ServiceWaybillsByYear = Ext.extend(Kdn.view.Report, {

    reportName: 'ServiceWaybillsByYear',

    params: [
       '-',
            'Год:',
            {
                xtype: 'numberfield',
                dataIndex: 'year',
                value: new Date().getFullYear(),
                width: 120
            },
            '-',
            'Заказчик:',
            {
                ref:'../customers',
                xtype: 'combo.customer',
                dataIndex: 'customerId',
                objectValue: false,
                width: 300
            }
   ],

    buildReportParams: function(params) {
        var p = {};
        p.year = params.year;
        p.cusomerId = this.customers.getValue().ReplicationId;
        return p;
    }

});

Ext.reg('view.report.servicewaybillsbyyear', T.view.report.ServiceWaybillsByYear);
