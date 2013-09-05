T.combo.OwnerDsc = Ext.extend(Kdn.form.ComboBox, {
    initComponent: function() {
        Ext.applyIf(this, {
            displayField: 'name',
            valueField: 'id',
            store: new Ext.data.ArrayStore({
              id: 0,
              fields: ['id','name'],
              data: [[1, 'Нафтан'], [2, 'Полимир']]
          })
        });
        T.combo.OwnerDsc.superclass.initComponent.call(this);
    }
});

Ext.reg('combo.ownerdsc', T.combo.OwnerDsc);