T.view.waybill.WaybillCounter = Ext.extend(Kdn.editor.LocalGrid, {
    startEditColumn:1,    
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {
            tbar:null,
            enableHdMenu:false,
            enableColumnMove:false,
            enableColumnResize:false,
            
            colModel: new Ext.grid.ColumnModel({
            defaults:{
                  sortable:false
               },
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
                     editor:{xtype:'kdn.editor.decimalfield',allowNegative:false},
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
                     checkHandler: (function(rec) { 
                        this.mainView.refreshCounters()
                     }).createDelegate(this),
                     beforeCheck: (function(){
                        if (this.mainView.isDispClosed())return false;
                     }).createDelegate(this)
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
         afteredit:this.onAfterEdit,
         beforeedit:this.onBeforeEdit
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
         case 'Return':{            
            var task = main.tasks.store.getAt(0);
            var amount = Kdn.fixDecimal((e.record.get('Return')||0)-(e.record.get('Departure')||0));
            task.set('WorkAmount',amount>0?amount:0);
            main.tasks.calculateNormConsumption(task);                              
            break;
         }       
      }     
      
    },
    
    onBeforeEdit:function(e){
         var $ = this,
          main = $.mainView,
          isClosed = main.isDispClosed();
         
        if (isClosed)return false;
        
        if(e.field=='Return')
        {
          //Проверить количество заданий
          var cnt = main.tasks.store.getCount();          
          if(cnt!=1) return false;
        }
        
               
    },
    
    onSave:function(){
      this.mainView.onSave();
    } 
    
        
});

Ext.reg('view.waybill.waybillcounter', T.view.waybill.WaybillCounter);
