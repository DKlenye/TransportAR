T.view.driver.DriverLicence = Ext.extend(Kdn.grid.LocalEditorGrid, {
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {
            colModel: new T.colModel.DriverLicence(),
            store:Kdn.ModelFactory.getModel('DriverLicence').buildStore({
               autoLoad:false,
               autoSave:false
            }),
            loadMask:true
        });

        T.view.driver.DriverLicence.superclass.constructor.call(this, cfg);
    }
});

Ext.reg('view.driver.driverlicence', T.view.driver.DriverLicence);