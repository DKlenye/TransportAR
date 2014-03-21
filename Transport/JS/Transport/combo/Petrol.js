T.combo.Petrol = Ext.extend(Kdn.form.ComboBox, {
    initComponent: function() {
        Ext.applyIf(this, {
            displayField: 'FuelName',
            valueField: 'FuelId',
            store: Kdn.ModelFactory.getStore('Petrol')
        });
        T.combo.Petrol.superclass.initComponent.call(this);
    }
});

Ext.reg('combo.petrol', T.combo.Petrol);