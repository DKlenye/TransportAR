T.combo.MultiCustomer = Ext.extend(Ext.ux.form.SuperBoxSelect, {
   
   constructor:function(cfg){
    
    cfg = cfg||{};
    
    
    var store = Kdn.ModelFactory.getModel('Customer').buildStore({autoSave:false});
    
    Ext.apply(cfg,{
            renderFieldBtns:false,
            name: 'CustomerName',
            store: store,
            mode: 'local',
            displayField: 'CustomerName',
            valueField: 'CustomerId',
            classField: 'cls',
            styleField: 'style',
            extraItemCls: 'x-flag',
            extraItemStyle: 'border-width:2px',
            stackItems: true,
            dataIndex: 'Customers'
    });
    
    T.combo.MultiCustomer.superclass.constructor.call(this,cfg);
   }
   
});

Ext.reg('combo.multicustomer', T.combo.MultiCustomer);