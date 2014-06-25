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

	onPropertyChange: function(source, recordId, value, oldValue) {

	   if(recordId=="TireModel" && !this.record){
	         var source = this.getSource();
	         Ext.apply(source, {
	            KmNorm: value['KmNorm'],
	            MonthNorm: value['MonthNorm'],
	            Season:value['Season'],
	            TireMakerId:value['TireMakerId'],
	            Size:value['Size']     
	         });
	         this.setSource(source);
	      }
	}
   
});

Ext.reg('view.tireeditor', T.view.TireEditor);