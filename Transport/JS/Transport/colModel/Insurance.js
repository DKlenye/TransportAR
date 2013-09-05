T.colModel.Insurance = Ext.extend(Ext.grid.ColumnModel, {
   
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
                        dataIndex: 'InsuranceNumber',
                        header: '№ страхового бланка',
                        width: 180,
                        editor: { xtype: 'kdn.editor.textfield' }
                    },
                    {
                        dataIndex: 'DateOfTerm',
                        align: 'center',
                        xtype: 'datecolumn',
                        header: 'Срок действия',
                        width: 150,
                        editor: { xtype: 'kdn.editor.datefield' } 
                    },
                    {
                        dataIndex: 'isFree',
                        align: 'center',
                        header: 'Обязательная',
                        width: 120,
                        renderer: Ext.ux.grid.CheckColumn.prototype.renderer,
                        editor : {
                           xtype:'kdn.editor.booleanfield',
                           renderer: function(v) {
                            if (!Ext.isBoolean(v)) return v;
                            return (!!v) ? 'Да' : 'Нет';
                           }
                        }
                    },
                    {
                        dataIndex: 'InsuranceId',
                        align: 'center',
                        header: 'Код',
                        width: 80,
                        hidden:true,
                        editor: { xtype: 'kdn.editor.id' }
                    }
          ]
   }
   
});
