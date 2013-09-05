T.view.BodyType = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'BodyType',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {

            colModel: new Ext.grid.ColumnModel({
               defaults:{filter:{}},
                columns: [
                    {
                        dataIndex: 'BodyTypeId',
                        header: 'Код',
                        width: 130,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'BodyTypeName',
                        header: 'Наименование типа кузова',
                        width: 450,
                        editor: { xtype: 'kdn.editor.textfield' }
                    }
                ]
            })
        });

        T.view.BodyType.superclass.constructor.call(this, cfg);

    }
});

Ext.reg('view.bodytype', T.view.BodyType);