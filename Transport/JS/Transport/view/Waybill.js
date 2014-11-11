T.view.Waybill = Ext.extend(Kdn.view.BaseGrid, {
    requireModels:'WaybillType,Customer,Trailer,BodyType,TransportColumn',
    modelName: 'v_WaybillList',
    pageSize : 50,
    pageMode: 'remote',
    editor:'view.waybilleditor',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {

            colModel: new Ext.grid.ColumnModel({
                defaults:{
                  filter:{},
                  width: 80
                },
                columns: [
                  {
                        header:'Состояние',
                        align:'center',
                        dataIndex:'WaybillState',
                        renderer:function (v, p, record){
                            p.css += ' t-iconColumn';
                            return String.format('<div class="icon-lock{0}">&#160;</div>', v>1 ? '' : '-unlock');
                        },
                        filter: {
                            field: {
                                xtype: 'combo.waybillstate',
                                objectValue: false,
                                enableClear: true
                            },
                            fieldEvents: ["select"]
                        }
                  },
                  {
                        header: '№ пут.листа',
                        align:'center',
                        dataIndex: 'WaybillId',
                        width: 100,
                        editor: { xtype: 'kdn.editor.id' }
                  },
                  {
                        header: '№(старый)',
                        align: 'center',
                        hidden:true,
                        dataIndex: 'WaybillNumber',
                        width: 100,
                        editor: { xtype: 'kdn.editor.id' }
                  }, 
                  {
                        header: '№ бланка',
                        align:'center',
                        dataIndex: 'FormNumber',
                        width: 100,
                        editor: { xtype: 'kdn.editor.id' }
                  },   
                                  
                  {
                        header: '№ п.п.',
                        dataIndex: 'Position',
                        width: 80,
                        hidden:true,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'ColumnId',
                        header: 'Колонна',
                        width: 100,
                        editor: { xtype: 'combo.transportcolumn', objectValue: false, allowBlank: true, enableClear: true },
                        renderer: function (o) {
                            if (!o) return null;
                            var store = Kdn.ModelFactory.getStore('TransportColumn');
                            var record = store.getById(o);
                            if (record) return record.data['ColumnName']
                        },
                        filter: {
                            field: {
                                xtype: 'combo.transportcolumn',
                                objectValue: false,
                                enableClear: true
                            },
                            fieldEvents: ["select"]
                        }
                    },
                  {
                        header: 'ТС',
                        dataIndex: 'Car',
                        width: 250,
                        renderer:function(e){
                           if(!e) return e;
                           return String.format("[{0}] {1} {2}",
                              e.GarageNumber,
                              e.Model,
                              e.RegistrationNumber
                           )
                        },
                        filter:{
                           field:{
                              xtype:'combo.car',
                              enableClear:true
                           },
                           fieldEvents:["select"]                                                
                        }
                  },
                    {
                        header:'№ пачки',
                        dataIndex:'PackageId',
                        width:100
                    } ,              
                  {
                     header:'График',
                     dataIndex:'ScheduleId',
                     hidden:true,
                     width:100,
                     renderer:function(v){
                        if(!v) return v;
                        var store = Kdn.ModelFactory.getStore('Schedule'),
                            rec = store.getById(v);
                        if(rec) return rec.get('ScheduleName');
                        return null;
                     }
                  },
                  {
                     header:'Смена',
                     dataIndex:'Shift',
                     width:40
                  },
                  {
                        header:'Дата выезда',
                        dataIndex:'DepartureDate',
                        renderer: function(v){
                            if (!Ext.isDate(v)) return v;
                            else{
                                return String.format('{0} <span style="color:blue">{1}<span>',v.format('d.m.Y'),v.format('H:i'))
                            }
                        },                        
                        width:120
                    },
                    {
                        header:'Дата возвр.',
                        dataIndex:'ReturnDate',
                        renderer: function(v){
                            if (!Ext.isDate(v)) return v;
                            else{
                                return String.format('{0} <span style="color:blue">{1}<span>',v.format('d.m.Y'),v.format('H:i'))
                            }
                        }, 
                        width:120
                    },
                    
                    {
                     header:'Мат.отв. водитель',
                     width:240,
                     dataIndex:'ResponsibleDriver',
                     renderer:T.combo.Driver.prototype.renderTpl,
                     filter:{
                           field:{
                              xtype:'combo.driver',
                              enableClear:true
                           },
                           fieldEvents:["select"]                                                
                     }                  
                  },
                  {
                        header:'Прицеп',
                        width:200,
                        dataIndex:'TrailerId',
                        renderer:T.combo.Trailer.prototype.renderTpl,
                        filter:{
                           field:{
                              xtype:'combo.trailer',
                              enableClear:true
                           },
                           fieldEvents:["select"]                                                
                        }
                  },  
                    {
                        header:'Маршрут',
                        align:'center',
                        dataIndex:'Way',
                        hidden:true,
                        width:100
                    },
                    {
                        header:'Бланк',
                        width:120,
                        hidden:true,
                        dataIndex:'WaybillTypeId'
                    },
                    {
                        header:'Бухг. период',
                        width:120,
                        dataIndex:'AccPeriod'
                    },
                    {
                        header: '№ приказа',
                        width: 120,
                        dataIndex: 'OrderNumber'
                    },
                    {
                        header: 'Дата приказа',
                        xtype:'datecolumn',
                        width: 120,
                        dataIndex: 'OrderDate'
                    },
                    {
                        dataIndex: 'BodyTypeId',
                        header: 'Тип кузова',
                        width: 200,
                        editor: { xtype: 'combo.bodytype', objectValue: false, editable: true },
                        renderer: function (o) {
                            if (!o) return null;
                            var store = Kdn.ModelFactory.getStore('BodyType');
                            var record = store.getById(o);
                            if (record) return record.data['BodyTypeName']
                        },
                        filter: {
                            field: {
                                xtype: 'combo.bodytype',
                                objectValue: false,
                                enableClear: true
                            },
                            fieldEvents: ["select"]
                        }
                    }                                     
                ]
            }),
            
            viewConfig:{
                getRowClass: function(record, rowIndex, rp, ds){
                    return record.get('WaybillState')>1?'green':'';
                }
            }
        });

        T.view.Waybill.superclass.constructor.call(this, cfg);
        
        this.on({
            viewready:this.onAfterRender,
            scope:this,
            single:true
        });
        
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
            'Период:',
            {
               xtype:'datefield',
               cls:'waybillPeriod',
               plugins:'monthPickerPlugin',
               format:'F Y',
               width:130,
               triggersConfig: [{ iconCls: "x-form-clear-trigger", qtip: "Очистить"}],
               listeners:{
                  scope:this,
                  triggerclick: function(item, trigger, index, tag, e)
                   {
                       item.reset();
                       item.fireEvent('select',item);
                   },
                  select:function(field){
                     var store = Kdn.ModelFactory.getStore('v_WaybillList');                                          
                     var startVal = field.getValue();
                     
                     if(Ext.isDate(startVal)){
                       var endVal = startVal.add(Date.MONTH,1);                           
                       var filterData = this.RowFilter.getFilterData();                                                
                        store.reload({
                           params:{
                              sqlFilter:String.format("DepartureDate between '{0}' and '{1}'",
                                 startVal.format('d.m.Y'),
                                 endVal.format('d.m.Y')
                              ),
                              filter:filterData,
                              start:0
                           }
                        });
                                                               
                     }
                     
                     else{
                        store.reload({
                           params:{sqlFilter:""}
                        }); 
                     }
                                                                                   
                     
                  }             
                 }
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
            '-'

        ]
    },
    
    onAfterRender:function(){
      
      if(this.filter){
         this.applyFilter(this.filter);
      }
      else{
         this.store.load();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
      }
         
    
    },
    
    applyFilter:function(filter){     
      
      var Vehicle = filter.Vehicle;
      var Date = filter.Date;
      
      var cm = this.colModel;
      
      this.RowFilter.clearFilters(true);
      
      var column = cm.getColumnAt(cm.findColumnIndex('Car'));      
      var combo = column.filter.field;
      
      combo.setValue(Vehicle);
      
      var period = this.getByCssClass('waybillPeriod');
      period.setValue(Date.getFirstDateOfMonth());
      
      period.fireEvent('select',period);
      
            
      
    }    

});

Ext.reg('view.waybill', T.view.Waybill);