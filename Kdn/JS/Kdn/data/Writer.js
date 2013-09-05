Kdn.data.Writer = Ext.extend(Ext.data.JsonWriter, {
    constructor: function(cfg) {

        cfg = cfg || {};

        Ext.applyIf(cfg, {
            encode: false,
            writeAllFields: true
        });

        Kdn.data.Writer.superclass.constructor.call(this, cfg);
    },
    
    destroyRecord: function(rec) {
        return this.toHash(rec);
    }

});