T.app.TemperatureButton = Ext.extend(Ext.ButtonGroup,{

   constructor:function(cfg){
      cfg = cfg||{};
   
      var button = Ext.create({
         xtype:'button',
         iconCls:'icon-temperature_3',                  
         text:'',
         width:120,
         handler:this.buttonClick,
         scope:this
      });   
      
      this.btn = button;
   
      Ext.apply(cfg,{
         title:new Date().format('d.m.Y'),
         items:button
      });
      
      T.app.TemperatureButton.superclass.constructor.call(this,cfg);
      
      this.on({
         single:true,
         scope:this,
         afterrender:this.onAfterRender
      });
              
   },
   
   
   onAfterRender:function(){
   
      Ext.TaskMgr.start({
          run: this.updateTemperature.createDelegate(this),
          interval: 1000*60*10
      });  
      
   },
   
   buttonClick:function(){
     Kdn.Application.createView(
      {xtype:'view.temperature',single:true},
      {"text": "Температура воздуха","iconCls": "icon-temperature_3"
       }
     );
   },
   
   updateTemperature:function(){
   
      var $ = this;
      
      (function(){      
         Kdn.Direct.GetCurrentTemperature({},$.onTemperatureLoad.createDelegate($))
      }).defer(1000);      
   },
   
   onTemperatureLoad:function(e) {
      this.setTitle(e.Date.format('d.m.Y H:i'));
      this.btn.setText((e.Temp>0?'+':'')+e.Temp);
   }
      

});

Ext.reg('app.temperaturebutton', T.app.TemperatureButton);