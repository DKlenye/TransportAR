T.view.Tire = Ext.extend(Kdn.view.MasterDetails, {
requireModels:'TireModel,TireStandard,TireMaker,TireRemoveReason,TireTechState',
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
                             );
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
                          dataIndex: 'IsSpare',
                          align: 'center',
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
                     },
                     {
                         header: 'Тех. состояние',
                         dataIndex: 'TireTechStateId',
                         renderer: function (v, metaData, record, rowIndex, colIndex, store) {
                             if (!v) {
                                 var removeReason = record.get("TireRemoveReasonId");
                                 if (removeReason) {
                                     var reason = Kdn.ModelFactory.getStore('TireRemoveReason'),
                                    techState = reason.getById(removeReason).get('State');
                                     if (techState) {
                                         return techState.TireTechStateName;
                                     }
                                 }

                                 return null;
                             }
                             var s = Kdn.ModelFactory.getStore('TireTechState'),
                               r = s.getById(v);
                             if (r) return r.get('TireTechStateName');
                             return null;
                         },
                         editor: { xtype: 'combo.tiretechstate', objectValue: false, allowBlank: true, enableClear: true },
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
                        var sel = this.getSelectionModel().getSelected();

                        if (sel && sel.get('TireMovingId')) {
                            var id = sel.get('TireMovingId');
                            var params = {};
                            params.movings = id+'';
                            Kdn.Reporter.exportReport("TireCard", params);
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


    var sm = new Ext.grid.CheckboxSelectionModel({
        listeners: {
            selectionChange: this.onVehicleTiresSelect,
            scope:this,
            buffer:500
        }
    });


    this.VehicleTiresSM = sm;
    
    var VehicleTiresStore = new Ext.data.DirectStore({
        autoLoad: false,
        autoSave: false,
        autoDestroy: true,
        api: {
            read: Kdn.Direct.VehicleTiresRead
        },
        fields: ['FactoryNumber', 'Season', 'TireMovingId', 'InstallDate', 'RemoveDate','RemoveReason','IsWriteOff'],
        root: 'data'
    });

    this.TireWorkStore = new Ext.data.JsonStore();
    
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
                         header: 'км/мес',
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
                    title:'Шины по гар.№',
                    xtype: 'panel',
                    layout: 'border',
                    store:VehicleTiresStore,
                    items:[
                        {
                            xtype: 'grid',
                            loadMask: true,
                            columnLines: true,
                            stripeRows: true,
                            region: 'west',
                            width:700,
                            split:true,
                            border:false,
                            store: VehicleTiresStore,
                            sm: sm,
                            viewConfig: {
                                getRowClass: function (record, rowIndex, rp, ds) {
                                    var cls = 'notActual';
                                    return record.get('IsWriteOff') ? cls : '';
                                }
                            },
                            columns: [
                                sm,
                                 {
                                    dataIndex: 'FactoryNumber',
                                    header: 'Заводской №',
                                    width: 110
                                },
                                 {
                                     dataIndex: 'Season',
                                     header: 'Сезонность',
                                     width: 100,
                                     editor: { xtype: 'combo.tireseason', objectValue: false, allowBlank: true, enableClear: true },
                                     renderer: function(v) {
                                         if (!v) return v;
                                         var o = {
                                             1: 'Летняя',
                                             2: 'Зимняя'
                                         };
                                         return o[v];
                                     }
                                 },
                                 {
                                      header: 'Дата установки',
                                      dataIndex: 'InstallDate',
                                      xtype: 'datecolumn',
                                      width: 100
                                 },
                                 {
                                     header: 'Дата снятия',
                                     dataIndex: 'RemoveDate',
                                     xtype: 'datecolumn',
                                     width: 100
                                 },
                                {
                                    header: 'Причина снятия',
                                    dataIndex: 'RemoveReason',
                                    width: 250
                                }
                            ],
                            tbar: [
                                {
                                    text: 'Карточки работы шин',
                                    iconCls: 'icon-excel',
                                    handler: function() {
                                        var sel = this.ownerCt.ownerCt.selModel.getSelections();
                                        var a = [];
                                        Ext.each(sel, function(s) {
                                            a.push(s.get('TireMovingId'));
                                        });
                                        var params = {};
                                        params.movings = a.join(',');
                                        Kdn.Reporter.exportReport("TireCard", params);
                                    }
                                }
                            ]
                        },
                        {
                            region: 'center',
                            id:'TireWorkGrid',
                            split:true,
                            border: false,
                            xtype: 'editorgrid',
                            loadMask: true,
                            columnLines: true,
                            stripeRows: true,
                            store: this.TireWorkStore,
                            columns: [
                                {
                                    header: 'Период',
                                    width: 150
                                }
                            ],
                            tbar: [
                                {
                                    text: 'Обновить',
                                    iconCls: 'icon-refresh',
                                    handler:function() {
                                        this.onVehicleTiresSelect(this.VehicleTiresSM);
                                    },
                                    scope:this
                                }
                            ],
                            listeners: {
                            keypress: function(e) {
                                if (e.getKey() == 48) {
                                        var grid = Ext.getCmp('TireWorkGrid');
                                        var sel = grid.getSelectionModel().getSelectedCell();
                                        
                                        var fieldName = grid.store.fields.itemAt(sel[1] + (sel[1]-1)*2).name;
                                        var rec = grid.store.getAt(sel[0]);
                                        rec.beginEdit();
                                        rec.set(fieldName, 0);
                                        rec.endEdit();
                                    }

                                if (e.getKey() == e.SPACE) {
                                        var grid = Ext.getCmp('TireWorkGrid');
                                        var sel = grid.getSelectionModel().getSelectedCell();
                                        var fieldName = grid.store.fields.itemAt(sel[1] + (sel[1] - 1) * 2).name;
                                        var rec = grid.store.getAt(sel[0]);

                                        rec.beginEdit();
                                        rec.set(fieldName, null);
                                        rec.endEdit();
                                    }
                                },
                                scope:this
                            }
                        }
                    ]
                }
            ]

    });

    T.view.Tire.superclass.constructor.call(this, cfg);

},

onVehicleTiresSelect:function(sm) {
    var sel = sm.getSelections();
    var movings = [];
    var fields = ['period'];
    var columns = [
    {
        header: 'Период',
        width:110,
        dataIndex: 'period',
        renderer:function(v) {
            return Date.parseDate(v+'01', 'Ymd').format('Y F');
        }
    }];
    sel.forEach(function(e) {
        var id = e.get('TireMovingId') + '';
        movings.push(id);
        fields.push(id);
        fields.push(id + '_sum');
        fields.push(id + '_isHanded');
        
        columns.push({
            dataIndex: id + '',
            align: 'center',
            header: e.get('FactoryNumber'),
            width: 120,
            renderer: function(v, meta, r, rI, cI, s) {
                if (!Ext.isNumber(v)) return null;

                var tpl = '<div style="display:inline-block; text-align:right; width:45px;{2}">{0}</div>' +
                    '<div style="display:inline-block; text-align:right; width:45px; color:blue;">{1}</div>';
                
                return String.format(
                    tpl,
                    v,
                    r.get(id + '_sum'),
                    r.get(id+'_isHanded')?"color:red;":""
                    );
            },
            editor: {
                xtype: 'numberfield',
                selectOnFocus:true
            }
        });

    });
    
    var filter = {
        movings: movings
    };
    
    this.TireWorkStore = new Ext.data.DirectStore({
            autoLoad: false,
            autoSave: false,
            autoDestroy: true,
            api: {
                read: Kdn.Direct.VehicleTiresWorkRead
            },
            listeners: {
              update:this.onTireWorkUpdate,
              scope:this  
            },
            fields: fields,
            idProperty:'period',
            root: 'data'
        });
        
        this.TireWorkStore.reload({
            params: { filter: filter }
        });

    var colModel = new Ext.grid.ColumnModel({
        columns: columns
    });

    Ext.getCmp('TireWorkGrid').reconfigure(this.TireWorkStore, colModel);
} ,

onTireWorkUpdate: function(s, r) {

    var data = {};
    Ext.iterate(r.modified, function(key, val) {
        data.TireMovingId = key;
    });
    
    data.period = r.get('period');
    data.Km = r.get(data.TireMovingId);
    if (!Ext.isNumber(data.Km)) data.Km = null;
    Kdn.Direct.UpdateTireWork(data, this.onTireWorkSave.createDelegate(this));
},

onTireWorkSave:function() {
   // this.onVehicleTiresSelect(this.VehicleTiresSM);
},

refreshView: function (view) {
    this.refreshBuffer.push(view);
    if (view.store && this.filterValue) {
        var filter = {};
        filter[this.dataIndexKey] = this.filterValue;
        filter["showObsolete"] = this.masterView.showObsolete.pressed;

        view.store.reload({
            params: { filter: filter }
        });
    }
}

});


Ext.reg('view.tire', T.view.Tire);


T.view.TireGrid = Ext.extend(Kdn.view.BaseGrid, {
requireModels:'TireModel,TireStandard,TireMaker',
editor:'view.tireeditor',
    modelName: 'v_Tire',
    pageSize: 50,
    pageMode: 'remote',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {
            viewConfig: {
                getRowClass: function (record, rowIndex, rp, ds) {
                    var cls = 'notActual';
                    return record.get('isWriteOff') ? cls : '';
                }
            },
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
                        dataIndex: 'GarageNumber',
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
                            return v['TireModelName']+' '+ (v['Description']||"");
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
                        dataIndex: 'KmStart',
                        header: 'Начальный пробег, км',
                        width: 120,
                        editor: { xtype: 'kdn.editor.numberfield', allowBlank: true }
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
                       editor: { xtype: 'kdn.editor.booleanfield', renderer: Kdn.CheckRenderer, allowBlank: true, value:false }
                   },
                   {
                       dataIndex: 'IsNotReplaceable',
                       align: 'center',
                       header: 'Установлены постоянно',
                       width: 100,
                       renderer: Kdn.CheckRenderer,
                       editor: { xtype: 'kdn.editor.booleanfield', renderer: Kdn.CheckRenderer, allowBlank: true, value: false }
                   },
                   {
                       dataIndex: 'IsInStock',
                       align: 'center',
                       header: 'На складе',
                       width: 120,
                       renderer: Kdn.CheckRenderer,
                       filter: {
                           field: new Kdn.form.ComboBox({
                               displayField: 'name',
                               valueField: 'id',
                               objectValue: false,
                               enableClear: true,
                               store: new Ext.data.ArrayStore({
                                   fields: ['id', 'name'],
                                   data: [[1, 'На складе']]
                               })
                           }),
                           fieldEvents: ["select"]
                       }
                   },
                    {
                        dataIndex: 'Wear',
                        header: 'Износ, %',
                        width: 120,
                        renderer: function(v, metaData, record, rowIndex, colIndex, store) {

                            if (!Ext.isNumber(v)) return null;

                            var tpl = '<div class="x-progress-wrap" style="height: 16px;">' +
                                '<div class="x-progress-inner">' +
                                '<div class="x-progress-bar" style="height: 16px; width: {0}%;">' +
                                '</div>' +
                                '<div class="x-progress-text x-progress-text-back" style="width:100%; color:black">' +
                                '<div style="width:100%" height: 18px;">{0}%</div>' +
                                '</div>' +
                                '</div>' +
                                '</div>';

                            return String.format(tpl, v);
                        }

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
                xtype: 'tbspacer',
                width: 20
            }, '-',
            {
                iconCls: '',
                text: 'Показывать списанные',
                ref:'/showObsolete',
                pressed: true,
                enableToggle: true,
                scope: this,
                handler: function (field) {
                    var store = this.store;
                    store.reload({
                        params: {
                            sqlFilter: field.pressed ? "" : "isWriteOff = 0"
                        }
                    });
                }
            }, '-'
            
        ]
    }
});

Ext.reg('view.tiregrid', T.view.TireGrid);
