
Kdn.grid.PropertyEditor = Ext.extend(Kdn.grid.PropertyGrid, {   
   
   constructor:function(cfg){
      cfg=cfg||{};
      Ext.applyIf(cfg,{
         cls:'model-editor',
         region:'center',
         margins:'3'
      });
      
      this.addEvents('validate');            
      
      this.on({
          scope:this,          
          afterlayout:{fn:this.onAfterLayout,single:true},
          beforeedit:this.onBeforeEdit
      });
    
                    
      Kdn.grid.PropertyEditor.superclass.constructor.call(this,cfg);
   },
   
   onBeforeEdit: function(e) {
      var i = e.record.data.name;
      if (this.customRenderers[i] == Kdn.CheckRenderer) {
          this.setProperty(i, !this.getSource()[i]);
          this.stopEditing();
          return false;
      }
      
      if (i && this.customEditors[i] && this.customEditors[i].field.readOnly) return false;
    },
   
   onAfterLayout:function(){
      var me = this,
         mc = Ext.util.MixedCollection;
      
      Ext.apply(me,{
         editorMap:new mc(),
         errors:new mc(),
         monitor:false
      });

      Ext.iterate(me.customEditors, function(key, e) {      
         me.editorMap.add(e.field.id, key);
            e.field.on('invalid', me.onFieldValidation, me);
            e.field.on('valid', me.onFieldValidation, me);
        });
        
   },
   
   startMonitoring:function(){
      this.monitor = true;      
   },
   stopMonitoring:function(){
      this.monitor = false;
   },
   
   onFieldValidation: function(f, msg) {
   
        if (!this.monitor) return false;
        
        var err = this.errors;
        
        if (msg) {
            var m = String.format("<b>{0}<b> -{1}",
               this.propertyNames[this.editorMap.get(f.id)],
               msg
            );
            
            var item = err.get(f.id);
            if (item && item.msg==m) return false;
            err.add(f.id, { errorKey: f.id, msg: m});
            
        } else {
            if (!err.containsKey(f.id)) return false;
            err.removeKey(f.id);
        }
                        
        this.fireEvent('validate',{editorKey:this.id,editor:this,errors:err.items});                                
   },
   
   
   fillEditor:function(record){
      var me = this,
      editors = me.customEditors;

      Ext.iterate(me.getSource(), function(name){   
         var editor = editors[name];     
         if (record){
                        
            var val;
               if(record['data']) val = record.data[name];
               //В качестве источника данных может быть не запись(Ext.data.Record) а просто объект
               else val = record[name];
            me.setProperty(name, val);
            if(editor){
               editor.field.setValue(val);
            }  
         }
         if (editor){           
            editor.field.validate();
         }
      }); 
   },
   
   commitChanges:function(record){      
      var source = this.getSource(), 
          isRecord = (!!record.data),
          recordFn = function(key,val){
            if (record.fields.containsKey(key)){
               record.set(key,val);
            }
          },
          objectFn = function(key,val){record[key]=val};
          
     Ext.iterate(source,(isRecord?recordFn:objectFn));
      
   },
   
   
   displayInvalid:function(errorKey){
      var dataIndex = this.editorMap.get(errorKey);   
      this.startEditing(this.store.indexOfId(dataIndex),1);
   }
      

});

Ext.reg('kdn.grid.propertyeditor', Kdn.grid.PropertyEditor);
