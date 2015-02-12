
T.view.DriverEditor = Ext.extend(Kdn.editor.ModelEditor, {

   mode:null,// create update
   
   closeAfterSave:false,

   getItems:function(){	
   	   	   
	   var propCfg = this.grid.getEditorCfg();
	   Ext.apply(propCfg,{
	      xtype:'kdn.grid.propertyeditor',
	      region:'center',
	      split:true,
	      margins:'3 3 0 3'
	   });
	  	  	   
	   
	   return [
	      propCfg,
	      {
	         xtype:'tabpanel',
	         cls:'editortab',
	         enableTabScroll : true,			  
	         activeTab:0,
	         region:'south',
	         height:300,
	         split:true,
	         collapsible:true,
	         collapseMode:'mini',
	         hideCollapseTool:true,
	         margins:'0 3 3 3',
	         items:[
	            {iconCls:'',title:'Вод. удостоверения',xtype:'view.driver.driverlicence'},
	            {iconCls:'',title:'Мед. справки',xtype:'view.driver.drivermedical'} 
	         ]
	      }
	   ]
	   
	},
	
	onAfterRender:function(){	
	   T.view.DriverEditor.superclass.onAfterRender.call(this);
	   
	   var me = this;    	   
	   me.tab = Ext.getCmp(this.getEl().query('.editortab')[0].id);	
	           
      this.setMode((!me.record)?(this.mode||'create'):'update');
      if(me.record){                    
             this.onDriverSelect(me.record);
      }
      
      me.tab.on({
         scope:this,
         tabchange:this.onTabChange
      });
         	   
	},
	
	onTabChange:function(panel,tab){
	  
	  if (!tab.loaded && tab.store && tab.recordId!=this.record.id){
	      var driver = Ext.copyTo({},this.record.data,"DriverId");	      
	      tab.recordId=this.record.id;   
	      tab.store.fields.get('Driver').defaultValue=driver;
	      tab.store.reload({
            params:{
               filter:{
                  Driver:driver
               }
            }
         });
	  }
	   
	},
	
   getTbar:function(){
	
	   this.ComboDriver = Ext.create({
	            xtype:'combo.driver',
	            width:300,
	            listeners:{
	               scope:this,
	               select:this.onDriverSelect
	            }
      });
	
	   return [
	         {xtype:'tbspacer',width:10},
	         this.ComboDriver,
	         {xtype:'tbspacer',width:10},
	         '-',
	         {xtype:'button.save'},
	         '-'
	      ]
	},
   
   onDriverSelect:function(rec){
	   this.record = rec;
	   this.setMode('update');
	   this.fillEditor();
	   this.setTitleDriver(); 
	   
	   var z = this.tab.getActiveTab();
	   this.onTabChange(this.tab,z);	   
	},
	
	setMode:function(mode){
	   
	  if (this.mode==mode) return;
	  
	  this.mode = mode;
	  
	  if (this.mode=='create'){
	      this.ComboDriver.setDisabled(true);
	      this.tab.collapse();
	      this.tab.setDisabled(true);
	  }
	  else{
	    this.ComboDriver.setDisabled(false);
	    this.tab.expand(true);
	    this.tab.setDisabled(false);
	    this.ComboDriver.setValue(this.record);
	  }
	  this.setTitleDriver(); 
	    
	},
	
	setTitleDriver:function(){
	    if(this.mode=='create'){
	     // this.setTitle('Гар.№ ---','icon-car_add');
	    }
	    else{
	     // this.setTitle(String.format('Гар.№ {0}',(!this.record?'---':this.record.data.GarageNumber)),'icon-car');
	    }
	    
	},
	
	commitChanges:	function(){
      T.view.DriverEditor.superclass.commitChanges.call(this);
      
      this.tab.items.each(function(e){
         if (e.store){
            e.store.save();
         }
      });  
      
      this.setMode('update');
      
	}
	
});

Ext.reg('view.drivereditor', T.view.DriverEditor);