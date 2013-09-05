T.combo.MultiFuel = Ext.extend(Ext.net.MultiCombo, {
    initComponent: function() {
        
        Ext.apply(this, {
            displayField: 'FuelName',
            valueField: 'FuelId',
            triggerAction: 'all',
            mode: 'local',
            store: Kdn.ModelFactory.getStore('Petrol')
        });
        T.combo.MultiFuel.superclass.initComponent.call(this);
    }
});

Ext.reg('combo.multifuel', T.combo.MultiFuel);