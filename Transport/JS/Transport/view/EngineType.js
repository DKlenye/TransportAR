T.view.EngineType = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'EngineType',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {

            colModel: new Ext.grid.ColumnModel({
               defaults:{filter:{}},
                columns: [
                    {
                        dataIndex: 'EngineTypeId',
                        header: 'Код',
                        width: 130,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'EngineTypeName',
                        header: 'Наименование типа двигателя',
                        width: 450,
                        editor: { xtype: 'kdn.editor.textfield' }
                    }
                ]
            })
        });

        T.view.EngineType.superclass.constructor.call(this, cfg);

    }
});

Ext.reg('view.enginetype', T.view.EngineType);