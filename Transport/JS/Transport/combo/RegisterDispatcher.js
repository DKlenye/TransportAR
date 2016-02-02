T.combo.RegisterDispatcher = Ext.extend(Kdn.form.ComboBox, {
    initComponent: function() {
        Ext.applyIf(this, {
            displayField: 'Name',
            valueField: 'UserId',
            store: Kdn.ModelFactory.getModel('User').buildStore({
                proxy: new Kdn.data.DirectProxy({
                 api: {
                        read: Kdn.Direct.ReadDispatcher
                    }
                })
            })
        });
         T.combo.RegisterDispatcher.superclass.initComponent.call(this);
    }
});

 Ext.reg('combo.registerdispatcher', T.combo.RegisterDispatcher);