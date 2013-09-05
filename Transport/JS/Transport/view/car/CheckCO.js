T.view.car.CheckCO = Ext.extend(Kdn.grid.LocalEditorGrid, {
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {
            colModel: new T.colModel.CheckCO(),
            store:Kdn.ModelFactory.getModel('CheckCO').buildStore({
               autoLoad:false,
               autoSave:false
            }),
            loadMask:true
        });

        T.view.car.CheckCO.superclass.constructor.call(this, cfg);
    }
});

Ext.reg('view.car.checkco', T.view.car.CheckCO);