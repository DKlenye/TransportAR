T.view.TransmissionType = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'TransmissionType',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {
            
            colModel: new Ext.grid.ColumnModel({
               defaults:{filter:{}},            
                columns: [
                    {
                        dataIndex: 'TransmissionTypeId',
                        header: 'Код',
                        width: 130,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'TransmissionTypeName',
                        header: 'Наименование',
                        width: 400,
                        editor: { xtype: 'kdn.editor.textfield', allowBlank:true }
                    }
                ]
            })
           
        });

            T.view.TransmissionType.superclass.constructor.call(this, cfg);
    }
    
    
});

    Ext.reg('view.transmissiontype', T.view.TransmissionType);