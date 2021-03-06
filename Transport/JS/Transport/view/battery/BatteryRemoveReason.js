T.view.BatteryRemoveReason = Ext.extend(Kdn.view.BaseGrid, {
    requireModels: 'BatteryTechState',
    modelName: 'BatteryRemoveReason',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {

            colModel: new Ext.grid.ColumnModel({
               defaults:{filter:{}},
                columns: [
                    {
                        dataIndex: 'BatteryRemoveReasonId',
                        header: 'Код',
                        width: 130,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'BatteryRemoveReasonName',
                        header: 'Наименование причины снятия АКБ',
                        width: 450,
                        editor: { xtype: 'kdn.editor.textfield' }
                    },
                    {
                        dataIndex: 'isWriteOff',
                        header: 'Списание АКБ',
                        width: 200,
                        renderer:function(v) {
                            if (!Ext.isBoolean(v)) return v;
                            return (!!v) ? 'Да' : 'Нет';
                        },
                        editor : {
                           xtype:'kdn.editor.booleanfield'                           
                        }
                   },
                    {
                        dataIndex: 'State',
                        header: 'Тех. состояние',
                        renderer: Kdn.Renderer.object("BatteryTechStateName"),
                        width: 200,
                        editor: { xtype: 'combo.batterytechstate', allowBlank: true }
                    }
                ]
            })
        });

        T.view.BatteryRemoveReason.superclass.constructor.call(this, cfg);
    }
});

Ext.reg('view.batteryremovereason', T.view.BatteryRemoveReason);