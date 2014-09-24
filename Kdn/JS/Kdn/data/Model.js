Kdn.data.Model = function(cfg) {
    cfg = cfg || {};
    Ext.apply(this, cfg);
    Ext.apply(this, {
        recordType: Ext.data.Record.create(cfg.fields)
    });
	Kdn.data.ModelFactory.regModel(this);
};

Ext.override(Kdn.data.Model, {

    buildStore: function(cfg) {
            
         var modelCfg = Kdn.data.ModelCfg[this.name]||{};         
         cfg = Ext.apply(modelCfg,cfg); 
        return new Kdn.data.DirectStore(this,cfg);
    },
    
    getStore: function(cfg) {
        return Kdn.ModelFactory.getStore(this.name, cfg);
	}

});

Ext.reg('kdn.data.model',Kdn.data.Model);