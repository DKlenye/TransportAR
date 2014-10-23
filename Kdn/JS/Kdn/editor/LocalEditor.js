
// класс для редактирования частей записи
Kdn.editor.ModelPartEditor = Ext.extend(Object, {

	record:null,
	editors:null,
	isModified:false,
	
	constructor:function(cfg){	
		cfg=cfg||{};
		Ext.apply(cfg,{
			cls:'model-editor'
		});
		Kdn.editor.ModelPartEditor.superclass.constructor.call(this,cfg);
	},
	
	fillEditor:function(record){
		
	}

});