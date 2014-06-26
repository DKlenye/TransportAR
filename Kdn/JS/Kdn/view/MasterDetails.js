Kdn.view.MasterDetails = Ext.extend(Ext.Panel,{
   
   master:null,
   details:[],
   dataIndexKey:'',

   initComponent:function(){
      
      this.selChangeTask = new Ext.util.DelayedTask(this.onSelChangeTask, this);
      this.refreshBuffer = [];
      
      Ext.apply(this.master,{ 
         margins:'3 3 0 3',
         region: 'center',
         split:true
      });
      
      var masterView = Ext.create(this.master);
      
      var detailsView = Ext.create({
         region: 'south',
         split: true,
         collapsible: true,
         collapseMode: 'mini',
         hideCollapseTool:true,
         height:350,
         xtype: 'tabpanel',
         disabled:true,
         activeTab:0,
         margins:'0 3 3 3',
         items:this.details
      });
      
      Ext.apply(this,{
         
         layout:'border',
         masterView:masterView,
         detailsView:detailsView,
         items:[
            masterView,
            detailsView
         ]
         
      });
      
      Kdn.view.MasterDetails.superclass.initComponent.call(this);
      
      this.on({
         afterrender:this.onAfterRender,
         scope:this,
         single:true
      });
      
      this.detailsView.on({
         tabchange:this.onTabChange,
         scope:this   
      });
            
   },
   
   onAfterRender:function(){
      this.masterView.getSelectionModel().on({
         selectionChange:this.onSelectionChange,
         scope:this
      });
      this.masterView.on({
         rowclick:this.onSelectionChange,
         scope:this
      });
   },
   
   onTabChange:function(o,tab){
     if(this.refreshBuffer.indexOf(tab)==-1){
         this.refreshView(tab);
     };
   },
   
   
   onSelectionChange:function(){
      this.selChangeTask.delay(100);
   },
   
   onSelChangeTask:function(){
      var selections = this.masterView.getSelectionModel().getSelections();
      var sel = selections.shift();
           
      if(sel && selections.length==0 && !sel.phantom){  
            this.unmaskDetails();                           
            this.filterValue = sel.get(this.dataIndexKey);
            this.setDefaultKey();
            this.refreshDetails();
      }
      else{
         this.clearDetails();
         this.maskDetails();
      }
      
   },
   
   clearDetails:function(){
      this.detailsView.items.each(function(view){
            var store = view.store;
            if(store){
                store.clearData();
                try {
                    view.view.refresh();                                        
                } catch (e) {} 
            }
         });
   },
   
   maskDetails:function(){
      this.detailsView.getEl().mask();
   },
   
   unmaskDetails:function(){
      this.detailsView.getEl().unmask();
   },
   
   setDefaultKey:function(){
      var key = this.dataIndexKey;
      var val = this.filterValue;
      
      this.detailsView.items.each(function(view){
         var store = view.store;
         if(store){
            var field = store.fields.get(key);
            if(field){
               field.defaultValue = val;
            }
         }
      });
   },
   
   refreshDetails:function(){
      this.refreshBuffer = [];
      var view = this.detailsView.getActiveTab();
      this.refreshView(view);                  
   },
   
   refreshView:function(view){
      this.refreshBuffer.push(view);
      if(view.store && this.filterValue){
         var filter = {};
         filter[this.dataIndexKey] = this.filterValue;
         
         view.store.reload({
            params:{filter:filter}
         });
      }
   }
   

});

Ext.reg('kdn.view.masterdetails',Kdn.view.MasterDetails);