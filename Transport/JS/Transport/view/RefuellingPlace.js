T.view.RefuellingPlace = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'RefuellingPlace',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {            
            colModel: new Ext.grid.ColumnModel({
               defaults:{
                  filter:{}
               },
                columns: [
                    {
                        dataIndex: 'RefuellingPlaceId',
                        header: 'Код',
                        width: 80,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'RefuellingPlaceName',
                        header: 'Наименование места заправки',
                        width: 300,
                        editor: { xtype: 'kdn.editor.textfield' }
                    },
                    {
                        dataIndex: 'isAutomatic',
                        header: 'Автоматические данные',
                        width: 200,
                        renderer: Ext.ux.grid.CheckColumn.prototype.renderer,
                        editor : {
                           xtype:'kdn.editor.booleanfield',
                           renderer: function(v) {
                            if (!Ext.isBoolean(v)) return v;
                            return (!!v) ? 'Да' : 'Нет';
                           }
                        }
                    }
                ]
            })
        });

        T.view.RefuellingPlace.superclass.constructor.call(this, cfg);

    }
});

Ext.reg('view.refuellingplace', T.view.RefuellingPlace);