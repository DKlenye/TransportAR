T.combo.ServiceDepartment = Ext.extend(Kdn.form.ComboBox, {
    initComponent: function() {
        Ext.applyIf(this, {
            displayField: 'DepartmentName',
            valueField: 'DepartmentId',
            store: Kdn.ModelFactory.getStore('ServiceDepartment')
        });
        T.combo.ServiceDepartment.superclass.initComponent.call(this);
    }
});

Ext.reg('combo.servicedepartment', T.combo.ServiceDepartment);