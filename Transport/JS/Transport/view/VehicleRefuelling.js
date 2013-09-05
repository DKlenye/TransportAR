T.view.VehicleRefuelling = Ext.extend(Kdn.view.BaseGrid, {
    requireModels:'',
    modelName: 'VehicleRefuelling',
    pageSize : 50,
    pageMode: 'remote',
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
                       header: 'Код',
                       hidden: true,
                       width: 30,
                       dataIndex: 'RefuellingId'
                   },
                   {
                       header: 'Количество',
                       dataIndex: 'Quantity',
                       width: 90,
                       editor: { xtype:'kdn.editor.decimalfield'},
                       align: 'center'
                   },
                   {
                       header: 'Дата',
                       xtype: 'datecolumn',
                       dataIndex: 'RefuellingDate',
                       width: 130,
                       align: 'center'
                   },
                   {
                       header: 'Топливо',
                       dataIndex: 'FuelId',
                       width: 105,
                       renderer:function(o){
                           if(!o) return o;
                           var store = Kdn.ModelFactory.getStore('Fuel'),
                              rec = store.getById(o);
                           if(rec){
                              return rec.data.FuelName
                           }
                           return o;
                       }
                   },                
                   {
                       header: 'Место выдачи',
                       dataIndex: 'RefuellingPlaceId',                    
                       width: 150,
                       renderer:function(o){
                           if(!o) return o;
                           var store = Kdn.ModelFactory.getStore('RefuellingPlace'),
                              rec = store.getById(o);
                           if(rec){
                              return rec.data.RefuellingPlaceName
                           }
                           return o;
                       }                 
                   },
                   {
                       header: 'Водитель',
                       dataIndex: 'Driver',
                       width: 250,
                       renderer:T.combo.Driver.prototype.renderTpl
                   },
                   {
                       header: '№ карты',
                       dataIndex: 'CardNumber',
                       editor: {xtype: 'kdn.editor.textfield',allowBlank:true},
                       width: 90                  
                   }                                                 
                ]
            })          
        });

        T.view.VehicleRefuelling.superclass.constructor.call(this, cfg);
        
        /*
        this.on({
            viewready:this.onAfterRender,
            scope:this,
            single:true
        });
        */
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
                     var store = Kdn.ModelFactory.getStore('Waybill');                                          
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

Ext.reg('view.vehiclerefuelling', T.view.VehicleRefuelling);