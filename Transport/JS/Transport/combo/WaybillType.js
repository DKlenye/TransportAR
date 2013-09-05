T.combo.WaybillType = Ext.extend(Kdn.form.ComboBox, {
    initComponent: function() {
        Ext.applyIf(this, {
            displayField: 'WaybillTypeName',
            valueField: 'WaybillTypeId',
            store: Kdn.ModelFactory.getStore('WaybillType')
        });
        T.combo.WaybillType.superclass.initComponent.call(this);
    }
});

Ext.reg('combo.waybilltype', T.combo.WaybillType);