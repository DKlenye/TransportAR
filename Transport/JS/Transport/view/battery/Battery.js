﻿T.view.Battery = Ext.extend(Kdn.view.MasterDetails,{
    requireModels: 'BatteryMaker,BatteryType,BatteryRemoveReason',
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
                     }
                  ]                  
              });
              
              var tbar = movingGrid.getTopToolbar();
              tbar.add(
                new Ext.Button({
                    text:'Карточка АКБ',
                    iconCls:'icon-excel',
                    scope:movingGrid,
                    handler:function(){
                         var url = 'http://db2.lan.naftan.by/ReportServer/Pages/ReportViewer.aspx?/Transport/BatteryCard&rs:Command=Render&rc:Toolbar=false&'
                         
                         var sel = this.getSelectionModel().getSelected();
                         
                         if(sel && sel.get('BatteryMovingId')){
                            var id = sel.get('BatteryMovingId');
                            
                            var params = {};                   
                             params['rs:Format']='Excel';
                             params['rs:ClearSession']=true;
                             params.BatteryMovingId = id;
                             location.href=url+Ext.urlEncode(params);
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
                       fields:['VehicleString','InstallDate','RemoveDate','mName','y','Work','SummaryWork'],
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
                        header:'км/маш.ч',
                        dataIndex:'Work'                        
                     },
                     {
                        header:'c нач. экспл.',
                        dataIndex:'SummaryWork'                        
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
                        editor: { xtype: 'kdn.editor.numberfield' }
                    },
                    {
                        dataIndex: 'WorkUnitId',
                        align:'center',
                        header: 'Ед. работы',
                        width: 100,
                        editor: { xtype: 'combo.workunit', objectValue:false },
                        renderer: function(o) {
                            if (!o && !Ext.isObject(o)) return null;
                            var store = Kdn.ModelFactory.getStore('WorkUnit'),
                                record = store.getById(o);                              
                                if (record) return String.format("({1}) {0}",record.data.WorkUnitName,record.data.UnitName);                              
                                return o;
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
                        dataIndex: 'Norm',
                        align:'center',
                        header: 'Норма, (км/маш.ч.)',
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
                        dataIndex: 'InitWork',
                        align:'center',
                        header: 'Наработка на начало, (км/маш.ч)',
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
                        dataIndex: 'RemainCost',
                        header:'Остаточная стоимость',
                        align:'center',
                        width: 120
                    },
                    {
                        dataIndex:'RemainPrcn',
                        header:'Износ, %',
                        width: 120,                        
                        renderer: function( v, metaData, record, rowIndex, colIndex, store ) {
                           
                           if (!Ext.isNumber(v)) return null;
                                                                                      
                           var tpl = '<div class="x-progress-wrap" style="height: 16px;">'+
                                    '<div class="x-progress-inner">'+
                                        '<div class="x-progress-bar" style="height: 16px; width: {0}%;">'+                                            
                                        '</div>'+
                                        '<div class="x-progress-text x-progress-text-back" style="width:100%; color:black">'+
                                            '<div style="width:100%" height: 18px;">{0}%</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'
                        
                            return String.format(tpl,v);                        
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
            },'-',
            {
                text:'Перерасчёт износа'
            },'-',
            '->',
            {
                xtype:'checkbox'                   
            }
            
            

        ]
    },
    getInsertText: function()
    {
        return 'Добавление :: АКБ'
    },

    getEditText: function()
    {
        return 'Редактирование :: АКБ'
    }
    
});

Ext.reg('view.batterygrid', T.view.BatteryGrid);