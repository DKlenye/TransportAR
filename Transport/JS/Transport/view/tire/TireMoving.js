T.view.TireMoving = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'TireMoving',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {

            colModel: new Ext.grid.ColumnModel({
               defaults:{filter:{}},
                columns: [
                    {
                        dataIndex: 'RecId',
                        header: 'Код',
                        width: 100,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'Vehicle',
                        header: 'ТС',
                        width: 200,
                        editor: { xtype: 'kdn.editor.textfield' }
                    },
                    {
                        dataIndex: 'RemoveTireId',
                        header: 'Шина снята',
                        width: 150,
                        editor: { xtype: 'kdn.editor.textfield' }
                    },
                    {
                        dataIndex: 'SetupTireId',
                        header: 'Шина установлена',
                        width: 150,
                        editor: { xtype: 'kdn.editor.textfield' }
                    },
                    {
                        dataIndex: 'MovingDate',
                        header: 'Дата',
                        width: 110,
                        editor: { xtype: 'kdn.editor.textfield' }
                    },
                    {
                        dataIndex: 'CounterValue',
                        header: 'Показания счётчика',
                        width: 150,
                        editor: { xtype: 'kdn.editor.textfield' }
                    }
                ]
            })
        });

        T.view.TireMoving.superclass.constructor.call(this, cfg);
    }
});

Ext.reg('view.tiremoving', T.view.TireMoving);