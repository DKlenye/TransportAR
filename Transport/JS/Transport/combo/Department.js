T.combo.Department = Ext.extend(Kdn.form.ComboBox, {
    initComponent: function() {
        Ext.applyIf(this, {
            displayField: 'DepartmentName',
            valueField: 'DepartmentId',
            store: Kdn.ModelFactory.getStore('Department')
        });
        T.combo.Department.superclass.initComponent.call(this);
    }
});

Ext.reg('combo.department', T.combo.Department);