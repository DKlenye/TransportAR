T.colModel.Inspection = Ext.extend(Ext.grid.ColumnModel, {
   
   constructor:function(cfg){
      cfg = cfg||{};
      Ext.apply(cfg,{
         columns: ((cfg.columns||[]).concat(this.getColumns()))
      });
      T.colModel.Inspection.superclass.constructor.call(this, cfg);
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
                        dataIndex: 'InspectionType',
                        header: 'Вид осмотра',
                        width: 100,
                        editor: { xtype: 'combo.inspectiontype', objectValue: false },
                        renderer: function(v) {
                            if (!v) return v;
                            var o = {
                                1: 'ГосТехОсмотр',
                                2: 'МСТО',
                                3: 'ЕКМТ'
                            };
                            return o[v];
                        }       
                    },
                    {
                        dataIndex: 'InspectionId',
                        align: 'center',
                        header: 'Код',
                        width: 80,
                        hidden:true,
                        editor: { xtype: 'kdn.editor.id' }
                    }
          ]
   }

});

                          
