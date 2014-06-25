T.combo.InspectionType = Ext.extend(Kdn.form.ComboBox, {
    initComponent: function() {
        Ext.applyIf(this, {
            displayField: 'text',
            valueField: 'id',
            store: new Ext.data.ArrayStore({
               fields: ['id','text'],
               data: [[1,'ГосТехОсмотр'],[2,'МСТО'],[3,'ЕКМТ']]          
            })
        });

        T.combo.InspectionType.superclass.initComponent.call(this);
    }
});

Ext.reg('combo.inspectiontype', T.combo.InspectionType);