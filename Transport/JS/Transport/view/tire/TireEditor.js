T.view.TireEditor = Ext.extend(Kdn.editor.ModelEditor, {
   
   initComponent:function(){	   
	   T.view.TireEditor.superclass.initComponent.call(this);
	   
	   this.on('editorfind',this.onEditorFind,this);
	
	},
	
	onEditorFind:function(e){
	   var prop = e.editors[0];
	   
	   prop.on({
	      propertychange:this.onPropertyChange,
	      scope:prop
	   });  
	},
	
	onPropertyChange:function(source, recordId, value, oldValue ){
	   if(recordId=="TireModelId" && !this.record){
	      var TireModelStore = Kdn.ModelFactory.getStore('TireModel');
	      var rec = TireModelStore.getById(value);
	      
	      if(rec){      
	      
	         var source = this.getSource();
	         Ext.apply(source, {	        
	            KmNorm:rec.get('KmNorm'),
	            Season:rec.get('Season'),
	            TireMakerId:rec.get('TireMakerId'),
	            WeightIndex:rec.get('WeightIndex'),
	            Size:rec.get('Size'),
	            Diameter:rec.get('Diameter')        
	         });
	         this.setSource(source);
	      }
	      
	   }
	}
   
});

Ext.reg('view.tireeditor', T.view.TireEditor);