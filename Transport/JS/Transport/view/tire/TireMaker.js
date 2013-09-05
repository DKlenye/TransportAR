T.view.TireMaker = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'TireMaker',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {

            colModel: new Ext.grid.ColumnModel({
               defaults:{filter:{}},
                columns: [
                    {
                        dataIndex: 'TireMakerId',
                        header: 'Код',
                        width: 130,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'TireMakerName',
                        header: 'Наименование изготовителя',
                        width: 450,
                        editor: { xtype: 'kdn.editor.textfield' }
                    }
                ]
            })
        });

        T.view.TireMaker.superclass.constructor.call(this, cfg);
    }
});

Ext.reg('view.tiremaker', T.view.TireMaker);