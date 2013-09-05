T.combo.WaybillPackageType = Ext.extend(Kdn.form.ComboBox, {
    initComponent: function() {
        Ext.applyIf(this, {
            displayField: 'PackageTypeName',
            valueField: 'PackageTypeId',
            store: Kdn.ModelFactory.getStore('WaybillPackageType')
        });
        T.combo.WaybillPackageType.superclass.initComponent.call(this);
    }
});

Ext.reg('combo.waybillpackagetype', T.combo.WaybillPackageType);