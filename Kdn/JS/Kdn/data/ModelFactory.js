
Kdn.data.ModelFactory = function() {

    var mc = Ext.util.MixedCollection;

    Ext.apply(this, {
        modelMgr: new mc()
    });

};

Ext.extend(Kdn.data.ModelFactory, Ext.util.Observable, {

   regModel:function(model){
		this.modelMgr.add(model.name,model);
	},

    getStore: function(modelName,cfg) {
        return this.getModel(modelName).getStore(cfg);
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
