T.combo.AccGroupNew = Ext.extend(Kdn.form.ComboBox, {
    initComponent: function() {
        Ext.applyIf(this, {
            displayField: 'AccGroupName',
            valueField: 'AccGroupNewId',
            store: Kdn.ModelFactory.getStore('AccGroupNew')
        });
        T.combo.AccGroupNew.superclass.initComponent.call(this);
    }
});

Ext.reg('combo.accgroupnew', T.combo.AccGroupNew);