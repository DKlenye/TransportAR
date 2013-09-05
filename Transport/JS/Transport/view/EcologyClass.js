T.view.EcologyClass = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'EcologyClass',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {

            colModel: new Ext.grid.ColumnModel({
               defaults:{filter:{}},
                columns: [
                    {
                        dataIndex: 'EcologyClassId',
                        header: 'Код',
                        width: 130,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'EcologyClassName',
                        header: 'Наименование класса',
                        width: 450,
                        editor: { xtype: 'kdn.editor.textfield' }
                    }
                ]
            })
        });

        T.view.EcologyClass.superclass.constructor.call(this, cfg);

    }
});

Ext.reg('view.ecologyclass', T.view.EcologyClass);