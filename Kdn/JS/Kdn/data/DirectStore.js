Kdn.data.DirectStore = Ext.extend(Ext.data.Store, {
    constructor: function(model, cfg) {

        cfg = cfg || {};

        Ext.applyIf(cfg, {
            batchTransactions: false,
            reader: new Kdn.data.Reader({ idProperty: model.idProperty }, model.recordType),
            proxy: new Kdn.data.DirectProxy({api:cfg.api}),
            writer: new Kdn.data.Writer()
        });
        
        Ext.applyIf(cfg,{ model: model, autoLoad: true });

        Kdn.data.DirectStore.superclass.constructor.call(this, cfg);
    },
    remove: function(record) {
        if (Ext.isArray(record)) {
            Ext.each(record, function(r) {
                this.remove(r);
            }, this);
            return;
        }
        var index = this.data.indexOf(record);
        if (index > -1) {
            record.join(null);
            this.data.removeAt(index);
        }
        if (this.pruneModifiedRecords) {
            this.modified.remove(record);
        }
        if (this.snapshot) {
            this.snapshot.remove(record);
        }
        if (index > -1) {
            this.fireEvent('remove', this, record, index);
        }
    },
    destroyRecord: function(store, record, index) {
        if (this.modified.indexOf(record) != -1) {  // <-- handled already if @cfg pruneModifiedRecords == true
            this.modified.remove(record);
        }
        if (!record.phantom) {
            this.removed.push(record);

            record.lastIndex = index;

            if (this.autoSave === true) {
                this.save();
            }
        }
    }
    
});