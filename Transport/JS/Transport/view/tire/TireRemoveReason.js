T.view.TireRemoveReason = Ext.extend(Kdn.view.BaseGrid, {
    requireModels: 'TireTechState',
    modelName: 'TireRemoveReason',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {

            colModel: new Ext.grid.ColumnModel({
               defaults:{filter:{}},
                columns: [
                    {
                        dataIndex: 'TireRemoveReasonId',
                        header: 'Код',
                        width: 130,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'TireRemoveReasonName',
                        header: 'Наименование причины снятия шины',
                        width: 450,
                        editor: { xtype: 'kdn.editor.textfield' }
                    },
                    {
                        dataIndex: 'isWriteOff',
                        header: 'Списание шины',
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
                        renderer:Kdn.Renderer.object("TireTechStateName"),
                        width: 200,
                        editor: { xtype: 'combo.tiretechstate', allowBlank:true }  
                    }
                ]
            })
        });

        T.view.TireRemoveReason.superclass.constructor.call(this, cfg);
    }
});

Ext.reg('view.tireremovereason', T.view.TireRemoveReason);