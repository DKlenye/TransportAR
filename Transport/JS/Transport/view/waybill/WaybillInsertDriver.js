   T.view.waybill.WaybillInsertDriver = Ext.extend(Kdn.editor.LocalGrid, {
    startEditColumn:1,
    clicksToEdit:2,
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {
            viewConfig:{
               forceFit:true
            }, 
            colModel: new Ext.grid.ColumnModel({
               columns:[
                  {
                    dataIndex:'sel',
                    header:'&nbsp;',
                    renderer: Ext.ux.grid.CheckColumn.prototype.renderer,
                    width:40,
                    fixed:true
                  },
                  {
                     header:'Водитель',
                     dataIndex:'Driver',
                     editor:{xtype:'combo.driver'},
                     renderer:T.combo.Driver.prototype.renderTpl
                  }
               ]
            }),
            store:Kdn.ModelFactory.getModel('WaybillDriver').buildStore({
               autoLoad:false,
               autoSave:false
            }),
            loadMask:true
        });
        
        this.addEvents(
         'driversselect'
        );
        
        cfg.store.on({
         scope:this,
         update:this.onStoreUpdate
      });
      
      this.on({
         beforeedit:this.onBeforeEdit,
         scope:this
      });
      
      
        
        T.view.waybill.WaybillInsertDriver.superclass.constructor.call(this, cfg);
    },    
    
    
    onBeforeEdit:function(o){
      return o.record.get('Driver')==null;
    },
    
    onEnter:function(){
      var s = this.store,
          sm = this.getSelectionModel(),
          sel = sm.getSelected(),
          forDelete = [];
      
      s.each(function(r){
         if(sel!= r){
            if(r.get('sel')!= true)
            forDelete.push(r);
         } 
      },this);
      
      s.remove(forDelete);
      sm.selectLastRow();
      this.resetSel();
      this.fireEvent('driversselect',this);            
    },
    
    onSpace:function(){
     var sel = this.getSelectionModel().getSelected();
        if(sel){
         sel.set('sel',!sel.get('sel'));
        }
    },
    
    resetSel:function(){
      this.store.each(function(r){
         r.set('sel',false);
      });
    },
    
    onStoreUpdate:function(store,record,operation){
      var resp = 'isResponsible', driver = 'Driver',id='DriverId';     
      
      store.data.each(function(e){
         if (e!=record && e.get(driver) && record.get(driver) && e.get(driver)[id]==record.get(driver)[id]){
            store.remove(record);
            return false;
         }
      });               
    }        
    
});

Ext.reg('view.waybill.waybillinsertdriver', T.view.waybill.WaybillInsertDriver);