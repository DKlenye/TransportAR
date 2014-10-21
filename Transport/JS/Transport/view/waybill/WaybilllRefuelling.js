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
        
        var RefuellingPlaceEditor = Ext.create({
            xtype:'kdn.form.combobox',
            objectValue:false,
            valueField:'RefuellingPlaceId',
            displayField:'RefuellingPlaceName',
            store: Kdn.ModelFactory.getModel('RefuellingPlace').buildStore({
               autoDestroy: true,
               autoLoad:false,
               autoSave:false
            })
        });
        
        
        Kdn.ModelFactory.getStore('RefuellingPlace').each(function(rec){
            if (!rec.get('isAutomatic')){
               RefuellingPlaceEditor.store.add(rec.copy());
            }
        });
        
        
        var DateEditor = Ext.create({
            xtype:'kdn.editor.datefield'
        });
        
        cfg = cfg || {};
        Ext.apply(cfg, {
        
            FuelEditor:FuelEditor,
            DriverEditor:DriverEditor,
            DateEditor:DateEditor,            
            RefuellingPlaceEditor:RefuellingPlaceEditor,
            
            enableHdMenu:false,
            enableColumnResize:false,
            
            enableColumnMove:false,
            
            colModel: new Ext.grid.ColumnModel({
            defaults:{
                  sortable:false                  
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
                    renderer:function(v) {
                        if (!v) return null;
                        if (v.format("H:i") == "00:00") {
                             return v.format("d.m.Y");
                        }
                        return v.format("d.m.Y H:i");
                    },
                    dataIndex: 'RefuellingDate',
                    editor: {field:DateEditor},
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
                        if(rec) {
                            return rec.data.FuelName;
                        }
                        return o;
                    },
                    editor:{field:FuelEditor}
                },                
                {
                    header: 'Место выдачи',
                    dataIndex: 'RefuellingPlaceId',                    
                    width: 150,
                    editor:{field:RefuellingPlaceEditor},
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
               autoSave:true
            }),
            loadMask:true
        });

        T.view.waybill.WaybillRefuelling.superclass.constructor.call(this, cfg);
    },
    
    initComponent:function(){
    
      T.view.waybill.WaybillRefuelling.superclass.initComponent.call(this);

      this.on({
         scope:this,
         beforeEdit:this.onBeforeEdit
      });
      
      this.store.on({
        scope:this,
        write:this.onStoreChange
      });
    },
    
    applyDefaults:function(record){
      
      if(this.mainView.isDispClosed()) return null;
      
       var main = this.mainView,
            cfg = {},
            vehicle = main.vehicle,
            driverStore = main.drivers.store,
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
         
         //Если есть топливо у машины и есть Водитель в путёвке
         
         if(vehicle.Fuels.length==0){
            Ext.Msg.alert('Сообщение','Для транспортного средства не определены разрешённые виды топлива');
         }
         
         if(! Driver){
            Ext.Msg.alert('Сообщение','В путевом листе нет ни одного водителя!');
         }
         
         
         if (vehicle.Fuels.length > 0 && Driver) {
           
           Ext.apply(cfg, {
               WaybillId:main.waybillId,
               FuelId: vehicle.Fuels[0],
               RefuellingDate: main.waybillproperty.getSource()['DepartureDate'] || new Date().clearTime(),
               Driver: Driver,
               RefuellingPlaceId:T.config.DefaultRefuellingPlaceId
           });
           
            Ext.apply(record.data,cfg);
            return record;
         }
         
         return null;
         
    },
        
    setData:function(data){
      var refuelling = data["VehicleRefuelling"];
      this.store.loadData({ data: refuelling }, false);  
    },
   
    checkIsAutomatic:function(rec){
      var store = Kdn.ModelFactory.getStore('RefuellingPlace');
      if(rec){
         var r = store.getById(rec.get('RefuellingPlaceId'));
         if(r && r.get('isAutomatic')) return true;
      }
      return false;      
    },
    beforeRemove:function(selections){
      if(this.mainView.isDispClosed()) return null;
      
      var sel = [];
      
      Ext.iterate(selections,function(r){
         if(!this.checkIsAutomatic(r)){
          sel.push(r);  
         }
      },this);
            
      return sel;         
    },
    onBeforeEdit:function(e){
    //Перед началом редактирования необходимо проверить закрыта ли путёвка диспетчером, 
    //не является ли запись выдачей с АЗС, 
      if(this.checkIsAutomatic(e.record)) return false;
      
      if(this.mainView.isAccClosed()){
         return false;
      }
      
      if(this.mainView.isDispClosed()){
         var allowModifyFields = ['RefuellingPlaceId','Driver','CardNumber'];
         if(allowModifyFields.indexOf(e.field)==-1) return false;
      }
    },
            
    onStoreChange:function(){
     var m = this.mainView;
      m.refreshRefuelling();
      m.refreshFact();
      m.refreshDiff();
    }
        
});

Ext.reg('view.waybill.waybillrefuelling', T.view.waybill.WaybillRefuelling);















