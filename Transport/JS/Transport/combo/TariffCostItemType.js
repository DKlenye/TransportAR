T.combo.TariffCostItemType = Ext.extend(Kdn.form.ComboBox, {
    initComponent: function() {
        Ext.applyIf(this, {
            displayField: 'name',
            valueField: 'id',
            store: new Ext.data.ArrayStore({
              id: 0,
              fields: ['id','name'],
              data: [[1, 'ЗП'], [2, 'МЗ'],[3, 'СМ']]
          })
        });
      T.combo.TariffCostItemType.superclass.initComponent.call(this);
    }
});

Ext.reg('combo.tariffcostitemtype', T.combo.TariffCostItemType);