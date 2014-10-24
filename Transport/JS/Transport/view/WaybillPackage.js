T.view.WaybillPackage = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'v_WaybillPackages',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {

            colModel: new Ext.grid.ColumnModel({
                defaults:{
                  filter:{}
                },
                columns: [
                    new Ext.grid.RowNumberer({filter:null,width:30}),
                    {
                        dataIndex: 'PackageId',
                        header: 'Текущий номер',
                        width: 200,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'PackageTypeId',
                        header: 'Код типа пачки',
                        hidden:true,
                        width: 100
                    },
                    {
                        dataIndex: 'PackageTypeName',
                        header: 'Наименование пачки',
                        width: 300
                    },
                    {
                        dataIndex: 'WaybillCount',
                        header: 'Кол-во пут.листов',
                        width: 150
                    }                    
                ]
            })
        });

        T.view.WaybillPackage.superclass.constructor.call(this, cfg);
         
    
             
    },
    
    
    onSelectionChange:function(){
         var sel = this.getSelectionModel().getSelected();
         if(sel)
         {
            this.textField.setValue(sel.get('PackageId'));
         }
    },
    
    _getTbar: function()
    {
    
         this.textField = Ext.create({
               xtype:'kdn.editor.textfield',
               allowBlank:true 
             });
    
        return [

            '-',
            {
                text: 'Обновить',
                iconCls: 'icon-refresh',
                handler: this.onRefresh,
                scope: this,
                cls: 'update_btn'
            },
            '-',
            {
                xtype: 'tbspacer',
                width: 10
            },
            '-',
            {
                text: 'Закрыть пачку',
                iconCls: 'icon-lock',
                handler: this.onClosePackage,
                scope: this,
                cls: 'edit_btn'
            },
            '-',
             {
                xtype: 'tbspacer',
                width: 10
            },
            '-',
            
            this.textField,
            
            {
	            text: 'Сформировать',
	            iconCls: 'icon-doc_pdf',
	            cls: 'printbutton',
	            scope: this,
	            handler:function(){
	               
	               var id = this.textField.getValue();
	               if (id) {
	                   Kdn.Reporter.exportReport("WayBillPackage", { PackageId: id }, "PDF");
	               }          
	               
	            }           
	         },
	         '-'
            

        ]
    },
    
    
    onClosePackage:function(){
                  
      var sel = this.getSelectionModel().getSelected();
      
      if(sel){
                     
      Ext.Msg.confirm(
                'Закрытие пачки',
                'Закрыть пачку № '+sel.get('PackageId')+' ?',
                function(y)
                {
                    if (y == 'yes')
                    {
                        sel.beginEdit();
                        sel.set('isClose',1);
                        sel.endEdit();
                    }
                }
            );
                                
      }
        
    },
    
    onRowDblClick: Ext.emptyFn
    
});

Ext.reg('view.waybillpackage', T.view.WaybillPackage);