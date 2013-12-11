
T.view.waybill.WaybillFuelRemain = Ext.extend(Kdn.editor.LocalGrid, {
    startEditColumn:2,    
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {
            enableHdMenu:false,
            enableColumnMove:false,
            enableColumnResize:false,
            tbar:null,
            colModel: new Ext.grid.ColumnModel({
               defaults:{
                  align:'center',
                  sortable:false
               },
               columns: [
                   {
                       header: 'Топливо',
                       dataIndex: 'FuelId',
                       align:'left',
                       fixed:true,
                       width: 120 ,
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
                       header:'Выезд',
                       dataIndex:'DepartureRemain',
                       renderer:function(v,meta){
                           meta.css='departure'
                           return v;
                       },
                       editor: {
                           xtype: 'kdn.editor.decimalfield',
                           allowDecimals: true,
                           decimalPrecision: 2,
                           selectOnFocus:true,
                           allowNegative:false                        
                       }
                   },
                   {
                       header: 'Возвр.',
                       dataIndex:'ReturnRemain',
                       editor: {
                           xtype: 'kdn.editor.decimalfield',
                           allowDecimals: true,
                           decimalPrecision: 2,
                           selectOnFocus:true,
                           allowNegative:false                        
                       },
                       renderer:function(v,meta){
                           meta.css='return'
                           return v;
                       }
                   },
                   {
                       header:'(+/-) = 0',
                       dataIndex:'ZeroDiff',
                       editor:{xtype:'numberfield'},
                       renderer:function(v,meta,rec,row,col,store){
                           meta.css='zeroDiff' 
                           return v;                                               
                       }
                   },
                   {
                       header:'Выдано',
                       dataIndex:'Refuelling'
                   },                   
                   {
                       header: 'НОРМА',
                       dataIndex: 'NormConsumption',
                       renderer:function(v,meta){
                               meta.css='consumption';return v;
                       }
                   },
                   {
                       header:'ФАКТ',
                       dataIndex:'Consumption'                    
                   },
                   {
                       header:'+/-',
                       dataIndex:'Diff',
                       renderer:function(v,meta,rec,row,col,store){
                           meta.css= v>0?(v>1?'diffWasteBig':'diffWaste'):(v<-1?'diffEconomyBig':'diffEconomy'); 
                           return v;                                               
                        } 
                   }
               ]
            }),
            store:Kdn.ModelFactory.getModel('WaybillFuelRemain').buildStore({
               autoLoad:false,
               autoSave:true
            }),
            loadMask:true,
            viewConfig:{
               forceFit:true
            }
        });

        T.view.waybill.WaybillFuelRemain.superclass.constructor.call(this, cfg);
    },
    
    initComponent:function(){
      this.on({
         scope:this,
         afteredit:this.onAfterEdit,
         beforeedit:this.onBeforeEdit
      });
      
      this.store.on({
         scope:this,
         write:function(){this.mainView.refreshAll();}
      })
      
      T.view.waybill.WaybillFuelRemain.superclass.initComponent.call(this);
      
    },
    
    add:Ext.emptyFn,
    remove:Ext.emptyFn,
    
   
    setData:function(data){
                
      var remains = data["WaybillFuelRemain"];
      this.store.loadData({ data: remains }, false);
      
    },
    
    
    onAfterEdit:function(e){
        
    },

    onBeforeEdit: function(e) {

    if (this.mainView.isDispClosed()) return false;
    
        if (e.field == 'ZeroDiff'){
            e.record.beginEdit();
            e.record.set('ReturnRemain',e.value<0?0:e.value);
            e.record.endEdit();
            this.onAfterEdit(e);
            return false;
        }
        
        
        if(e.field == 'DepartureRemain'){
            return false;
        }
        
    }        
        
});

Ext.reg('view.waybill.waybillfuelremain', T.view.waybill.WaybillFuelRemain);

