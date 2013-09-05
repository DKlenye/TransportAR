T.view.waybill.WaybillTab = Ext.extend(Ext.TabPanel, {
   
   initComponent:function(){
      T.view.waybill.WaybillTab.superclass.initComponent.call(this);
      
      this.on({
         afterrender:this.onAfterRender,
         scope:this,
         single:true     
      });
      
   },
   
   onAfterRender:function(){
      this.on({
         tabchange:this.onTabChange,
         scope:this      
      });
   },
   
   onTabChange:function(panel,tab){
      if (tab.focusTask) tab.focusTask.delay(50);
   }
   
   
});
Ext.reg('view.waybill.waybilltab', T.view.waybill.WaybillTab);
