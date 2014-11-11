T.combo.WaybillState = Ext.extend(Kdn.form.ComboBox, {
    initComponent: function() {
        Ext.applyIf(this, {
            displayField: 'name',
            valueField: 'id',
            tpl: '<tpl for="."><div class="x-combo-list-item icon-combo-item {iconCls}">&nbsp;</div></tpl>',
            store: new Ext.data.ArrayStore({
                id: 0,
                fields: ['id', 'name', 'iconCls'],
                data: [[1, '', 'icon-lock-unlock'], [2, '', 'icon-lock']]
            }),
            listeners: {
                select: function (item, record, index) {
                    var iconCls='';
                    if (record) {
                        iconCls = record.get('iconCls');
                    }
                    this.setIconCls(iconCls);
                }
            }
        });
        T.combo.WaybillState.superclass.initComponent.call(this);
    }
});

Ext.reg('combo.waybillstate', T.combo.WaybillState);