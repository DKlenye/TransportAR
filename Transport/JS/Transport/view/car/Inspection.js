T.view.car.Inspection = Ext.extend(Kdn.grid.LocalEditorGrid, {
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {
            colModel: new T.colModel.Inspection(),
            store:Kdn.ModelFactory.getModel('Inspection').buildStore({
               autoLoad:false,
               autoSave:false
            }),
            loadMask:true
        });

        T.view.car.Inspection.superclass.constructor.call(this, cfg);
    }
});

Ext.reg('view.car.inspection', T.view.car.Inspection);