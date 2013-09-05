T.combo.Fuel = Ext.extend(Kdn.form.ComboBox, {
    initComponent: function() {
        Ext.applyIf(this, {
            valueField: 'FuelId',
            displayField: 'FuelName',            
            store: Kdn.ModelFactory.getStore('Fuel')
        });
        T.combo.Fuel.superclass.initComponent.call(this);
    }
});

Ext.reg('combo.fuel', T.combo.Fuel);