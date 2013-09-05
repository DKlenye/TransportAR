T.combo.MultiIncrease = Ext.extend(Ext.net.MultiCombo, {
    initComponent: function() {
        
        Ext.apply(this, {
            displayField: 'IncreaseName',
            valueField: 'IncreaseId',
            triggerAction: 'all',
            mode: 'local',
            store: Kdn.ModelFactory.getStore('Increase')
        });
        T.combo.MultiIncrease.superclass.initComponent.call(this);
    }
});

Ext.reg('combo.multiincrease', T.combo.MultiIncrease);