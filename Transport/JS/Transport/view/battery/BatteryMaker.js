T.view.BatteryMaker = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'BatteryMaker',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {

            colModel: new Ext.grid.ColumnModel({
               defaults:{filter:{}},
                columns: [
                    {
                        dataIndex: 'BatteryMakerId',
                        header: 'Код',
                        width: 130,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'BatteryMakerName',
                        header: 'Наименование изготовителя',
                        width: 450,
                        editor: { xtype: 'kdn.editor.textfield' }
                    }
                ]
            })
        });

        T.view.BatteryMaker.superclass.constructor.call(this, cfg);
    }
});

Ext.reg('view.batterymaker', T.view.BatteryMaker);