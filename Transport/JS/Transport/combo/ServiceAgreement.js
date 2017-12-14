T.combo.ServiceAgreement = Ext.extend(Kdn.form.ComboBox, {
    initComponent: function() {
        Ext.applyIf(this, {
            displayField: 'AgreementName',
            valueField: 'AgreementId',
            store: Kdn.ModelFactory.getStore('ServiceAgreement')
        });
        T.combo.BodyType.superclass.initComponent.call(this);
    }
});

Ext.reg('combo.serviceagreement', T.combo.ServiceAgreement);