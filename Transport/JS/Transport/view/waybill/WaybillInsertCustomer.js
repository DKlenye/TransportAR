   T.view.waybill.WaybillInsertCustomer = Ext.extend(Kdn.editor.LocalGrid, {
    enableAdd:true,
    constructor: function(cfg) {
        cfg = cfg || {};


        var me = this;

        Ext.apply(cfg, {

            tbar  : cfg.enableAdd!==false && this.enableAdd?[
                {
                    xtype: 'button.add',
                    handler: this.add,
                    scope: this
                }
            ]:null,

            viewConfig:{
               forceFit:true
            }, 
            colModel: new Ext.grid.ColumnModel({
                columns: [
                {
                    xtype: 'actioncolumn',
                    icon: 'images/icons/delete.png',
                    tooltip: 'Удалить',
                    fixed: true,
                    width: 40,
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = me.store.getAt(rowIndex);
                        me.store.remove(rec);
                    }

                },
                  {
                     header:'Заказчик',
                     dataIndex:'Customer',
                     renderer:function(c) {
                         return String.format("[{0}] {1}", c.CustomerId, c.CustomerName);
                     }
                  }
               ]
            }),
            store:new Ext.data.JsonStore({
                fields:['Customer']
            })
        });

        T.view.waybill.WaybillInsertCustomer.superclass.constructor.call(this, cfg);
    }      
    
});

Ext.reg('view.waybill.waybillinsertcustomer', T.view.waybill.WaybillInsertCustomer);