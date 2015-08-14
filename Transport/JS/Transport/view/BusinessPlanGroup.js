T.view.BusinessPlanGroup = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'BusinessPlanGroup',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {

            colModel: new Ext.grid.ColumnModel({
                defaults:{filter:{}},
                columns: [
                    {
                        dataIndex: 'BusinessPlanGroupId',
                        header: 'Код',
                        width: 130,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'BusinessPlanGroupName',
                        header: 'Наименование',
                        width: 300,
                        editor: { xtype: 'kdn.editor.textfield' }
                    }
                ]
            })
        });

            T.view.BusinessPlanGroup.superclass.constructor.call(this, cfg);

    }
});

    Ext.reg('view.businessplangroup', T.view.BusinessPlanGroup);