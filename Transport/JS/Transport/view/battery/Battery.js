T.view.Battery = Ext.extend(Kdn.view.MasterDetails,{
    requireModels: 'BatteryMaker,BatteryType,BatteryRemoveReason,BatteryTechState',
    constructor: function(cfg)
    {
        cfg = cfg || {};
        
        
        var movingGrid = new Kdn.grid.LocalEditorGrid({
                  title:'Движение АКБ',
                  clicksToEdit: 2,
                  store:Kdn.ModelFactory.getModel('BatteryMoving').buildStore({
                     autoLoad:false,
                     autoSave:true,
                     autoDestroy:true
                  }),
                  loadMask:true,
                  columns:[
                      {
                        header:'Код',
                        dataIndex:'BatteryMovingId',
                        width:60                        
                     },
                     {
                              header: 'Автомобиль(Прицеп)',
                              dataIndex: 'Vehicle',
                              width: 400,
                              renderer:function(e){
                                 if(!e) return e;
                                 return String.format("[{0}] {1} {2}",
                                    e.GarageNumber,
                                    e.Model,
                                    e.RegistrationNumber
                                 )
                              },
                              editor:{
                                    xtype:'combo.vehicle',
                                    enableClear:true
                                 }

                     },
                     {
                         dataIndex: 'WorkUnitId',
                         align: 'center',
                         header: 'Ед. работы',
                         width: 200,
                         editor: { xtype: 'combo.workunit', objectValue: false },
                         renderer: function (o) {
                             if (!o && !Ext.isObject(o)) return null;
                             var store = Kdn.ModelFactory.getStore('WorkUnit'),
                                record = store.getById(o);
                             if (record) return String.format("({1}) {0}", record.data.WorkUnitName, record.data.UnitName);
                             return o;
                         }
                     },
                     {
                        header:'Дата установки',
                        xtype:'datecolumn',
                        dataIndex:'InstallDate',
                        editor:{xtype:'datefield'},
                        width:120
                     },
                     {
                        header:'Дата снятия',
                        xtype:'datecolumn',
                        dataIndex:'RemoveDate',
                        editor:{xtype:'datefield'},
                        width:120
                    },

                     {
                        header:'Причина снятия',
                        dataIndex:'BatteryRemoveReasonId',
                        editor: { xtype: 'combo.batteryremovereason',objectValue:false, enableClear:true},
                        renderer:function(v){
                           if(!v)return v;
                           var s = Kdn.ModelFactory.getStore('BatteryRemoveReason'),
                               r = s.getById(v);
                           if(r) return r.get('BatteryRemoveReasonName');
                           return null;
                        },
                        width:200
                    },
                     {
                        header:'Тех. состояние',
                        dataIndex: 'BatteryTechStateId',
                        renderer:function(v, metaData, record, rowIndex, colIndex, store){
                           if (!v) {

                               var removeReason = record.get("BatteryRemoveReasonId");
                               if (removeReason) {
                                   var reason = Kdn.ModelFactory.getStore('BatteryRemoveReason'),
                                    techState = reason.getById(removeReason).get('State');
                                    if (techState) {
                                        return techState.BatteryTechStateName;
                                    }
                               }

                               return null;
                           }
                           var s = Kdn.ModelFactory.getStore('BatteryTechState'),
                               r = s.getById(v);
                           if(r) return r.get('BatteryTechStateName');
                           return null;
                        },
                        editor:{xtype:'combo.batterytechstate', objectValue:false, allowBlank:true, enableClear:true},
                        width:200
                      }
                  ]                  
              });
              
              var tbar = movingGrid.getTopToolbar();
              tbar.add(
                new Ext.Button({
                    text:'Карточка АКБ',
                    iconCls:'icon-excel',
                    scope:movingGrid,
                    handler:function() {
                         var sel = this.getSelectionModel().getSelected();
                         if(sel && sel.get('BatteryMovingId')){
                            var id = sel.get('BatteryMovingId');
                             Kdn.Reporter.exportReport("BatteryCard", {BatteryMovingId : id});
                         }
                    }
                })
              );
              
              movingGrid.store.on({
                write:function(){
                    this.masterView.store.reload();
                },
                scope:this
              });
              
              
        
        Ext.apply(cfg,{
            dataIndexKey:'BatteryId',        
            master:{xtype: 'view.batterygrid'},
            details:[
               movingGrid,
              {
                  xtype:'grid',
                  loadMask:true,
                  columnLines:true,
                  stripeRows:true,
                  title:'Наработка АКБ',
                  store: new Ext.data.DirectStore({
                       autoLoad:false,
                       autoSave:false,
                       autoDestroy:true,
                       api:{
                           read:Kdn.Direct.BatteryCardRead
                       },
                       fields: ['VehicleString', 'InstallDate', 'RemoveDate', 'mName', 'y', 'WorkKm', 'SummaryWorkKm', 'WorkMh', 'SummaryWorkMh'],
                       root: 'data'
                  }),
                  columns:[
                     {
                        header:'Автомобиль',
                        dataIndex:'VehicleString',
                        width:400                    
                     },
                     {
                        header:'Дата установки',
                        dataIndex:'InstallDate',
                        xtype:'datecolumn'                        
                     },
                     {
                        header:'Дата снятия',
                        dataIndex:'RemoveDate',
                        xtype:'datecolumn'                        
                     },
                     {
                        header:'Месяц',
                        dataIndex:'mName'                        
                     },
                     {
                        header:'Год',
                        dataIndex:'y'                        
                     },
                     {
                        header:'км (моточас)',
                        dataIndex:'WorkKm',
                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                            if (record.get('WorkKm') == null) return;
                            return String.format('{0} (<span style = "color:blue;">{1}</span>)', record.get('WorkKm'), record.get('WorkMh'));
                        }                        
                     },
                     {
                         header: 'c нач. экспл. км (моточас)',
                        dataIndex:'SummaryWorkKm',
                        width:200      ,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                            if (record.get('SummaryWorkKm') == null) return;
                            return String.format('{0} (<span style = "color:blue;">{1}</span>)', record.get('SummaryWorkKm'), record.get('SummaryWorkMh'));
                        }                  
                     }
                  ],
                  tbar:[
                     '-',
                     {
                         text: 'Обновить',
                         iconCls: 'icon-refresh',
                         handler: function(){
                           this.ownerCt.ownerCt.store.reload();
                         }
                     },
                     '-',
                     {
                         xtype: 'tbspacer',
                         width: 10
                     }
                  ]
              }
            ]
         
        });

        T.view.Battery.superclass.constructor.call(this, cfg);
                
    }   

});

Ext.reg('view.battery', T.view.Battery);


T.view.BatteryGrid = Ext.extend(Kdn.view.BaseGrid, {
    requireModels:'BatteryMaker,BatteryType',
    editor:'view.batteryeditor',
    modelName: 'v_Battery',
    pageSize:50,
    pageMode:'remote',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {
            viewConfig:{
                getRowClass: function(record, rowIndex, rp, ds){
                    var cls = 'notActual';
                    return record.get('RemoveDate') ? cls : '';
                }
            },
            colModel: new Ext.grid.ColumnModel({
               defaults:{filter:{}},
                columns: [
                    {
                        dataIndex: 'BatteryId',
                        align:'center',
                        header: 'Код',
                        width: 60,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'BatGarageNumber',
                        align:'center',
                        header: 'Гар.№',
                        width: 70
                    },
                    {
                        dataIndex: 'BatteryMakerId',
                        header: 'Производитель',
                        width: 200,
                        editor: { xtype: 'combo.batterymaker',objectValue:false,editable:true },
                        renderer:function(v){
                           if(!v)return v;
                           var s = Kdn.ModelFactory.getStore('BatteryMaker'),
                               r = s.getById(v);
                           if(r) return r.get('BatteryMakerName');
                           return null;
                        }
                    },
                    {
                        dataIndex: 'MakeDate',
                        align:'center',
                        header: 'Дата изг.',
                        xtype:'datecolumn',
                        width: 110,
                        editor: { xtype: 'kdn.editor.datefield' }
                    }, 
                    {
                        dataIndex: 'Cost',
                        align:'center',
                        header: 'Стоимость, руб',
                        width: 120,
                        editor: { xtype: 'kdn.editor.numberfield',allowBlank:true },
                        renderer:function(v) {
                            if (Ext.isNumber(v)) {
                                return v;
                            }
                            return "В стоимости техники";
                        }
                    },
                    {
                        dataIndex: 'BatteryTypeId',
                        header: 'Тип АКБ',
                        width: 90,
                        editor: { xtype: 'combo.batterytype',objectValue:false,editable:true},
                        renderer:function(v){
                           if(!v)return v;
                           var s = Kdn.ModelFactory.getStore('BatteryType'),
                               r = s.getById(v);
                           if(r) return r.get('BatteryTypeName');
                           return null;
                        }
                    },
                                                      
                    {
                        hidden:true,
                        dataIndex: 'Warrantly',
                        align: 'center',
                        header: 'Гарантия, мес',
                        width: 60,
                        editor: { xtype: 'kdn.editor.textfield' }
                    },                   
                    {
                        hidden:true,
                        dataIndex: 'KmNorm',
                        align:'center',
                        header: 'Норма (км)',
                        width: 80,
                        editor: { xtype: 'kdn.editor.numberfield' }
                    },
                    {
                        hidden: true,
                        dataIndex: 'MhNorm',
                        align: 'center',
                        header: 'Норма (моточас)',
                        width: 80,
                        editor: { xtype: 'kdn.editor.numberfield' }
                    },
                    {
                        hidden:true,
                        dataIndex: 'MonthStart',
                        align:'center',
                        header: 'Начальная наработка, мес',
                        width: 50,
                        editor: { xtype: 'kdn.editor.textfield' }
                    },
                    {
                        hidden:true,
                        dataIndex: 'InitKmWork',
                        align:'center',
                        header: 'Наработка на начало, км',
                        width: 70,
                        editor: { xtype: 'kdn.editor.numberfield', allowBlank: true }
                    },
                    {
                        hidden: true,
                        dataIndex: 'InitMhWork',
                        align: 'center',
                        header: 'Наработка на начало, моточас',
                        width: 70,
                        editor: { xtype: 'kdn.editor.numberfield', allowBlank: true }
                    },
                    {
                        hidden:true,
                        dataIndex: 'Doc',
                        header: 'Документ',
                        width: 120,
                        editor: { xtype: 'kdn.editor.textfield', allowBlank: true }
                    },
                    {
                        dataIndex:'Wear',
                        header:'Износ, %',
                        width: 120,                        
                        renderer: function( v, metaData, record, rowIndex, colIndex, store ) {
                           
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
                        
                            return String.format(tpl,v);                        
                        }

                    },
                    {
                        dataIndex: 'IsInStock',
                        align: 'center',
                        header: 'На складе',
                        width: 120,
                        renderer: Kdn.CheckRenderer,
                        filter:{
                           field:new Kdn.form.ComboBox({
                                    displayField: 'name',
                                    valueField: 'id',
                                    objectValue: false,
                                    enableClear: true,
                                    store: new Ext.data.ArrayStore({
                                      fields: ['id','name'],
                                      data: [[1, 'На складе']]
                                  })
                           }),
                           fieldEvents:["select"]                     
                        }
                    },
                    {
                        dataIndex: 'RemoveDate',
                        xtype:'datecolumn',
                        header:'Дата списания',
                        align:'center',
                        width: 110
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
                        hidden:true,
                        xtype:'datecolumn',
                        editor: { xtype: 'kdn.editor.datefield' },
                        header:'Дата установки на автомобиль',
                        width: 110
                    }             
                ]
            })
        });

        T.view.BatteryGrid.superclass.constructor.call(this, cfg);

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
            }, '-',
            {
                iconCls: 'icon-battery-low',
                text: 'Показывать списанные',
                pressed:true,
                enableToggle: true,
                scope:this,
                handler:function(field) {
                    var store = this.store;
                    store.reload({
                            params: {
                                sqlFilter: field.pressed?"": "RemoveDate is null"
                            }
                        });
                    }
            },'-'

        ]
    },
    getInsertText: function() {
        return 'Добавление :: АКБ';
    },

    getEditText: function() {
        return 'Редактирование :: АКБ';
    }
    
});

Ext.reg('view.batterygrid', T.view.BatteryGrid);