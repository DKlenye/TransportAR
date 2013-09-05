T.view.car.VehicleIncrease = Ext.extend(Kdn.grid.LocalEditorGrid, {
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {
            colModel: new Ext.grid.ColumnModel({
               columns:[      
                    {
                        dataIndex: 'IncreaseId',
                        header: 'Надбавка',
                        width: 300,
                        editor:{
                           xtype:'combo.increase',
                           objectValue:false                           
                        },
                        renderer:function(e){
                           if(!e) return e;
                           var store = Kdn.ModelFactory.getStore('Increase'),
                               rec = store.getById(e);
                           if(rec){
                              return rec.get('IncreaseName');
                           }
                           return e;
                        }
                    },
                    {
                        dataIndex: 'Prcn',
                        header: 'Надбавка %',
                        width: 150,
                        editor: { xtype: 'kdn.editor.numberfield' }
                    }
               ]
            }),
            store:Kdn.ModelFactory.getModel('VehicleIncrease').buildStore({
               autoLoad:false,
               autoSave:false
            }),
            loadMask:true
        });

        T.view.car.VehicleIncrease.superclass.constructor.call(this, cfg);
    },
    
    initComponent:function(){
      T.view.car.VehicleIncrease.superclass.initComponent.call(this);
      
      this.store.on({
         scope:this,
         update:this.onStoreUpdate
      });
      
      this.on({
         scope:this,
         beforeedit:this.onBeforeEdit
      });
      
    },
    
    onStoreUpdate:function(store,record,operation){   
      
      store.data.each(function(e){
         if (e!=record && e.get('IncreaseId') && record.get('IncreaseId') && e.get('IncreaseId')==record.get('IncreaseId')){
            store.remove(record);
            return false;
         }
      });
               
    },
    
    onBeforeEdit:function(e){
      if (!e.record.phantom) return false;
    }
    
    
});

Ext.reg('view.car.vehicleincrease', T.view.car.VehicleIncrease);