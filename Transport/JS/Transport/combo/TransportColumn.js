T.combo.TransportColumn = Ext.extend(Kdn.form.ComboBox, {
    initComponent: function() {
        Ext.applyIf(this, {
            displayField: 'ColumnName',
            valueField: 'ColumnId',
            store: Kdn.ModelFactory.getStore('TransportColumn')
        });
        T.combo.TransportColumn.superclass.initComponent.call(this);
    }
});

Ext.reg('combo.transportcolumn', T.combo.TransportColumn);