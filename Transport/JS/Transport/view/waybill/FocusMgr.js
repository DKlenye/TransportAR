T.view.waybill.FocusMgr = Ext.extend(Object, {
   
   constructor:function(mainView){
   
      this.mainView = mainView;
   
      var em = this.EventMap = new Ext.util.MixedCollection();
      var eo = Ext.EventObject;
      
      em.add(eo.DOWN,'DOWN')
      em.add(eo.UP,'UP')
      em.add(eo.LEFT,'LEFT')
      em.add(eo.RIGHT,'RIGHT')
      
            
      this.EventMap = em;
   
     this.map = new Ext.util.MixedCollection(); 
   },
   
   add:function(key,cmp){      
      this.map.add(key,cmp);
      
      var fi = cmp.fi;
      if(fi){
         fi.on({
            down:this.onKey,
            up : this.onKey,
            left : this.onKey,
            right : this.onKey,
            pageup: this.onPageUp,
            pagedown : this.onPageDown,
            esc: this.onEsc,
            scope:this
         });    
      }  
         
   },
   
   onEsc:function(){
      var $ = this.mainView;
      $.ComboCar.focus.defer(300,$.ComboCar,[true]);
   },
   
   onPageDown:function(){     
      var $ = this.mainView;
      
      if(!$.isLast())
      {
         $.loadWaybill(1)
      }
            
   },
   onPageUp:function(){
      var $ = this.mainView;
      
      if(!$.isFirst())
      {
         $.loadWaybill(-1)
      }
   },
   
   onKey:function(e, t, tf, fi){
      if(e.ctrlKey){
         var eName = this.EventMap.get(e.getKey());
         var navmap = fi.component.navMap;
         if(navmap && navmap[eName]){
            var target = this.map.get(navmap[eName]);
            
            if(navmap[eName]=='fueltab'){            
                 target.onTabChange(target,target.getActiveTab());
            }
            
            else if(eName=='RIGHT' && (navmap[eName]=='refuelling' || navmap[eName]=='summary')){
               this.map.get('fueltab').setActiveTab(target);
            }
            
            else if(eName=='LEFT' && (navmap[eName]=='refuelling' || navmap[eName]=='remains')){
               this.map.get('fueltab').setActiveTab(target);
            }
            
            else{
               if(target && target.focusTask){
                  target.focusTask.delay(20);
               }
            }     
         }
         
      }
   }
   
   
         
   

});   


