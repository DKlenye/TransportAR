T.view.TireTechState = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'TireTechState',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {

            colModel: new Ext.grid.ColumnModel({
               defaults:{filter:{}},
                columns: [
                    {
                        dataIndex: 'TireTechStateId',
                        header: 'Код',
                        width: 50,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'TireTechStateName',
                        header: 'Наименование',
                        width: 250,
                        editor: { xtype: 'kdn.editor.textfield' }
                    }
                ]
            })
        });

       T.view.TireTechState.superclass.constructor.call(this, cfg);
    }
});

Ext.reg('view.tiretechstate', T.view.TireTechState);