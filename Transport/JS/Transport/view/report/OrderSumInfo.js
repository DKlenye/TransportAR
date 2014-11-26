
T.view.report.OrderSumInfo = Ext.extend(Kdn.view.Report, {

reportName: 'OrderSumInfo',

    params: [
       '-',
            'Период:',
            {
               xtype:'datefield',
               plugins:'monthPickerPlugin',
               format:'F Y',
               width:250,
               dataIndex:'period1',
               value:new Date(),
               width:120
            },
            '-', 
            {
               xtype:'datefield',
               plugins:'monthPickerPlugin',
               format:'F Y',
               width:250,
               dataIndex:'period2',
               value:new Date(),
               width:120
           },
            '-',
            new Kdn.form.ComboBox({
                displayField: 'name',
                value:1,
                dataIndex:'cust',
                valueField: 'id',
                objectValue: false,
                enableClear: true,
                store: new Ext.data.ArrayStore({
                    fields: ['id','name'],
                    data: [[1, 'Сторонние организации (9009)'], [2, 'Услуги населению (9044)'], [3, 'Услуги ритуальные (9081)']]
                }),
                width:200
             })
   ],

    buildReportParams: function(params) {
        var p = {};
        p.m = params.period1.getMonth() + 1;
        p.y = params.period1.getFullYear();
        p.m1 = params.period2.getMonth() + 1;
        p.y1 = params.period2.getFullYear();
        p.cust = params.cust;
        return p;
    }

});

Ext.reg('view.report.ordersuminfo', T.view.report.OrderSumInfo);