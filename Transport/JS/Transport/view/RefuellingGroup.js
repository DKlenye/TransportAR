T.view.RefuellingGroup = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'RefuellingGroup',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {
            
            colModel: new Ext.grid.ColumnModel({
               defaults:{filter:{}},            
                columns: [
                    {
                        dataIndex: 'RefuellingGroupId',
                        header: 'Код',
                        width: 130,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'RefuellingGroupName',
                        header: 'Наименование',
                        width: 300,
                        editor: { xtype: 'kdn.editor.textfield' }
                    },
                    {
                        dataIndex: 'groupAccCode',
                        header: 'Код',
                        width: 100
                    },
                    {
                        dataIndex: 'oilReplacingReport',
                        header: 'Отчёт по маслам',
                        width: 100
                    },
                    {
                        dataIndex: 'debit',
                        header: 'Код затрат',
                        width: 100
                    },
                    {
                        dataIndex: 'oilDebit',
                        header: 'Код затрат масел',
                        width: 100
                    }
                ]
            })
        });

        T.view.RefuellingGroup.superclass.constructor.call(this, cfg);

    }
});

Ext.reg('view.refuellinggroup', T.view.RefuellingGroup);