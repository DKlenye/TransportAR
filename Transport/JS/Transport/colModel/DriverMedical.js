T.colModel.DriverMedical = Ext.extend(Ext.grid.ColumnModel, {
   
  constructor:function(cfg){
      cfg = cfg||{};
      Ext.apply(cfg,{
         columns: ((cfg.columns||[]).concat(this.getColumns()))
      });
      T.colModel.DriverMedical.superclass.constructor.call(this,cfg);
   },
   
   getColumns:function(){
      return [
         {
            dataIndex: 'MedicalId',
            align: 'center',
            header: 'Код',
            width: 80,
            hidden:true,
            editor: { xtype: 'kdn.editor.id' }
         },        
         {
            dataIndex: 'Number',
            header: 'Номер',
            width: 110,
            editor: { xtype: 'kdn.editor.textfield' }
         },
         {
            dataIndex: 'DateOfTerm',
            align: 'center',
            xtype: 'datecolumn',
            header: 'Срок действия',
            width: 150,
            editor: { xtype: 'kdn.editor.datefield' } 
         }                 
      ]
   }
   
});
