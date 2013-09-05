T.combo.Increase = Ext.extend(Kdn.form.ComboBox, {
    initComponent: function()
    {
        Ext.apply(this, {
            valueField: 'IncreaseId',
            displayField: 'IncreaseName',
            store: Kdn.ModelFactory.getStore('Increase'),
            tpl: new Ext.XTemplate(
                '<tpl for="."><div class="x-combo-list-item">',
			        '{IncreaseName} {Prcn}%',
                '</div></tpl>'
            )
        });
        T.combo.Increase.superclass.initComponent.call(this);
    }
});

Ext.reg('combo.increase', T.combo.Increase);