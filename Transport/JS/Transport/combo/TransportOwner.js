T.combo.TransportOwner = Ext.extend(Kdn.form.ComboBox, {
    initComponent: function() {
        Ext.applyIf(this, {
            displayField: 'OwnerName',
            valueField: 'OwnerId',
            store: Kdn.ModelFactory.getStore('TransportOwner')
        });
        T.combo.TransportOwner.superclass.initComponent.call(this);
    }
});

Ext.reg('combo.transportowner', T.combo.TransportOwner);