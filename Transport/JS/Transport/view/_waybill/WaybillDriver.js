T.view.car.WaybillDriver = Ext.extend(Kdn.editor.LocalGrid, {
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {
            colModel: new Ext.grid.ColumnModel({
               columns:[
                  {
                     header:'Водитель',
                     dataIndex:'Driver',
                     width:300,
                     editor:{xtype:'combo.driver'},
                     renderer:T.combo.Driver.prototype.renderTpl
                  },
                  {
                     header:'мат.отв.',
                     align:'center',
                     dataIndex:'isResponsible',
                     xtype:'checkcolumn',
                     width:100
                  }
               ]
            }),
            store:Kdn.ModelFactory.getModel('WaybillDriver').buildStore({
               autoLoad:false,
               autoSave:false
            }),
            loadMask:true
        });
        
        T.view.car.WaybillDriver.superclass.constructor.call(this, cfg);
    },
    
    initComponent:function(){
      T.view.car.WaybillDriver.superclass.initComponent.call(this);
      
      this.store.on({
         scope:this,
         update:this.onStoreUpdate,
         write:this.onStoreWrite
      });
      
      this.store.on({
        scope:this,
        add:this.onStoreChange,
        remove:this.onStoreChange,
        update:this.onStoreChange,
        datachanged:this.onStoreChange
      });
      
      this.on({
         scope:this,
         beforeEdit:this.onBeforeEdit
      });
      
    },
        
    
    onStoreUpdate:function(store,record,operation){
      var resp = 'isResponsible', driver = 'Driver',id='DriverId';     
      
      if (record.data[resp]){
         if(!record.get(driver)){
            record.beginEdit();
            record.set(resp,false);
            record.endEdit();
            return;
         }
         
         store.data.each(function(e){
                if (e!=record && e.get(resp)){
                    e.beginEdit();
                    e.set(resp,false);
                    e.endEdit();
                }
            });
      }        
      
      store.data.each(function(e){
         if (e!=record && e.get(driver) && record.get(driver) && e.get(driver)[id]==record.get(driver)[id]){
            store.remove(record);
            return false;
         }
      });
               
    },
    
    
    setData:function(data){
      var drivers = data["WaybillDriver"];
      this.store.loadData({ data: drivers }, false);
      
    },
    
   onStoreChange:function(){
      var main = this.mainView,
          refStore = main.refuelling.DriverEditor.store;
      
      refStore.removeAll();
      this.store.each(function(rec){
         if(rec.data.Driver){
            var r = new refStore.recordType(rec.data.Driver);         
            r.beginEdit();
            r.set('display',T.combo.Driver.prototype.renderTpl.call(this,rec.data.Driver));
            r.endEdit();         
            refStore.add(r);
         }
      });
      
   },
   
 /*remove: function(btn, ev)
    {
        var sel = this.getSelectionModel().getSelected();
        if (!sel)
        {
            return false;
        }
        else{
          var _driver = sel.get('Driver');          
          
          if(_driver && _driver['DriverId']){
            var exitFlag = false;
            this.mainView.refuelling.store.each(function(r){
               var driver = r.get('Driver');
               if(driver && driver.DriverId==_driver['DriverId']){
                  exitFlag=true; return false;
               }               
            });
            if (exitFlag) return false;
          }
        }
        this.store.remove(sel);
    },*/
        
    onBeforeEdit:function(e){
      var rec = e.record,
         d = rec.get('Driver');
      
      if(d){
         var exitFlag = false;
            this.mainView.refuelling.store.each(function(r){
               var driver = r.get('Driver');
               if(driver && driver.DriverId==d.DriverId){
                  exitFlag=true; return false;
               }               
            });
         if (exitFlag) return false;
      }
      

    },
    
    onStoreWrite:function(){
      var main = this.mainView,
          ResponsibleDriver = main.waybill.ResponsibleDriver;
      
      if(ResponsibleDriver){
       
         this.store.each(function(r){
            var d = r.get('Driver');
            if(d && d.DriverId && d.DriverId == ResponsibleDriver.DriverId){
               r.beginEdit();
               r.set('isResponsible',true);
               r.endEdit();
               
               return false;
            }
            
         });
         
      }
    }
    
    
});

Ext.reg('view.car.waybilldriver', T.view.car.WaybillDriver);