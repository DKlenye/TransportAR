
Kdn.data.ModelFactory = function() {

    var mc = Ext.util.MixedCollection;

    Ext.apply(this, {
        modelMgr: new mc(),
        client:new fm.websync.client("Handlers/Websync.ashx"),
        channel: "/data"
    });
    
    this.client.connect();
    this.client.subscribe({
        channel: this.channel,
        onReceive: this.onReceiveData.createDelegate(this)
});

};

Ext.extend(Kdn.data.ModelFactory, Ext.util.Observable, {
   
   onReceiveData:function(e) {
       var data = e.getData();
       var model = this.getModel(data.model);
       var store = model.store;
       if (store) {
           var record = store.getById(data.id); //должно быть так
           
           
           //------------ ѕосле вставки записи индекс в store не обновл€етс€ –ј«ќЅ–ј“№—я!!!
           if (!record) {
               var idx = store.findBy(function(r) { return r.id == data.id; });
               record = store.getAt(idx);
               if (record) {
                   store.reMap(record);
               }
           }
           //--------------------------------------------------------------------------
           
           
           var idx = store.findBy(function(r) { return r.id == data.id; });
           var record = store.getAt(idx);
           
           

           switch (data.action) {
           case 'update':
           {
               if (record) {
                   store.onUpdateRecords(true, record, data.record);
               }
               break;
           }
           case 'destroy':
           {
               if (record) {
                   record.phantom = true;
                   store.remove(record);
               }
               break;
           }
           case 'create':
           {
               if (!record) {
                   record = new store.recordType(data.record, data.id);
                   record.phantom = false;
                   record.dirty = false;
                   store.add(record);
               }
               break;
           }

           }
       }
   },
   
   publishData:function(data) {
       this.client.publish({
           channel: this.channel,
           returnData: false,
           data: data
       });
   },
    
   regModel:function(model){
		this.modelMgr.add(model.name,model);
	},

	getStore: function(modelName, cfg) {
	
	    var model = this.getModel(modelName),
	        store = model.store;
	    if (!store) {
	        store = model.buildStore(cfg);
	        model.store = store;

	        store.on({
	            write: this.onStoreWrite,
	            scope: this
	        });
	    }
        return store;
    },

    onStoreWrite: function(store, action, result, res, rec) {
    
        var data = {
            model: store.model.name,
            action: action,
            record:rec.data,
            id:rec.id
        };

        this.publishData(data);
    },

    getModel: function(modelName) {
        return this.modelMgr.get(modelName);
    },

    createRecord: function(modelName) {
        var type = this.getModel(modelName).recordType;
        return new type().applyDefaults();
    },
    
    refreshAll:function(){
      this.modelMgr.each(function(m){
         if(m.store) m.store.reload();
      });
    },
    
    eachModels:function(fn,scope){
      this.modelMgr.each(fn,(scope||this));
    },
    
    requireModels:function(models,callback){
     
      var $ = this,
          needLoad = [];
          provider = Ext.Direct.providers.directprovider;
      
      models = Ext.isString(models)?models.split(','):models||[];
            
      Ext.iterate(models,function(m){
         var M = $.getModel(m);
         if(M && !M.store){
            needLoad.push(M);
         }
      });
      
      if(needLoad.length>0){
      
         var mc = Ext.util.MixedCollection;
         
         var requires = new mc();
         this.requireTids = new mc();
         this.requireCallback = callback;
         
         provider.on({
            scope:this,
            call:this.onRequireCall,
            data:this.onRequireData
         });         
         
         Ext.iterate(needLoad,function(e){                        
            requires.add(e.typeName,e);
            e.getStore();
         });
         
         this.requires  = requires
                  
         
      }
      else {
         callback();
      }      
            
    },
    
    onRequireCall:function(provider,tx){      
      var name = tx.args[0].typeName;
      var model = this.requires.get(name);      
      this.requireTids.add(tx.tid,model);
    },
    
    onRequireData:function(provider,rpc){
      var model = this.requireTids.get(rpc.tid);
      
      if(model){
           this.requires.remove(model);
      }
      
      if (this.requires.getCount()==0){               
         this.requireCallback();
         this.requires= null;
         this.requireTids = null;
         this.requireCallback = null;
         
         provider.un('call',this.onRequireCall,this);
         provider.un('data',this.onRequireData,this);         
      } 
    }
    
    
    

});

Kdn.data.ModelFactory = new Kdn.data.ModelFactory();
Kdn.ModelFactory = Kdn.data.ModelFactory;
