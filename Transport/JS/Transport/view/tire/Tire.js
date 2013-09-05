T.view.Tire = Ext.extend(Kdn.view.BaseGrid, {
requireModels:'TireModel,TireStandard,TireMaker',
editor:'view.tireeditor',
    modelName: 'Tire',
    pageSize:50,
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {

            colModel: new Ext.grid.ColumnModel({
               defaults:{filter:{}},
                columns: [
                    {
                        dataIndex: 'TireId',
                        header: 'Код',
                        width: 60,
                        editor: { xtype: 'kdn.editor.id' }
                    },                    
                    {
                        dataIndex: 'FactoryNumber',
                        header: 'Заводской №',
                        width: 110,
                        editor: { xtype: 'kdn.editor.textfield' }
                    },
                    {
                        dataIndex: 'Cost',
                        header: 'Стоимость, руб',
                        width: 130,
                        editor: { xtype: 'kdn.editor.textfield' }
                    },
                    {
                        dataIndex: 'TireModelId',
                        hideable:false,
                        header: 'Модель',
                        editor: { xtype: 'combo.tiremodel', objectValue:false },
                        renderer:function(v){
                           if(!v)return v;
                           var s = Kdn.ModelFactory.getStore('TireModel'),
                               r = s.getById(v);
                           if(r) return r.get('TireModelName');
                           return null;
                        }
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
                        dataIndex: 'WeightIndex',
                        header: 'Норма слойности',
                        width: 120,
                        editor: { xtype: 'kdn.editor.numberfield', allowBlank:true }
                    },
                    {
                        dataIndex: 'KmNorm',
                        header: 'Норма на пробег, км',
                        width: 120,
                        editor: { xtype: 'kdn.editor.numberfield' }
                    },
                    {
                        dataIndex: 'Size',
                        header: 'Размер',
                        width: 100,
                        editor: { xtype: 'kdn.editor.textfield' }                     
                    },
                    {
                        dataIndex: 'Diameter',
                        header: 'Диаметр',
                        width: 100,
                        editor: { xtype: 'kdn.editor.numberfield' }                     
                    },
                    {
                        dataIndex: 'Season',
                        header: 'Сезонность',
                        width: 100,
                        editor: {xtype:'combo.tireseason', objectValue:false},
                        renderer:function(v){
                           if(!v)return v;
                           var o = {
                              all:'Всесезонная',
                              summer:'Летняя',
                              winter:'Зимняя'
                           }
                           return o[v];
                        }                 
                    },
                    {
                        dataIndex: 'WriteOff',
                        xtype:'datecolumn',
                        header:'Дата списания',
                        width: 110,
                        editor: { xtype: 'kdn.editor.datefield',allowBlank:true }
                    }
                ]
            })
        });

        T.view.Tire.superclass.constructor.call(this, cfg);
    }
});

Ext.reg('view.tire', T.view.Tire);