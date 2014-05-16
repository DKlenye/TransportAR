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
                        dataIndex: 'Vehicle.GarageNumber',
                        xtype:'mappingcolumn',
                        header:'Гаражный №',
                        width: 110
                    },
                    {
                        dataIndex: 'Vehicle.Model',
                        xtype: 'mappingcolumn',
                        header: 'Марка авто',
                        width: 160
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
                        editor: { xtype: 'kdn.editor.textfield',allowBlank:true }
                    },
                    {
                        hidden: true,
                        dataIndex: 'Doc',
                        header: 'Документ',
                        width: 120,
                        editor: { xtype: 'kdn.editor.textfield', allowBlank: true }
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
                        dataIndex: 'KmNorm',
                        header: 'Норма на пробег, км',
                        width: 120,
                        editor: { xtype: 'kdn.editor.numberfield',allowBlank:true }
                    },
                    {
                        dataIndex: 'MonthNorm',
                        header: 'Норма по времени, мес',
                        width: 120,
                        editor: { xtype: 'kdn.editor.numberfield',allowBlank:true }
                    },
                    {
                        dataIndex: 'Size',
                        header: 'Размер',
                        width: 100,
                        editor: { xtype: 'kdn.editor.textfield',allowBlank:true }                     
                    },
                    {
                        dataIndex: 'Season',
                        header: 'Сезонность',
                        width: 100,
                        editor: {xtype:'combo.tireseason', objectValue:false, allowBlank:true, enableClear:true},
                        renderer:function(v){
                           if(!v)return v;
                            var o = {
                                1: 'Летняя',
                                2: 'Зимняя'
                            };
                           return o[v];
                        }
                    },
                    {
                        dataIndex: 'Vehicle',
                        hidden:true,
                        editor:{xtype:'combo.vehicle'},
                        header:'Установлена на автомобиль',
                        width: 110
                    },
                    {
                        dataIndex: 'InstallDate',
                        xtype:'datecolumn',
                        editor: { xtype: 'kdn.editor.datefield' },
                        header:'Дата установки',
                        width: 110
                    },
                    {
                       dataIndex: 'IsSpare',
                       align:'center',
                       header: 'Запаска',
                       width: 100,
                       renderer: Kdn.CheckRenderer,
                       editor: { xtype: 'kdn.editor.booleanfield', renderer: Kdn.CheckRenderer, allowBlank: true }
                   },
                   {
                       dataIndex: 'IsNotReplaceable',
                       align: 'center',
                       header: 'Установлены постоянно',
                       width: 100,
                       renderer: Kdn.CheckRenderer,
                       editor: { xtype: 'kdn.editor.booleanfield', renderer: Kdn.CheckRenderer, allowBlank: true }
                   }
                ]
            })
        });

        T.view.Tire.superclass.constructor.call(this, cfg);
    },
    
     _getTbar: function()
    {
    
        return [

            '-',
            {
                text: 'Обновить',
                iconCls: 'icon-refresh',
                handler: this.onRefresh,
                scope: this,
                cls: 'update_btn'
            },
            '-',
            {
                xtype: 'tbspacer',
                width: 10
            },
            '-',
            {
                text: 'Добавить',
                iconCls: 'icon-add',
                handler: this.onAdd,
                scope: this,
                cls: 'add_btn'
            },
            '-',
            {
                text: 'Клонировать',
                iconCls: 'icon-page_copy',
                handler: this.onClone,
                scope: this
            },
            '-',
            {
                text: 'Редактировать',
                iconCls: 'icon-edit',
                handler: this.onEdit,
                scope: this,
                cls: 'edit_btn',
                disabled: true
            },
            '-',
            {
                text: 'Удалить',
                iconCls: 'icon-delete',
                handler: this.onDelete,
                scope: this,
                cls: 'delete_btn',
                disabled: true
            },
            '-',
            {
                xtype:'tbspacer',
                width:20
            }
            
        ]
    }
});

Ext.reg('view.tire', T.view.Tire);