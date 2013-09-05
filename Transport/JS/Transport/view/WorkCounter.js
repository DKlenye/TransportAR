T.view.WorkCounter = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'WorkCounter',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {

            colModel: new Ext.grid.ColumnModel({
                defaults:{
                  filter:{}                  
                },
                columns: [
                    {
                        dataIndex: 'CounterId',
                        header: 'Код',
                        width: 130,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'CounterName',
                        header: 'Наименование',
                        width: 200,
                        editor: { xtype: 'kdn.editor.textfield' }
                    }
                ]
            })
        });

        T.view.WorkCounter.superclass.constructor.call(this, cfg);

    }
});

Ext.reg('view.workcounter', T.view.WorkCounter);