T.view.WorkType = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'WorkType',
    requireModels:'WorkUnit',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {

            colModel: new Ext.grid.ColumnModel({
               defaults:{
                  filter:{}
               },
                columns: [
                    {
                        dataIndex: 'WorkTypeId',
                        header: 'Код',
                        width: 130,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'WorkTypeName',
                        header: 'Наименование работы',
                        width: 200,
                        editor: { xtype: 'kdn.editor.textfield' }
                    },
                    {
                        dataIndex: 'WorkUnitId',
                        header: 'Ед.изм.',
                        width: 200,
                        renderer: function(o) {
                            if (!o && !Ext.isObject(o)) return null;
                            var store = Kdn.ModelFactory.getStore('WorkUnit'),
                                record = store.getById(o);                              
                                if (record) return String.format("{0} ({1})",record.data.WorkUnitName,record.data.UnitName);                              
                                return o;
                        },
                        editor: { xtype: 'combo.workunit',objectValue:false,allowBlank:false}
                    }
                ]
            })
        });

        T.view.WorkType.superclass.constructor.call(this, cfg);

    }
});

Ext.reg('view.worktype', T.view.WorkType);