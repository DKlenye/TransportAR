T.combo.MultiRegisterDispatcher = Ext.extend(Ext.net.MultiCombo, {
    initComponent: function() {
        Ext.apply(this, {
            displayField: 'Name',
            valueField: 'UserId',
            triggerAction: 'all',
            mode: 'local',
            store: Kdn.ModelFactory.getModel('User').buildStore({
                proxy: new Kdn.data.DirectProxy({
                    api: {
                        read: Kdn.Direct.ReadDispatcher
                    }
                })
            })
        });
        T.combo.MultiColumn.superclass.initComponent.call(this);
    }
});

Ext.reg('combo.multiregisterdispatcher', T.combo.MultiRegisterDispatcher);