T.view.GroupAcc = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'GroupAcc',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {
            
            colModel: new Ext.grid.ColumnModel({
               defaults:{filter:{}},            
                columns: [
                    {
                        dataIndex: 'GroupAccId',
                        header: 'Код',
                        width: 130,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'GroupAccName',
                        header: 'Наименование',
                        width: 300,
                        editor: { xtype: 'kdn.editor.textfield' }
                    }
                ]
            })
        });

        T.view.GroupAcc.superclass.constructor.call(this, cfg);

    }
});

Ext.reg('view.groupacc', T.view.GroupAcc);