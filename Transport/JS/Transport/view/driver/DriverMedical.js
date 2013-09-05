T.view.driver.DriverMedical = Ext.extend(Kdn.grid.LocalEditorGrid, {
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {
            colModel: new T.colModel.DriverMedical(),
            store:Kdn.ModelFactory.getModel('DriverMedical').buildStore({
               autoLoad:false,
               autoSave:false
            }),
            loadMask:true
        });

        T.view.driver.DriverMedical.superclass.constructor.call(this, cfg);
    }
});

Ext.reg('view.driver.drivermedical', T.view.driver.DriverMedical);