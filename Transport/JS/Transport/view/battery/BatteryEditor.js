T.view.BatteryEditor = Ext.extend(Kdn.editor.ModelEditor, {
   
   initComponent:function(){	   
	   T.view.BatteryEditor.superclass.initComponent.call(this);
	   
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
	   if(recordId=="BatteryTypeId" && !this.record){
	      var BatTypeStore = Kdn.ModelFactory.getStore('BatteryType');
	      var rec = BatTypeStore.getById(value);
	      
	      if(rec){
	         var source = this.getSource();
	         Ext.apply(source,{
	            Warrantly:rec.get('Warrantly'),
	            MhNorm: rec.get('MhNorm'),
	            KmNorm:rec.get('KmNorm'),
                InitKmWork: 0,
                InitMhWork:0,
	            MonthStart:0
	         });
	         this.setSource(source);
	         
	         
	        Ext.iterate(this.customEditors,function(i,v,o){	      
	            if (v.field && v.field.validate){
	                v.field.setValue(source[i]);
	                v.field.validate();
	            }
	        });
	         
	      }
	     
	   }
	}
   
});

Ext.reg('view.batteryeditor', T.view.BatteryEditor);