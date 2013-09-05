
T.view.waybill.WaybillInsert = Ext.extend(Kdn.app.TabItem, {
   
   requireModels:'Customer,Car,Fuel,Schedule,Trailer,WorkCounter',

   constructor:function(cfg){
      cfg = cfg||{};
      
      
      cfg.insertform = Ext.create({
         xtype:'view.waybill.waybillinsertform',
         mainView:this,
         width:600
      });
      
      
      
      
      Ext.apply(cfg,{
         items:[
            {
               xtype:'container',
               region:'center',
               layout:'hbox',
               layoutConfig: {
                   align : 'stretch',
                   pack  : 'start'
               },
               items: [
                   {flex:1,border:false},
                   cfg.insertform,
                   {flex:1,border:false}                   
               ]
            }
         ]
      });
      
      T.view.waybill.WaybillInsert.superclass.constructor.call(this,cfg);
      
   }
   

});

Ext.reg('view.waybillinsert', T.view.waybill.WaybillInsert);