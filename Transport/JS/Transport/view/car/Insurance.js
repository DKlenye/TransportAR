T.view.car.Insurance = Ext.extend(Kdn.grid.LocalEditorGrid, {
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {
            colModel: new T.colModel.Insurance(),
            store:Kdn.ModelFactory.getModel('Insurance').buildStore({
               autoLoad:false,
               autoSave:false
            }),
            loadMask:true
        });

        T.view.car.Insurance.superclass.constructor.call(this, cfg);
    }
});

Ext.reg('view.car.insurance', T.view.car.Insurance);