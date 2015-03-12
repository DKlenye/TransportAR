
T.view.NormEditor = Ext.extend(Kdn.editor.ModelEditor, {
   closeAfterSave:false,
   getItems:function(){	
	   var propCfg = this.grid.getEditorCfg();
	   Ext.apply(propCfg,{
	      xtype:'kdn.grid.propertyeditor',
	      region:'center',
	      split:true,
	      margins:'3 3 0 3'
	   });
	   
	   var ConsumptionGrid = new Kdn.grid.LocalEditorGrid({
	      region:'south',
	      split:true ,
	      resizable:true,
	      margins:'0 3 3 3',
	      height:350,
	      title:'Норма расхода топлива',
	      colModel:new Ext.grid.ColumnModel({
               columns:[
                  {
                     dataIndex:'ConsumptionStartDate',
                     xtype:'datecolumn',
                     header:'Начало действия',
                     editor:{xtype:'kdn.editor.datefield'},
                     width:200
                  },
                  {
                     dataIndex:'Consumption',
                     header:'Расход, л',
                     editor: { xtype: 'kdn.editor.numberfield', decimalPrecision: 3 },
                     width:150
                  },
                  {
                     dataIndex:'RecId',
                     header:'Код',
                     editor:{xtype:'kdn.editor.id'},
                     hidden:true
                  }
               ]
           }),
          store:Kdn.ModelFactory.getModel('NormConsumption').buildStore({
            autoLoad:false,
            autoSave:false,
            listeners:{
               scope:this,
               write:{
                  fn:this.onConsumptionWrite
               }
            }
         }),
         loadMask:true,
         listeners:{
            scope:this,
            beforeedit:this.onBeforeEditConsumption
           }
	   });	   
	   	      
	   this.ConsumptionGrid = ConsumptionGrid;	   
	    
	   return [{
	      xtype:'panel',
	      region:'center',
	      layout:'border',
	      border: false,
	      items:[
	         Ext.create(propCfg),
	         ConsumptionGrid
	      ]
	   }]
	   
	   
	},
	
	onAfterRender:function(){	
	   T.view.NormEditor.superclass.onAfterRender.call(this);
	   
	   if (this.record){
	      
	      var normId = this.record.data.NormId;
	      
	      var grid = this.ConsumptionGrid,
	      store = grid.store;
	      
	      store.fields.get('NormId').defaultValue=normId;
	      
	      store.reload({
	         params:{
	            filter:{
	               NormId:normId
	            },
	            sort:'ConsumptionStartDate',
	            dir:'DESC'
	         }
	      }); 
	      
	      
	      
	   }
	      	   
	},
	
	
	loadConsumption:function(){
	  
		
	/*onTabChange:function(panel,tab){
	  
	  if (!tab.loaded && tab.store && tab.recordId!=this.record.id){
	      var car = Ext.copyTo({},this.record.data,"VehicleId,GarageNumber");	      
	      tab.recordId=this.record.id;   
	      tab.store.fields.get('Car').defaultValue=car;
	      tab.store.reload({
            params:{
               filter:{
                  Car:car
               }
            }
         });
	  }*/
	   
	},
	
	onBeforeEditConsumption:function(e){
      var CSD = 'ConsumptionStartDate';
    
      if (!e.record.phantom) return false;
      if (e.field==CSD){
         var editor = e.grid.colModel.getCellEditor(e.column),
            editorField = editor.field;
            
            var max = e.grid.store.max(CSD);
            if (Ext.isDate(max)){
              max=max.add(Date.DAY,1);
            }
            editorField.setMinValue(max);            
      }
    },
   
	
	commitChanges:	function(){
	   
	   var phantom = (!this.record);	  
	   
	   if (phantom){
	      this.grid.store.on({
	         scope:this,
	         write:{
	            fn:this.onNormWrite,
	            single:true
	         }
	      });
	   }
	    
      T.view.NormEditor.superclass.commitChanges.call(this);
          
      if(!phantom){
         this.onNormWrite()
      }      
         
	},
	
	onNormWrite:function(){
	   
	  var normId = this.record.id,
	  store =  this.ConsumptionGrid.store,
	  closeFlag = true;
	  
	   
	   store.each(function(rec){
	      rec.beginEdit();
	      rec.set('NormId',normId);
	      rec.endEdit();
	   });
	   
	   if((store.getModifiedRecords().concat(store.removed)).length>0){
	      store.save();
	   }
	   else	this.closeMe();
	},
	
	onConsumptionWrite:function(){
	   var editRecord = this.record, 
	       store =  this.ConsumptionGrid.store,     
          rec = store.data.itemAt(0); 
          
      if(rec){
            editRecord.set("NormConsumption",[rec.data]);
		      editRecord.commit([true]);     
      }
      else{         
               editRecord.set("NormConsumption",[]);
		         editRecord.commit([true]);	         
      }
	
	   this.closeMe();
	}
	
	
});

Ext.reg('view.normeditor', T.view.NormEditor);

