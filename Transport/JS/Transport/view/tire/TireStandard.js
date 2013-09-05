T.view.TireStandard = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'TireStandard',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {

            colModel: new Ext.grid.ColumnModel({
               defaults:{filter:{}},
                columns: [
                    {
                        dataIndex: 'TireStandardId',
                        header: 'Код',
                        width: 130,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'TireStandardName',
                        header: 'ГОСТ',
                        width: 450,
                        editor: { xtype: 'kdn.editor.textfield' }
                    }
                ]
            })
        });

        T.view.TireStandard.superclass.constructor.call(this, cfg);
    }
});

Ext.reg('view.tirestandard', T.view.TireStandard);