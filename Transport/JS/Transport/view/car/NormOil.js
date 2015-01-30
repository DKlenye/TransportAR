T.view.car.NormOil= Ext.extend(Kdn.grid.LocalEditorGrid, {
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {
            colModel: new T.colModel.NormOil(),
            store:Kdn.ModelFactory.getModel('OilNormVehicle').buildStore({
               autoLoad:false,
               autoSave:false
            }),
            loadMask:true
        });

        T.view.car.Insurance.superclass.constructor.call(this, cfg);
    }
});

Ext.reg('view.car.normoil', T.view.car.NormOil);