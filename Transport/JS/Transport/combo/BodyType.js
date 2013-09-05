T.combo.BodyType = Ext.extend(Kdn.form.ComboBox, {
    initComponent: function() {
        Ext.applyIf(this, {
            displayField: 'BodyTypeName',
            valueField: 'BodyTypeId',
            store: Kdn.ModelFactory.getStore('BodyType')
        });
        T.combo.BodyType.superclass.initComponent.call(this);
    }
});

Ext.reg('combo.bodytype', T.combo.BodyType);