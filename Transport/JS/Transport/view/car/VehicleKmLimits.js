T.view.car.VehicleKmLimits = Ext.extend(Kdn.grid.LocalEditorGrid, {
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {
        colModel: new T.colModel.KmLimits(),
            store: Kdn.ModelFactory.getModel('VehicleKmLimits').buildStore({
               autoLoad:false,
               autoSave:false
            }),
            loadMask:true
        });

        T.view.car.VehicleKmLimits.superclass.constructor.call(this, cfg);
    }
});

Ext.reg('view.car.kmlimits', T.view.car.VehicleKmLimits);