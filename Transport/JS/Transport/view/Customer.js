T.view.Customer = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'Customer',
    pageSize: 50,
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {
            
            colModel: new Ext.grid.ColumnModel({
               defaults:{filter:{}},            
                columns: [
                    {
                        dataIndex: 'CustomerId',
                        header: 'Код',
                        width: 130,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'SHZ',
                        header: 'Шифр затрат',
                        width: 100,
                        editor: { xtype: 'kdn.editor.textfield', allowBlank:true }
                    },
                    {
                        dataIndex: 'CustomerName',
                        header: 'Наименование заказчика',
                        width: 300,
                        editor: { xtype: 'kdn.editor.textfield' }
                    },
                    {
                        dataIndex: 'CostCode',
                        header: 'Код затрат',
                        width: 100,
                        editor: { xtype: 'kdn.editor.textfield' }
                    },
                    {
                        dataIndex: 'isPolymir',
                        header: 'Заказчик Полимира',
                        width: 200,
                        renderer: Ext.ux.grid.CheckColumn.prototype.renderer,
                        editor: { 
                           xtype: 'kdn.editor.booleanfield',
                           renderer: function(v) {
                            if (!Ext.isBoolean(v)) return v;
                            return (!!v) ? 'Да' : 'Нет';
                           }
                        }
                    },
                    {
                        dataIndex: 'PolymirCostCode',
                        header: 'Код затрат (Полимир)',
                        width: 160,
                        editor: { xtype: 'kdn.editor.textfield', allowBlank:true }                        
                    },
                    {
                        dataIndex: 'notActual',
                        header: 'Не актуально',
                        width: 200,
                        renderer: Ext.ux.grid.CheckColumn.prototype.renderer,
                        editor: { 
                           xtype: 'kdn.editor.booleanfield',
                           renderer: function(v) {
                            if (!Ext.isBoolean(v)) return v;
                            return (!!v) ? 'Да' : 'Нет';
                           }
                        }
                    }
                ]
            }),
            
            viewConfig:{
                getRowClass: function(record, rowIndex, rp, ds){
                    var dataIndex = 'notActual';
                    return record.get(dataIndex)?dataIndex:'';
                }
            }
        });

        T.view.Customer.superclass.constructor.call(this, cfg);

      this.on({
         scope:this,
         afterrender:this.onAfterRender
      });

    },
    
    onAfterRender:function(){
     /* var exportButton = new Ext.ux.Exporter.Button({
          store: this.store,
          exportFunction:'exportStore',
          text     : "Download as .xls"
        });
        
        this.getTopToolbar().add(exportButton);*/
    }
    
});

Ext.reg('view.customer', T.view.Customer);