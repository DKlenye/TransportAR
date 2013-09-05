T.combo.WorkUnit = Ext.extend(Kdn.form.ComboBox, {
    initComponent: function() {
        Ext.applyIf(this, {
            displayField: 'WorkUnitName',
            valueField: 'WorkUnitId',
            store: Kdn.ModelFactory.getStore('WorkUnit')
        });
        T.combo.WorkUnit.superclass.initComponent.call(this);
    }
});

Ext.reg('combo.workunit', T.combo.WorkUnit);