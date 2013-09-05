T.combo.Schedule = Ext.extend(Kdn.form.ComboBox, {
    initComponent: function() {
        Ext.applyIf(this, {
            displayField: 'ScheduleName',
            valueField: 'ScheduleId',
            store: Kdn.ModelFactory.getStore('Schedule')
        });
        T.combo.BodyType.superclass.initComponent.call(this);
    }
});

Ext.reg('combo.schedule', T.combo.Schedule);