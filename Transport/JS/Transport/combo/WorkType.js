T.combo.WorkType = Ext.extend(Kdn.form.ComboBox, {
    editable:true,
    initComponent: function() {
        Ext.applyIf(this, {
            displayField: 'WorkTypeName',
            valueField: 'WorkTypeId',
            store: Kdn.ModelFactory.getStore('WorkType')          
        });
        T.combo.WorkType.superclass.initComponent.call(this);
    }
});

Ext.reg('combo.worktype', T.combo.WorkType);