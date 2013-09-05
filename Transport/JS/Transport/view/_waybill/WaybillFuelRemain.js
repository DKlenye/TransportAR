
T.view.waybill.WaybillFuelRemain = Ext.extend(Kdn.editor.LocalGrid, {
    startEditColumn:2,    
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {
            tbar:null,
            colModel: new Ext.grid.ColumnModel({
               columns: [
                   {
                       header: 'Топливо',
                       dataIndex: 'FuelId',
                       align:'center',
                       width: 90                    
                   },
                   {
                       header:'Выезд',
                       dataIndex:'DepartureRemain',
                       renderer:function(v,meta){
                           meta.css='departure'
                           return v;
                       }
                   },
                   {
                       header: 'Возвр.',
                       dataIndex:'ReturnRemain',
                       editor: {
                           xtype: 'numberfield',
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
                       header:'ФАКТ',
                       dataIndex:'Consumption'                    
                   },
                   {
                       header: 'НОРМА',
                       dataIndex: 'NormConsumption',
                       renderer:function(v,meta){
                               meta.css='consumption';return v;
                       }
                   },
                   {
                       header:'+/-',
                       dataIndex:'Diff',
                       renderer:function(v,meta,rec,row,col,store){
                           meta.css= v>0?'diffWaste':'diffEconomy'; 
                           return v;                                               
                       }
                   }
               ]
            }),
            store:Kdn.ModelFactory.getModel('WaybillFuelRemain').buildStore({
               autoLoad:false,
               autoSave:false
            }),
            loadMask:true
        });

        T.view.waybill.WaybillFuelRemain.superclass.constructor.call(this, cfg);
    },
    
    initComponent:function(){
      this.on({
         scope:this,
         afteredit:this.onAfterEdit,
         beforeedit:this.onBeforeEdit
      });
      T.view.waybill.WaybillFuelRemain.superclass.initComponent.call(this);
      
    },
    
    add:Ext.emptyFn,
    remove:Ext.emptyFn,
    
   
    setData:function(data){
                
      var remains = data["WaybillFuelRemain"];
      this.store.loadData({ data: remains }, false);
      
    },
    
    
    onAfterEdit:function(e){
      /*  var main = this.mainView;
        main.refreshFactRecord(e.record);
        main.refreshDiffRecord(e.record);
        */
    },

    onBeforeEdit: function(e) {

    /*if (this.mainView.isDispClosed()) return false;
    
        if (e.field == 'ZeroDiff'){
            e.record.beginEdit();
            e.record.set('ReturnRemain',e.value<0?0:e.value);
            e.record.endEdit();
            this.onAfterEdit(e);
            return false;
        }*/
    }
    
        
});

Ext.reg('view.waybill.waybillfuelremain', T.view.waybill.WaybillFuelRemain);

