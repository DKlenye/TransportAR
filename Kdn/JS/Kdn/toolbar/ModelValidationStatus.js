Kdn.toolbar.ModelValidationStatus = Ext.extend(Ext.ux.StatusBar,{
   
   defaultText:'Готово',
   
   busyText : 'Загрузка',
      
   errorIconCls: 'x-status-error',
   errorListCls: 'x-status-error-list',
   validIconCls: 'x-status-valid',
   showText: 'Ошибка (щелкните по тексту для просмтора ошибок...)',
   hideText: '...',
   submitText: 'Сохранение данных...',
   
   isValid:true,
   
   initComponent: function(){
    
      Ext.apply(this,{
         errors: new Ext.util.MixedCollection(),
         monitor:true,
         listAlign:(this.statusAlign == 'right' ? 'br-tr?' : 'bl-tl?')
      });
                                                   
      this.on({
            scope: this,
            afterlayout: {
                single: true,
                fn: function() {
                    this.statusEl.getEl().on('click', this.onStatusClick, this, { buffer: 100 });
                }
            },
            beforedestroy: {
                single: true,
                fn: this.onDestroy
            }            
        });         
             
      this.addEvents('validchange');
        
      Kdn.toolbar.ModelValidationStatus.superclass.initComponent.call(this);
   },
   
   
   onEditorFind:function(editor){
      this.editor = editor;     
      this.startMonitoring();       
   },  
   
   askValid:function(){
        var me = this, e = me.editor;
        Ext.iterate(e.editors,function(o){
            console.log(e);
        });
        
   },
      
   startMonitoring:function(){
     var me = this, e = me.editor, fn='startMonitoring';
     this.clearStatus().setIcon(this.validIconCls);
     Ext.iterate(e.editors,function(o){     
         o.on({
           'validate':me.onValidate,
           'scope':me 
         });
         if(o[fn])o[fn]();  
     });           
   },  
         
   stopMonitoring:function(){
     var me = this, e = me.editor, fn='stopMonitoring';    
     Ext.iterate(e.editors,function(o){              
         o.un('validate',me.onValidate,me);
         if(o[fn])o[fn](); 
     }); 
   },
   
   onValidate:function(error){       
      this.errors.add(error.editorKey,error);    
      this.updateErrorList();
   },
   
   
   updateErrorList: function() {   
      var msgTemplate = '<li class="{0} {1}"><a href="#">{2}</a></li>',
         a=[];
         
         this.errors.each(function(Editor){
            Ext.iterate(Editor.errors,function(o){
               a.push(String.format(msgTemplate,Editor.editorKey,o.errorKey,o.msg));
            });
         });
        
   
         if (a.length==0) {            
            this.getMsgEl().update('');
            this.setValid();
         }
         else{         
            this.getMsgEl().update('<ul>'+a.join('')+'</ul>');
            this.setInvalid();
         }
    },   
   
   setValid:function(){
     this.isValid = true;
     this.clearStatus().setIcon(this.validIconCls);
     this.fireEvent('validchange',true);
   },
   
   setInvalid:function(){
       this.isValid = false;
       this.setStatus({ text: this.showText, iconCls: this.errorIconCls });
       this.fireEvent('validchange',false);
   },   
   
    // private
    getMsgEl: function() {
        if (!this.msgEl) {
        
            this.msgEl = Ext.DomHelper.append(Ext.getBody(), {
                cls: this.errorListCls + ' x-hide-offsets'
            }, true);

            this.msgEl.on('click',this.onMessageClick,this,{ stopEvent: true }); // prevent anchor click navigation
        }
        return this.msgEl;
    },
    
    
    onMessageClick:function(e){    
      var t = e.getTarget('li', 10, true);
         if (t) {
            var fn='displayInvalid',
               key = t.dom.className.split(' '),
               editorKey = key[0],
               errorKey = key[1],
               error = this.errors.get(editorKey);
               if (error && error.editor[fn]) error.editor[fn](errorKey);
            this.hideErrors();
         }     
    },
    

    // private
    showErrors: function() {
        this.getMsgEl().alignTo(this.getEl(), this.listAlign).show();
        this.setText(this.hideText);
        this.editor.getEl().on('click', this.hideErrors, this, { single: true }); // hide if the user clicks directly into the form
    },

    // private
    hideErrors: function() {
        var el = this.getMsgEl();
        if (el.isVisible()) {
            // el.slideOut('b', {duration:0.2, easing:'easeIn'});
            el.hide();
            this.setText(this.showText);
        }
        this.editor.getEl().un('click', this.hideErrors, this);
    },

    // private
    onStatusClick: function() {
    
        if (this.getMsgEl().isVisible()) {
            this.hideErrors();
        } else if (!this.isValid) {
            this.showErrors();
        }
    },
        
    onDestroy:function(){    
      this.stopMonitoring();   
      if (this.msgEl) this.msgEl.remove();
      this.statusEl.getEl().un('click', this.onStatusClick, this);
      
      Kdn.toolbar.ModelValidationStatus.superclass.onDestroy.call(this);
    }
   
   
});