T.combo.TransmissionType = Ext.extend(Kdn.form.ComboBox, {
    initComponent: function() {
        Ext.applyIf(this, {
            displayField: 'name',
            valueField: 'id',
            store: new Ext.data.ArrayStore({
              id: 0,
              fields: ['id','name'],
              data: [[1, 'Механическая'], [2, 'Автоматическая']]
          })
        });
      T.combo.TransmissionType.superclass.initComponent.call(this);
    }
});

Ext.reg('combo.transmissiontype', T.combo.TransmissionType);