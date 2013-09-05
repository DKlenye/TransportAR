T.combo.WaybillPackage = Ext.extend(Kdn.form.ComboBox, {
    initComponent: function() {
        Ext.applyIf(this, {
            displayField: 'display',
            valueField: 'PackageId',
            store: Kdn.ModelFactory.getStore('v_WaybillPackages')
        });
        T.combo.BodyType.superclass.initComponent.call(this);
    }
}); 

Ext.reg('combo.waybillpackage', T.combo.WaybillPackage);