T.view.OilGroup = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'OilGroup',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {

            colModel: new Ext.grid.ColumnModel({
                defaults:{filter:{}},
                columns: [
                    {
                        dataIndex: 'OilGroupId',
                        header: 'Код',
                        width: 130,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'OilGroupName',
                        header: 'Наименование',
                        width: 300,
                        editor: { xtype: 'kdn.editor.textfield' }
                    }
                ]
            })
        });

        T.view.OilGroup.superclass.constructor.call(this, cfg);

    }
});

Ext.reg('view.oilgroup', T.view.OilGroup);