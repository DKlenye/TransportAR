T.view.BatteryTechState = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'BatteryTechState',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {

            colModel: new Ext.grid.ColumnModel({
               defaults:{filter:{}},
                columns: [
                    {
                        dataIndex: 'BatteryTechStateId',
                        header: 'Код',
                        width: 50,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'BatteryTechStateName',
                        header: 'Наименование',
                        width: 250,
                        editor: { xtype: 'kdn.editor.textfield' }
                    }
                ]
            })
        });

            T.view.BatteryTechState.superclass.constructor.call(this, cfg);
    }
});

    Ext.reg('view.batterytechstate', T.view.BatteryTechState);