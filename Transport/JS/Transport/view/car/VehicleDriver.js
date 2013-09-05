T.view.car.VehicleDriver = Ext.extend(Kdn.grid.LocalEditorGrid, {
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {
            colModel: new Ext.grid.ColumnModel({
               columns:[
                  {
                     header:'Водитель',
                     dataIndex:'Driver',
                     width:400,
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
            store:Kdn.ModelFactory.getModel('VehicleDriver').buildStore({
               autoLoad:false,
               autoSave:false,
               listeners:{
                  scope:this,
                  load:this.onStoreLoad,
                  update:this.onStoreUpdate,
                  write:this.onStoreWrite,
                  remove:this.onStoreRemove           
               }
            }),
            loadMask:true,
            listeners:{
               scope:this,
               beforeedit:this.onBeforeEdit
            }
        });

        T.view.car.VehicleDriver.superclass.constructor.call(this, cfg);
    },
    
    onStoreLoad:function(){
      this.refreshResponsible();
    },
    onStoreWrite:function(){
      this.refreshResponsible();
    },
    onStoreRemove:function(){
      this.setResponsible();
    },
    
    refreshResponsible:function(){
   
      var e = this.CarEditor;      
      if(e){
         var rec = e.record,
             store = this.store,
             resp = 'isResponsible', driver = 'Driver',id='DriverId';
      
         store.data.each(function(r){
            if (r.get(driver) &&  rec.get('ResponsibleDriver') && r.get(driver)[id]==rec.get('ResponsibleDriver')[id]){
               r.beginEdit();
               r.set(resp,true);
               r.endEdit();
               r.commit(true);
            }            
         });                  
         store.clearModified();
         this.view.refresh();
      }  
    },
    
    setResponsible:function(driver){
      var e = this.CarEditor;      
           
      if(e){      
         var idx = this.store.find('isResponsible',true);      
         if(idx==-1){
            e.editors[0].setProperty('ResponsibleDriver',null);
         }
         else{
            e.editors[0].setProperty('ResponsibleDriver',this.store.getAt(idx).get('Driver'));
         }               
      }
      
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
         
      var exitFlag = false;
      store.data.each(function(e){
         if (e!=record && e.get(driver) && record.get(driver) && e.get(driver)[id]==record.get(driver)[id]){
            store.remove(record);
            exitFlag = true;
            return false;
         }
      });
      
      
      this.setResponsible();
      
      if (exitFlag) return;
               
    },
    
    onBeforeEdit:function(e){
      
      if (e.field == 'Driver' && !e.record.phantom) return false;
      
    }
    
    
    
});

Ext.reg('view.car.vehicledriver', T.view.car.VehicleDriver);