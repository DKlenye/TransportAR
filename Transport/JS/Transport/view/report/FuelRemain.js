T.view.report.FuelRemain = Ext.extend(Kdn.app.TabItem, {
    
    initComponent:function(){
      
      Ext.apply(this,{
         layout:'form',
         frame:true,
         items:[
            {
               fieldLabel:'Период',
               xtype:'datefield',
               plugins:'monthPickerPlugin',
               format:'F Y',
               width:250,
               dataIndex:'period',
               value:new Date()
            },
            {
               fieldLabel:'Колонна',
               xtype:'combo.transportcolumn',
               dataIndex:'column',
               width:250,
               objectValue:false,
               enableClear:true
            },
            {
               fieldLabel:'Подразделение',
               xtype:'combo.department',
               width:350,
               dataIndex:'department',
               objectValue:false,
               enableClear:true
            },
            {
               text:'Сформировать',
               xtype:'button',
               iconCls:'icon-blue-document-word', 
               handler:function(){

                  var o = {};
                  this.items.each(function(e){
                     if(e.dataIndex){
                        o[e.dataIndex]=e.getValue();
                     }
                  });
                  
                  var params = {}; 
                  
                  params.month = o.period.getMonth()+1;
                  params.year = o.period.getFullYear();
                  params.ownerId = 1;
                  params.column = o['column']||0;
                  params.department = o['department']||0;

                   Kdn.Reporter.exportReport("VehicleFuelRemains", params, "WORD");


               },
               scope:this
            }
         ]
      });
      
      T.view.report.FuelRemain.superclass.initComponent.call(this);
    }

});

Ext.reg('view.report.fuelremain', T.view.report.FuelRemain);