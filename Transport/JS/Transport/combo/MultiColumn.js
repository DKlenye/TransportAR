T.combo.MultiColumn = Ext.extend(Ext.net.MultiCombo, {
    initComponent: function() {
        Ext.apply(this, {
            displayField: 'ColumnName',
            valueField: 'ColumnId',
            triggerAction: 'all',
            mode: 'local',
            store: Kdn.ModelFactory.getStore('TransportColumn')
        });
        T.combo.MultiColumn.superclass.initComponent.call(this);
    }
});

Ext.reg('combo.multicolumn', T.combo.MultiColumn);