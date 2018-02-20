T.view.acc.CloseMonth = Ext.extend(Ext.grid.GridPanel, {
    constructor: function(cfg) {
        cfg = cfg || {};

        var store = Kdn.ModelFactory.modelMgr.get("Fuel").getStore();

        Ext.apply(cfg, {
            store:store,
            loadMask: true,
            columnLines: true,
            stripeRows: true,
            tbar:[
                'Текущий период',
                {
                    xtype: 'datefield',
                    plugins: 'monthPickerPlugin',
                    format: 'F Y',
                    value: new Date().add(Date.MONTH, -1),
                    width: 130,
                    listeners: {
                        scope: this,
                        select: this.reload
                    },
                    dataIndex: 'period'
                }
            ],
            columns:[
                 {
                     header:'Кредит',
                     dataIndex:'Credit',
                     filter:{}
                 },
               {
                   header:'Сумма',
                   dataIndex:'Summ',
                   summaryType:'sum'
               }
            ]

        });

        T.view.acc.CloseMonth.superclass.constructor.call(this, cfg);
    }
});

Ext.reg('view.acc.closemonth', T.view.acc.CloseMonth);