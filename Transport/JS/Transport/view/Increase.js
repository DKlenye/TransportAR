T.view.Increase = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'Increase',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {
            colModel: new Ext.grid.ColumnModel({
                defaults:{
                  filter:{}                
                },
                columns: [
                    {
                        dataIndex: 'IncreaseId',
                        header: 'Код',
                        width: 100,
                        editor: { xtype: 'kdn.editor.id' }                        
                    },
                    {
                        dataIndex: 'IncreaseName',
                        header: 'Наименование надбавки',
                        width: 250,
                        editor: { xtype: 'kdn.editor.textfield'}
                    },
                    {
                        dataIndex: 'IncreaseShortName',
                        header: 'Сокращённое наименование',
                        width: 250,
                        editor: { xtype: 'kdn.editor.textfield'}
                    },
                    {
                        dataIndex: 'Prcn',
                        header: 'Процент',
                        width: 100,
                        editor: { xtype: 'kdn.editor.numberfield'}
                    },
                    {
                        dataIndex: 'isNormConstant',
                        header: 'Постоянная к нормам',
                        width: 180,
                        editor: { xtype: 'kdn.editor.booleanfield' },
                        renderer: function(v) {
                            if (!Ext.isBoolean(v)) return v;
                            return (!!v) ? 'Да' : 'Нет';
                        }
                    },
                    {
                        xtype:'datecolumn',
                        dataIndex:'DateOfTerm',
                        header:'Окончание действия',
                        width: 150,
                        editor:{xtype:'kdn.editor.datefield',allowBlank:true}
                    }
                ]
            })
        });

        T.view.Increase.superclass.constructor.call(this, cfg);
    }
});

Ext.reg('view.increase', T.view.Increase);