T.view.TransportOwner = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'TransportOwner',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {

            colModel: new Ext.grid.ColumnModel({
                defaults:{
                  filter:{}
                },
                columns: [
                    {
                        dataIndex: 'OwnerId',
                        header: 'Код',
                        width: 130,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'OwnerName',
                        header: 'Наименование',
                        width: 300,
                        editor: { xtype: 'kdn.editor.textfield' }
                    }
                ]
            })
        });

        T.view.TransportOwner.superclass.constructor.call(this, cfg);

    }
});

Ext.reg('view.transportowner', T.view.TransportOwner);