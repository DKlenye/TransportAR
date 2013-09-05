T.colModel.CheckCO = Ext.extend(Ext.grid.ColumnModel, {
   
constructor:function(cfg){
      cfg = cfg||{};
      Ext.apply(cfg,{
         columns: ((cfg.columns||[]).concat(this.getColumns()))
      });
      T.colModel.Insurance.superclass.constructor.call(this,cfg);
   },
   
   getColumns:function(){
      return [      
                    {
                        dataIndex: 'DateOfTerm',
                        align: 'center',
                        xtype: 'datecolumn',
                        header: 'Срок действия',
                        width: 150,
                        editor: { xtype: 'kdn.editor.datefield' } 
                    },
                    {
                        dataIndex: 'CheckCOId',
                        align: 'center',
                        header: 'Код',
                        width: 80,
                        hidden:true,
                        editor: { xtype: 'kdn.editor.id' }
                    }
          ]
   }
   
});
