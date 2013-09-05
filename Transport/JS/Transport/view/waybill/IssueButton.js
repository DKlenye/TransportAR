T.view.waybill.IssueButton = Ext.extend(Ext.Button, {

   initComponent:function(){
      T.view.waybill.IssueButton.superclass.initComponent.call(this);
      this.on({
         single:true,
         afterrender:this.onAfterRender
      });
   },
   onAfterRender:function(){this.initFocus();}
});


Ext.override(T.view.waybill.IssueButton, {
    
    initFocus: function(){
    
        this.fi = this.fi || new Ext.a11y.Focusable(this.btnEl, null, null, this.el);
        this.fi.setComponent(this);
        
        this.mon(this.fi, {
            focus: this.onFocus,
            blur: this.onBlur,
            scope: this
        });        
    },
    
    focus: function(){
        this.fi.focus();
    },
    
    blur: function(){
        this.fi.blur();
    },
    
    onFocus: function(){
        if (!this.disabled) {
            this.el.addClass("x-btn-focus");
        }
    },
    
    onBlur: function(){
        this.el.removeClass("x-btn-focus");
    }
});


Ext.reg('view.waybill.issuebutton', T.view.waybill.IssueButton);