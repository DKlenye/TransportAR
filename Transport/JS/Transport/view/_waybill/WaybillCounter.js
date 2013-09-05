T.view.waybill.WaybillCounter = Ext.extend(Kdn.editor.LocalGrid, {
    startEditColumn:1,    
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {
            tbar:null,
            colModel: new Ext.grid.ColumnModel({
               columns:[
                  {
                     dataIndex:'CounterId',
                     header:'Счётчик',
                     renderer: function(o) {
                        if (!o) return null;
                        var store = Kdn.ModelFactory.getStore('WorkCounter'),
                           record = store.getById(o);                              
                        if (record) return record.data.CounterName;                              
                        return o;
                     },
                     width:130
                  },
                  {
                     dataIndex:'Departure',
                     header:'Выезд',
                     editor:{xtype:'kdn.editor.decimalfield',allowNegative:false},
                     width:80,
                     align:'center',
                     renderer: function(v, meta) {
                        meta.css = 'departure';
                        return v;
                    }                   
                  },
                  {
                     dataIndex:'Return',
                     header:'Возвр.',
                     //editor:{xtype:'kdn.editor.decimalfield',allowNegative:false},
                     width:80,
                     align:'center',
                     renderer: function(v, meta) {
                        meta.css = 'return';
                        return v;
                    }   
                  },
                  {
                     dataIndex:'isBroken',
                     header:'Сломан',
                     xtype:'checkcolumn',
                     width:80,
                     align:'center',
                     checkHandler: (function(rec) { this.mainView.refreshCounters()}).createDelegate(this),
                     beforeCheck: (function() { if (this.mainView.isDispClosed()) return false;}).createDelegate(this)
                  }
               ]
            }),
            store:Kdn.ModelFactory.getModel('WaybillCounter').buildStore({
               autoLoad:false,
               autoSave:false
            }),
            loadMask:true
        });

        T.view.waybill.WaybillCounter.superclass.constructor.call(this, cfg);
    },
    
    initComponent:function(){
      this.on({
         scope:this,
         afteredit:this.onAfterEdit
      });
      T.view.waybill.WaybillCounter.superclass.initComponent.call(this);
      
    },
    
    add:Ext.emptyFn,
    remove:Ext.emptyFn,
    
   
    setData:function(data){
                
      var counters = data["WaybillCounter"];
      this.store.loadData({ data: counters }, false);
      
    },
    
    onAfterEdit:function(e){
    
      var $ = this,
          main = $.mainView;
      
      switch(e.field){
         case 'Departure':{
            main.refreshCounters();                     
            break;
         }
         case 'isBroken':{            
            main.refreshCounters();                               
            break;
         }         
      }     
      
    }   
    
        
});

Ext.reg('view.waybill.waybillcounter', T.view.waybill.WaybillCounter);
