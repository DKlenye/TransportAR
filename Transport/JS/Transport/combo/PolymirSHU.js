T.combo.PolymirSHU = Ext.extend(Kdn.form.ComboBox, {
    initComponent: function() {
        Ext.applyIf(this, {
            displayField: 'text',
            valueField: 'id',
            store: new Ext.data.ArrayStore({
               fields: ['id','text'],
               data: [['УП "Нафтан-Спецтранс"', 'УП "Нафтан-Спецтранс"']]          
            })
        });

       T.combo.PolymirSHU.superclass.initComponent.call(this);
    }
});

Ext.reg('combo.polymirshu', T.combo.PolymirSHU);