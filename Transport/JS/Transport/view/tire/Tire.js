
T.view.Tire = Ext.extend(Kdn.view.MasterDetails, {
requireModels:'TireModel,TireStandard,TireMaker',
constructor: function(cfg) {
    cfg = cfg || {};


    var movingGrid = new Kdn.grid.LocalEditorGrid({
        title: 'Движение шины',
        clicksToEdit: 2,
        store: Kdn.ModelFactory.getModel('TireMoving').buildStore({
            autoLoad: false,
            autoSave: true,
            autoDestroy: true
        }),
        loadMask: true,
        columns: [
                      {
                          header: 'Код',
                          dataIndex: 'TireMovingId',
                          width: 60
                      },
                     {
                         header: 'Автомобиль(Прицеп)',
                         dataIndex: 'Vehicle',
                         width: 400,
                         renderer: function(e) {
                             if (!e) return e;
                             return String.format("[{0}] {1} {2}",
                                    e.GarageNumber,
                                    e.Model,
                                    e.RegistrationNumber
                                 )
                         },
                         editor: {
                             xtype: 'combo.vehicle',
                             enableClear: true
                         }

                     },
                     {
                         header: 'Дата установки',
                         xtype: 'datecolumn',
                         dataIndex: 'InstallDate',
                         editor: { xtype: 'datefield' },
                         width: 120
                     },
                     {
                         header: 'Дата снятия',
                         xtype: 'datecolumn',
                         dataIndex: 'RemoveDate',
                         editor: { xtype: 'datefield' },
                         width: 120
                     },
                     {
                         header: 'Причина снятия',
                         dataIndex: 'TireRemoveReasonId',
                         editor: { xtype: 'combo.tireremovereason', objectValue: false, enableClear: true },
                         renderer: function(v) {
                             if (!v) return v;
                             var s = Kdn.ModelFactory.getStore('TireRemoveReason'),
                               r = s.getById(v);
                             if (r) return r.get('TireRemoveReasonName');
                             return null;
                         },
                         width: 200
                     }
                  ]
    });

    var tbar = movingGrid.getTopToolbar();
    tbar.add(
                new Ext.Button({
                    text: 'Карточка шины',
                    iconCls: 'icon-excel',
                    scope: movingGrid,
                    handler: function() {
                        var url = 'http://db2.lan.naftan.by/ReportServer/Pages/ReportViewer.aspx?/Transport/BatteryCard&rs:Command=Render&rc:Toolbar=false&'

                        var sel = this.getSelectionModel().getSelected();

                        if (sel && sel.get('TireMovingId')) {
                            var id = sel.get('TireMovingId');

                            var params = {};
                            params['rs:Format'] = 'Excel';
                            params['rs:ClearSession'] = true;
                            params.BatteryMovingId = id;
                            location.href = url + Ext.urlEncode(params);
                        }
                    }
                })
              );

    movingGrid.store.on({
        write: function() {
            this.masterView.store.reload();
        },
        scope: this
    });



    Ext.apply(cfg, {
        dataIndexKey: 'TireId',
        master: { xtype: 'view.tiregrid' },
        details: [
               movingGrid,
              {
                  xtype: 'grid',
                  loadMask: true,
                  columnLines: true,
                  stripeRows: true,
                  title: 'Наработка шины',
                  store: new Ext.data.DirectStore({
                      autoLoad: false,
                      autoSave: false,
                      autoDestroy: true,
                      api: {
                          read: Kdn.Direct.TireCardRead
                      },
                      fields: ['VehicleString', 'InstallDate', 'RemoveDate', 'mName', 'y', 'Work', 'SummaryWork'],
                      root: 'data'
                  }),
                  columns: [
                     {
                         header: 'Автомобиль',
                         dataIndex: 'VehicleString',
                         width: 400
                     },
                     {
                         header: 'Дата установки',
                         dataIndex: 'InstallDate',
                         xtype: 'datecolumn'
                     },
                     {
                         header: 'Дата снятия',
                         dataIndex: 'RemoveDate',
                         xtype: 'datecolumn'
                     },
                     {
                         header: 'Месяц',
                         dataIndex: 'mName'
                     },
                     {
                         header: 'Год',
                         dataIndex: 'y'
                     },
                     {
                         header: 'км/маш.ч',
                         dataIndex: 'Work'
                     },
                     {
                         header: 'c нач. экспл.',
                         dataIndex: 'SummaryWork'
                     }
                  ],
                  tbar: [
                     '-',
                     {
                         text: 'Обновить',
                         iconCls: 'icon-refresh',
                         handler: function() {
                             this.ownerCt.ownerCt.store.reload();
                         }
                     },
                     '-',
                     {
                         xtype: 'tbspacer',
                         width: 10
                     }
                  ]
                 },
                {
                    title:'Шины по гар.№'
                }
            ]

    });

    T.view.Tire.superclass.constructor.call(this, cfg);

}  
});


Ext.reg('view.tire', T.view.Tire);


T.view.TireGrid = Ext.extend(Kdn.view.BaseGrid, {
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
                        dataIndex: 'TireModel',
                        hideable:false,
                        header: 'Модель',
                        editor: { xtype: 'combo.tiremodel' },
                        renderer:function(v){
                           if(!v)return v;
                            return v['TireModelName']+v['Description'];
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
                   },
                   {
                       dataIndex: 'IsInStock',
                       align: 'center',
                       header: 'На складе',
                       width: 100,
                       renderer: Kdn.CheckRenderer,
                       editor: { xtype: 'kdn.editor.booleanfield', renderer: Kdn.CheckRenderer, allowBlank: true }
                   },
                   {
                       dataIndex: 'RemoveDate',
                       xtype: 'datecolumn',
                       editor: { xtype: 'kdn.editor.datefield', allowBlank:true },
                       header: 'Дата снятия с авто',
                       width: 110
                   },
                    {
                        dataIndex: 'Description',
                        header: 'Примечание',
                        width: 120,
                        editor: { xtype: 'kdn.editor.textfield', allowBlank: true }
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

Ext.reg('view.tiregrid', T.view.TireGrid);