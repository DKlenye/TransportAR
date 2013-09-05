T.view.waybill.WaybillDriver = Ext.extend(Kdn.editor.LocalGrid, {
    constructor: function(cfg) {
        cfg = cfg || {};
        
        cfg.vehicleDriversStore = new Ext.data.JsonStore({
            fields:['Driver'],
            autoDestroy:true        
        });
        
        cfg.vehicleDriversGrid = Ext.create({
               flex:1,
               xtype:'grid',
               viewConfig:{forceFit:true},
               stripeRows:true,
               columnLines:true,
               columns:[
                  {header:'Водители',dataIndex:'Driver',renderer:T.combo.Driver.prototype.renderTpl},
               ],
               store:cfg.vehicleDriversStore 
            }
        );
        
        
        cfg.VehicleDriversWindow = new Ext.Window({
        
            modal:true,
            width:350,
            height:250,
            title:'Выбор закреплённых водителей',         
            layout:'vbox',
            layoutConfig: {
                align : 'stretch',
                pack  : 'start',
                defaultMargins:{
                  top:2,
                  bottom:2,
                  left:2,
                  right:2
                }
            },
            items:[
               cfg.vehicleDriversGrid
            ],
            buttons:[
               '->',
               '-',
               {
                  xtype:'button',
                  text:'Перенести в пут.лист',
                  iconCls:'',
                  scope:this,
                  handler:function(){
                       var sel = this.vehicleDriversGrid.getSelectionModel().getSelections();                                             
                       if(sel)
                       {
                          var $ = this; 
                           var exists=function(driver){
                              var existFlag = false;
                              $.store.each(function(rec){
                                 if (rec.get('Driver').DriverId==driver.DriverId){
                                    existFlag = true;
                                    return false;
                                 }
                              });
                              return existFlag;
                           }
                                                  
                           Ext.iterate(sel,function(e){                           
                              if(!exists(e.get('Driver'))){
                                  var rec = new this.store.recordType({
                                    WaybillId:this.mainView.waybillId,
                                    Driver:Kdn.clone(e.get('Driver')),
                                    isResponsible:false
                                 });
                                 this.store.add(rec);                                 
                              }
                           },this);
                       }
                       
                      this.VehicleDriversWindow.hide();
                  }
               },
               '-'
            ]        
        });
                
        
        Ext.apply(cfg, {
            
            enableHdMenu:false,
            enableColumnMove:false,
            enableColumnResize:false,
                    
            colModel: new Ext.grid.ColumnModel({
               defaults:{
                  sortable:false
               },
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
                     width:100,
                     checkHandler: (function(rec) {
                     
                       /*                       
                        this.store.each(function(r){
                              r.data['isResponsible']= (r==rec);
                        });                         
                        this.view.refresh();
                        */
                        
                        this.mainView.waybill.ResponsibleDriver = rec.get('Driver');
                        this.mainView.setResponseDriver();
                        this.mainView.saveWaybillProperty();
                         
                        return false;
                     }).createDelegate(this),
                     beforeCheck: (function() { 
                        if (this.mainView.isDispClosed()) return false;                        
                     }).createDelegate(this)
                  }
               ]
            }),
            store:Kdn.ModelFactory.getModel('WaybillDriver').buildStore({
               autoLoad:false,
               autoSave:true
            }),
            loadMask:true,
            tbar:[
               {
               xtype: 'button.add',
               handler: this.add,
               scope: this
              }, '-',
              {
                  xtype: 'button.remove', 
                  handler: this.remove,
                  scope: this
              }, '-', 
              '->',
              {
                  xtype:'button',
                  scope:this,
                  text:'Закреплённые',
                  iconCls:'icon-driver',
                  handler:function(btn){                     
                    
                     var drivers = this.mainView.vehicle.Drivers,
	                      driverStore = this.vehicleDriversStore
               	       
	                   driverStore.removeAll();
                      driverStore.modified = [];
                      driverStore.removed  = [];
                      
                      Ext.iterate(drivers,function(d){                                 
                        var rec = new driverStore.recordType({
                           Driver:d.Driver
                        }); 
                        driverStore.add(rec);                        
                      });
                                                  
                     this.VehicleDriversWindow.show();
                     this.VehicleDriversWindow.anchorTo(btn.getEl(),'tr-bl');                    
                     
                  }
              }
            ]
        });
        
        T.view.waybill.WaybillDriver.superclass.constructor.call(this, cfg);
    },
    
    initComponent:function(){
      T.view.waybill.WaybillDriver.superclass.initComponent.call(this);
      
      this.store.on({
         scope:this,
         beforewrite:this.onStoreUpdate
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
         beforeedit:this.onBeforeEdit
      });
      
    },
        
    
    onStoreUpdate:function(store, action, record, options, arg){
    
      if(action=='destroy') return;
        
      var resp = 'isResponsible', driver = 'Driver',id='DriverId';     
                  
      var exitFlag = false;            
      store.data.each(function(e){
         if (e!=record && e.get(driver) && record.get(driver) && e.get(driver)[id]==record.get(driver)[id]){
            store.remove(record);
            exitFlag=true;
            return false;
         }
      });
      
      if (exitFlag) return false;
               
    },
    
    
    setData:function(data){
      var drivers = data["WaybillDriver"];
      this.store.loadData({ data: drivers }, false);
      
    },
    
     applyDefaults:function(record){
      
      if(this.mainView.isDispClosed()) return null;    
           var cfg = {}
           Ext.apply(cfg, {
               WaybillId:this.mainView.waybillId
           });
           
            Ext.apply(record.data,cfg);
            return record;
              
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
   
   remove: function(btn, ev)
    {
        var sel = this.getSelectionModel().getSelected();
        var isClosed =  this.mainView.isDispClosed();
                
        if (!sel || isClosed)
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
            if (exitFlag) {
               Ext.Msg.alert('Сообщение','Водитель не может быть удалён, так как он получал топливо!');
               return false;
            }
          }
        }
        this.store.remove(sel);
    },
        
    onBeforeEdit:function(o){
      return o.record.get('Driver')==null;
    },
    
    
    onStoreWrite:function(){
      var main = this.mainView,
          ResponsibleDriver = main.waybill.ResponsibleDriver;
      
      if(ResponsibleDriver){       
         this.store.each(function(r){
            var d = r.get('Driver');
            if(d && d.DriverId && d.DriverId == ResponsibleDriver.DriverId){
               r.data['isResponsible']=true;
               return false;
            }
            
         });
         
         this.view.refresh();
         
      }
    }
    
    
});

Ext.reg('view.waybill.waybilldriver', T.view.waybill.WaybillDriver);