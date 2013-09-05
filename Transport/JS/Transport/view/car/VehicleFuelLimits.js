T.view.car.VehicleFuelLimits = Ext.extend(Kdn.grid.LocalEditorGrid, {
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {
        colModel: new T.colModel.FuelLimits(),
            store: Kdn.ModelFactory.getModel('VehicleFuelLimits').buildStore({
               autoLoad:false,
               autoSave:false
            }),
            loadMask:true
        });

        T.view.car.VehicleFuelLimits.superclass.constructor.call(this, cfg);
    }
});

Ext.reg('view.car.fuellimits', T.view.car.VehicleFuelLimits);