T.colModel.FuelLimits = Ext.extend(Ext.grid.ColumnModel, {
   
constructor:function(cfg){
      cfg = cfg||{};
      Ext.apply(cfg,{
         columns: ((cfg.columns||[]).concat(this.getColumns()))
      });
      T.colModel.FuelLimits.superclass.constructor.call(this, cfg);
   },
   
   getColumns:function(){
      return [      
                    {
                        dataIndex: 'StartDate',
                        align: 'center',
                        xtype: 'datecolumn',
                        header: 'Начало действия',
                        width: 150,
                        editor: { xtype: 'kdn.editor.datefield' }
                    },
                    {
                        dataIndex: 'EndDate',
                        align: 'center',
                        xtype: 'datecolumn',
                        header: 'Окончание действия',
                        width: 150,
                        editor: { xtype: 'kdn.editor.datefield' }
                    },
                    {
                        dataIndex: 'FuelLimit',
                        align: 'center',
                        header: 'Лимит, л',
                        width: 150,
                        editor: { xtype: 'kdn.editor.numberfield' }
                    },
                    {
                        dataIndex: 'isDayLimit',
                        align: 'center',
                        header: 'Дневной лимит',
                        width: 150,
                        renderer: function(v)
                        {
                            if (!Ext.isBoolean(v)) return v;
                            return (!!v) ? 'Да' : 'Нет';
                        },
                        editor: {
                            xtype: 'kdn.editor.booleanfield'                            
                        }
                    },
                    {
                        dataIndex: 'Id',
                        align: 'center',
                        header: 'Код',
                        width: 80,
                        hidden:true,
                        editor: { xtype: 'kdn.editor.id' }
                    }
          ]
   }
   
});
