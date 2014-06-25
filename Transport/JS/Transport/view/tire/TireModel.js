T.view.TireModel = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'TireModel',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {

            colModel: new Ext.grid.ColumnModel({
               defaults:{filter:{}},
                columns: [
                    {
                        dataIndex: 'TireModelId',
                        header: 'Код',
                        width: 100,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'TireModelName',
                        header: 'Наименование модели',
                        width: 150,
                        editor: { xtype: 'kdn.editor.textfield' }
                    },
                    {
                        dataIndex: 'Description',
                        header: 'Примечание',
                        width: 200,
                        editor: { xtype: 'kdn.editor.textfield', allowBlank:true }
                    },
                    {
                        dataIndex: 'TireMakerId',
                        header: 'Производитель',
                        width: 150,
                        editor: { xtype: 'combo.tiremaker',objectValue:false,editable:true },
                        renderer:function(v){
                           if(!v)return v;
                           var s = Kdn.ModelFactory.getStore('TireMaker'),
                               r = s.getById(v);
                           if(r) return r.get('TireMakerName');
                           return null;
                        }
                    },
                    {
                        dataIndex: 'KmNorm',
                        header: 'Норма на пробег, км',
                        width: 120,
                        editor: { xtype: 'kdn.editor.numberfield', allowBlank:true }
                    },
                    {
                        dataIndex: 'MonthNorm',
                        header: 'Норма по времени, мес',
                        width: 120,
                        editor: { xtype: 'kdn.editor.numberfield', allowBlank:true }
                    },
                    {
                        dataIndex: 'Size',
                        header: 'Размер',
                        width: 100,
                        editor: { xtype: 'kdn.editor.textfield' }                     
                    },
                    {
                        dataIndex: 'Season',
                        header: 'Сезонность',
                        width: 100,
                        editor: {xtype:'combo.tireseason', objectValue:false},
                        renderer:function(v){
                           if(!v)return v;
                            var o = {
                                1: 'Летняя',
                                2: 'Зимняя'
                            };
                           return o[v];
                        }                 
                    }
                    
                ]
            })
        });

        T.view.TireModel.superclass.constructor.call(this, cfg);
    }
});

Ext.reg('view.tiremodel', T.view.TireModel);