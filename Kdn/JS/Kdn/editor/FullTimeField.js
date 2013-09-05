﻿Kdn.editor.FullTimeField = Ext.extend(Ext.form.TimeField, {
    selectOnFocus: true,
    altFormats: "Hi|g:ia|g:iA|g:i a|g:i A|h:i|g:i|H:i|ga|ha|gA|h a|g a|g A|gi|hi|gia|hia|g|H|gi a|hi a|giA|hiA|gi A|hi A",
    enableKeyEvents: true,
    
    checkOnBlur:Ext.emptyFn,

    initComponent: function() {

        this.on({
            specialkey: function(field, e) {
                if (e.getKey() == e.ENTER) {
                    this.onEnter()
                }
            },
            scope: this
        });

        Kdn.editor.FullTimeField.superclass.initComponent.call(this);

    },

    onEnter: function() {
        var v = this.el.dom.value;
        var d = this.parseDate(v);
        if (Ext.isDate(d)) this.setValue(d);
    },
        
    assertValue : function(){
        
    }

});

Ext.reg('kdn.editor.fulltimefield', Kdn.editor.FullTimeField);