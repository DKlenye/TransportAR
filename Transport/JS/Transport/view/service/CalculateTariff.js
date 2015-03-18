T.view.CalculateTariff = Ext.extend(Ext.Panel, {
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {
            layout:'border',
            items: [
                {
                    region:'center',
                    bodyStyle: {
                        'border-width': '0 0 0 1'
                    },
                    headerStyle: {
                        'border-width': '0 0 0 0'
                    }
                },
                {
                    title:'Параметры для расчёта',
                    region:'west',
                    split:true,
                    width:400,
                    collapsible:true,
                    collapseMode: 'mini',
                    bodyStyle: {
                        'border-width': '1 1 0 0'
                    },
                    headerStyle: {
                        'border-width': '0 1 1 0'
                    }
                }
            ]
        });

            T.view.CalculateTariff.superclass.constructor.call(this, cfg);

    }
});

    Ext.reg('view.calculatetariff', T.view.CalculateTariff);