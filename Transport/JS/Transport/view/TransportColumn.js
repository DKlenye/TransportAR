T.view.TransportColumn = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'TransportColumn',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {

            colModel: new Ext.grid.ColumnModel({
               defaults:{
                  filter:{}
               },
                columns: [
                    {
                        dataIndex: 'ColumnId',
                        header: 'Код',
                        width: 130,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'ColumnName',
                        header: 'Наименование рабочее',
                        width: 300,
                        editor: { xtype: 'kdn.editor.textfield' }
                    },
                    {
                        dataIndex: 'FullName',
                        header: 'Полное наименование',
                        width: 300,
                        editor: { xtype: 'kdn.editor.textfield',allowBlank:true }
                    }
                ]
            })
        });

        T.view.TransportColumn.superclass.constructor.call(this, cfg);

    }
});

Ext.reg('view.transportcolumn', T.view.TransportColumn);