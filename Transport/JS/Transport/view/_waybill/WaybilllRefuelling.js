T.view.waybill.WaybillRefuelling = Ext.extend(Kdn.editor.LocalGrid, {
    startEditColumn:1,
    constructor: function(cfg) {
    
         var FuelEditor = Ext.create({
            xtype:'combo.fuel',                     
            store: Kdn.ModelFactory.getModel('Fuel').buildStore({
               autoDestroy: true,
               autoLoad:false,
               autoSave:false
            }),
            objectValue:false
        });
        
        var DriverEditor = Ext.create({
            xtype:'kdn.form.combobox',
            valueField:'DriverId',
            displayField:'display',
            store: Kdn.ModelFactory.getModel('Driver').buildStore({
               autoDestroy: true,
               autoLoad:false,
               autoSave:false
            })
        });
        
        cfg = cfg || {};
        Ext.apply(cfg, {
        
            FuelEditor:FuelEditor,
            DriverEditor:DriverEditor,
            
            colModel: new Ext.grid.ColumnModel({
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
                    editor: {xtype: 'kdn.editor.datefield'},
                    width: 130,
                    align: 'center'
                },
                {
                    header: 'Топливо',
                    dataIndex: 'FuelId',
                    width: 100,
                    renderer:function(o){
                        if(!o) return o;
                        var store = Kdn.ModelFactory.getStore('Fuel'),
                           rec = store.getById(o);
                        if(rec){
                           return rec.data.FuelName
                        }
                        return o;
                    },
                    editor:{field:FuelEditor}
                },                
                {
                    header: 'Место выдачи',
                    dataIndex: 'RefuellingPlaceId',                    
                    width: 150,
                    editor:{xtype:'combo.refuellingplace',objectValue:false},
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
                    renderer:T.combo.Driver.prototype.renderTpl,
                    editor:{field:DriverEditor}
                },
                {
                    header: '№ карты',
                    dataIndex: 'CardNumber',
                    editor: {xtype: 'kdn.editor.textfield',allowBlank:true},
                    width: 90                  
                }
                ]
            }),
            store:Kdn.ModelFactory.getModel('VehicleRefuelling').buildStore({
               autoLoad:false,
               autoSave:false
            }),
            loadMask:true
        });

        T.view.waybill.WaybillRefuelling.superclass.constructor.call(this, cfg);
    },
    
    initComponent:function(){
      T.view.waybill.WaybillRefuelling.superclass.initComponent.call(this);
      this.mon(this.getSelectionModel(), {
            selectionchange: this.onSelectionChange,
            scope: this
        });
      this.on({
         scope:this,
         beforeEdit:this.onBeforeEdit
      });
      
      this.store.on({
        scope:this,
        add:this.onStoreChange,
        remove:this.onStoreChange,
        update:this.onStoreChange
      });
    },
    
    /*applyDefaults:function(record){
      
       var main = this.mainView,
            cfg = {},
            vehicle = main.vehicle,
            driverStore = main.driver.store,
            Driver=null;
        
        driverStore.each(function(rec) {
              if (rec.data.isResponsible) {
                  Driver = rec.data.Driver
              }
         });
         
         if(!Driver){
            driverStore.each(function(rec) {
                 if (rec.data.Driver) {
                     Driver = rec.data.Driver;
                     return false;
                 }
            });
         }
         
         if (vehicle.Fuels.length > 0 && Driver) {
           
           Ext.apply(cfg, {
               FuelId: vehicle.Fuels[0],
               RefuellingDate: main.waybillproperty.getSource()['DepartureDate'] || new Date().clearTime(),
               Driver: Driver,
               RefuellingPlaceId:T.config.DefaultRefuellingPlaceId
           });
           
            Ext.apply(record.data,cfg);
            return record;
         }
         
         return null;
         
    },*/
        
    setData:function(data){
      var refuelling = data["VehicleRefuelling"];
      this.store.loadData({ data: refuelling }, false);  
    },
    
    onSelectionChange: function()
    {
       /* var s = this.getSelectionModel().getSelected(),
            removeBtn = Kdn.getByCls('removebtn',this.getEl());
        if(removeBtn){
            removeBtn.setDisabled(!s || this.checkIsAutomatic(s))
        }*/
    },
    
    checkIsAutomatic:function(rec){
      var store = Kdn.ModelFactory.getStore('RefuellingPlace');
      if(rec){
         var r = store.getById(rec.get('RefuellingPlaceId'));
         if(r && r.get('isAutomatic')) return true;
      }
      return false;      
    },
    
    onBeforeEdit:function(e){
    //Перед началом редактирования необходимо проверить закрыта ли путёвка диспетчером, 
    //не является ли запись выдачей с АЗС, 
      /*if(this.checkIsAutomatic(e.record)) return false;
        
      if(this.mainView.isDispClosed()){
         var allowModifyFields = ['RefuellingPlaceId','RefuellingDate','DriverId'];
         if(allowModifyFields.indexOf(e.field)==-1) return false;
      }*/
    },
            
    onStoreChange:function(){
      /*var m = this.mainView;
      m.refreshRefuelling();
      m.refreshFact();
      m.refreshDiff();*/
    }
        
});

Ext.reg('view.waybill.waybillrefuelling', T.view.waybill.WaybillRefuelling);















