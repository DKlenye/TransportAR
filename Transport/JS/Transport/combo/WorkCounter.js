T.combo.WorkCounter = Ext.extend(Kdn.form.ComboBox, {
    initComponent: function() {
        Ext.applyIf(this, {
            displayField: 'CounterName',
            valueField: 'CounterId',
            store: Kdn.ModelFactory.getStore('WorkCounter')
        });
        T.combo.WorkCounter.superclass.initComponent.call(this);
    }
});

Ext.reg('combo.workcounter', T.combo.WorkCounter);