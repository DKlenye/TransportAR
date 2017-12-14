T.combo.ServicePurpose = Ext.extend(Kdn.form.ComboBox, {
    initComponent: function() {
        Ext.applyIf(this, {
            displayField: 'PurposeName',
            valueField: 'PurposeId',
            store: Kdn.ModelFactory.getStore('v_ServicePurpose')
        });
        T.combo.ServicePurpose.superclass.initComponent.call(this);
    }
});

Ext.reg('combo.servicepurpose', T.combo.ServicePurpose);