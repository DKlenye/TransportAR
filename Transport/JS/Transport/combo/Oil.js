T.combo.Oil = Ext.extend(Kdn.form.ComboBox, {
    initComponent: function () {
        Ext.applyIf(this, {
            displayField: 'FuelName',
            valueField: 'FuelId',
            store: Kdn.ModelFactory.getStore('Oil')
        });
        T.combo.Oil.superclass.initComponent.call(this);
    }
});

Ext.reg('combo.oil', T.combo.Oil);