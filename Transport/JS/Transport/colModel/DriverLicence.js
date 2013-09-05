T.colModel.DriverLicence = Ext.extend(Ext.grid.ColumnModel, {
   
  constructor:function(cfg){
      cfg = cfg||{};
      Ext.apply(cfg,{
         columns: ((cfg.columns||[]).concat(this.getColumns()))
      });
      T.colModel.DriverLicence.superclass.constructor.call(this,cfg);
   },
   
   getColumns:function(){
      return [
         {
            dataIndex: 'LicenceId',
            align: 'center',
            header: 'Код',
            width: 80,
            hidden:true,
            editor: { xtype: 'kdn.editor.id' }
         },
         {
            dataIndex: 'Serial',
            header: 'Серия',
            width: 80,
            editor: { xtype: 'kdn.editor.textfield' }
         },
         {
            dataIndex: 'Number',
            header: 'Номер',
            width: 110,
            editor: { xtype: 'kdn.editor.textfield' }
         },
         {
            dataIndex: 'Category',
            header: 'Категории',
            width: 110,
            editor: { xtype: 'combo.drivercategory' }
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
