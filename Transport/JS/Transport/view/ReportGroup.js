T.view.ReportGroup = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'ReportGroup',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {
            
            colModel: new Ext.grid.ColumnModel({
               defaults:{filter:{}},            
                columns: [
                    {
                        dataIndex: 'ReportGroupId',
                        header: 'Код',
                        width: 130,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'ReportGroupName',
                        header: 'Наименование',
                        width: 500,
                        editor: { xtype: 'kdn.editor.textfield' }
                    }
                ]
            })
        });

        T.view.ReportGroup.superclass.constructor.call(this, cfg);

    }
});

Ext.reg('view.reportgroup', T.view.ReportGroup);