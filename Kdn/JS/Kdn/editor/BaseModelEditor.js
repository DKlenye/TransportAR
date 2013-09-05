
//Базовый класс для редактирования записи
Kdn.editor.BaseModelEditor = Ext.extend(Kdn.app.TabItem, {
   
   requireModels:'',
   
   closeAfterSave:true,
	records:null,
	editors:null,
	isModified:false,
	
	constructor:function(cfg){	
		
		var validation = new Kdn.toolbar.ModelValidationStatus({
         editor:this,
         statusAlign: 'right'
      });
		
		this.validation = validation;
		
		cfg=cfg||{};		
		Ext.applyIf(cfg,{
		   bbar: validation
		});
		
		validation.on('validchange',this.onValidateChange,this);
				
		//Событие когда все редакторы найдены и готовы к работе
		this.addEvents('editorfind');
						
		this.on({		 
		   scope:validation,
		   deactivate:validation.hideErrors,		      
		   editorfind:validation.onEditorFind //Когда найдены редакторы валидатор может начинать работу
		});
		
		Kdn.editor.BaseModelEditor.superclass.constructor.call(this,cfg);
	},
	
	initComponent:function(){
		this.on('afterlayout',this.onAfterRender,this,{single:true});
		Kdn.editor.BaseModelEditor.superclass.initComponent.call(this);
	},	
	
	onAfterRender:function(){
	   
	   var me = this,
         records = me.records || [];      
         me.record = records.shift();	
	    
	    if(me.clone){	        
	        var idProp = me.record.store.reader.meta.idProperty;
	        me.record = me.record.copy(-1);
	        me.record.set(idProp,null);	        
	    }	    
	    
	    	    
		this.findEditors();
		this.fireEvent('editorfind',this);
		this.findSaveButton();
		this.fillEditor();
		
		if(me.clone){
		   me.record=null; 
		} 
			
		
	},
	
	findEditors:function(){
		var editorCls = '.model-editor',
			me = this,
			a =[],
			el = me.getEl().query(editorCls);		
										
		Ext.iterate(el,function(e){
			a.push(Ext.getCmp(e.id));
		});	
		me.editors = a;
    },
    
    findSaveButton:function(){
      var b = this.getEl().query('.save-button');
      if(b.length>0){
         this.SaveButton = Ext.getCmp(b[0].id);
         this.SaveButton.on('click',this.onSave,this);
      }
    },
	
	onSave:function(){
	  this.commitChanges(); 
	},	
	
	setModified:function(flag){
		this.isModified = (!!flag);
	},	
	
	getFillRecord:function(){
	  return this.record;	   
	},
	
	fillEditor:function(record){
		var fillRecord = record || this.getFillRecord(),
         fillFn = 'fillEditor';
                 
      Ext.iterate(this.editors,function(e){
		   if(e[fillFn]) e[fillFn](fillRecord);
		});          
	},		
	
	commitChanges:	function(){
      var me = this,
         record = this.getFillRecord(),
         store = me.grid.store,
         commitFn = 'commitChanges';

         debugger;
    
         record = record || new store.recordType();
         record.beginEdit();
         Ext.iterate(me.editors,function(e){
	         if (e[commitFn]) e[commitFn](record)
	      });
         record.endEdit();
         if (!record['store']) store.insert(0, record);
         
         me.record = record;
         
      if (me.closeAfterSave) me.closeMe();
	},
	
	rejectChanges:	Ext.emptyFn,
	
	closeMe: function(){
	   Kdn.Application.viewTab.remove(this);
	},
	
	onValidateChange:function(isValid){
	   this.SaveButton.setDisabled(!isValid);
	}

});

Ext.reg('kdn.editor.basemodeleditor', Kdn.editor.BaseModelEditor);
