T.view.waybill.FocusMgr = Ext.extend(Object, {
   
   constructor:function(){
     this.map = new Ext.util.MixedCollection(); 
   },
   
   add:function(key,cmp){      
      this.map.add(key,cmp);      
   }
   
   
         
   

});   


