Kdn.view.UserGroup = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'UserGroup',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {

            colModel: new Ext.grid.ColumnModel({
                columns: [
                    {
                        dataIndex: 'UserGroupId',
                        header: 'Код группы',
                        width: 150,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'UserGroupName',
                        header: 'Наименование группы',
                        width: 200,
                        editor: { xtype: 'kdn.editor.textfield' }
                    }
                ]
            })
        });

        Kdn.view.UserGroup.superclass.constructor.call(this, cfg);


    }
});

Ext.reg('kdn.view.usergroup', Kdn.view.UserGroup);