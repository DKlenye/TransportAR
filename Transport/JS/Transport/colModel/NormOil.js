T.colModel.NormOil = Ext.extend(Ext.grid.ColumnModel, {
   
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
                        dataIndex: 'OilNormVehicleId',
                        align: 'center',
                        header: 'Код',
                        width: 80
                    },
                    {
                        dataIndex: 'OilGroupId',
                        header: 'Группа масла',
                        width: 150,
                        editor: { xtype: 'combo.oilgroup', objectValue: false },
                        renderer: Kdn.Renderer.store('OilGroup', 'OilGroupName'),
                    },
                    {
                        dataIndex:'Norm',
                        header:'Норма, л',
                        width: 80,
                        align:'center',
                        editor: {
                            xtype: 'kdn.editor.decimalfield'
                        }  
                        
                    }
          ]
   }
   
});
