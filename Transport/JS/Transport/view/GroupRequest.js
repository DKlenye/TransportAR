T.view.GroupRequest = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'GroupRequest',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {
            
            colModel: new Ext.grid.ColumnModel({
               defaults:{filter:{}},            
                columns: [
                    {
                        dataIndex: 'GroupRequestId',
                        header: 'Код',
                        width: 130,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'GroupRequestName',
                        header: 'Наименование',
                        width: 300,
                        editor: { xtype: 'kdn.editor.textfield' }
                    },
                    {
                        dataIndex: 'OrderId',
                        header: 'Порядок сортировки',
                        width: 300,
                        editor: { xtype: 'kdn.editor.numberfield' }
                    }, {
                        dataIndex: 'AgreementId',
                        header: 'Договор',
                        width: 300,
                        editor: { xtype: 'combo.serviceagreement',objectValue:false }
                    }
                ]
            })
        });

        T.view.GroupRequest.superclass.constructor.call(this, cfg);

    }
});

Ext.reg('view.grouprequest', T.view.GroupRequest);