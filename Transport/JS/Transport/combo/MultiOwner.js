T.combo.MultiOwner = Ext.extend(Ext.net.MultiCombo, {
    initComponent: function() {
        Ext.apply(this, {
            displayField: 'OwnerName',
            valueField: 'OwnerId',
            triggerAction: 'all',
            mode: 'local',
            store: Kdn.ModelFactory.getStore('TransportOwner')
        });
        T.combo.MultiOwner.superclass.initComponent.call(this);
    }
});

Ext.reg('combo.multiowner', T.combo.MultiOwner);