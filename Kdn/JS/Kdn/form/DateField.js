Kdn.form.DateField = Ext.extend(Ext.form.DateField, {
    initComponent: function() {

        Ext.apply(this, {
            format: 'd.m.Y',
            editable:true,
            selectOnFocus:true,
            triggersConfig: [
			  { iconCls: "x-form-left-trigger", qtip: 'предыдущий день' },
			  { iconCls: "x-form-right-trigger", qtip: 'следующий день' }
			],
            listeners: {
                triggerclick: {
                    fn: function(item, trigger, index, tag, e) {
                        this.setNext(index);                       
                    }
                }
            }
        });

        Kdn.form.DateField.superclass.initComponent.call(this);

    },
    
   initEvents: function() {
        Ext.form.DateField.superclass.initEvents.call(this);
        this.keyNav = new Ext.KeyNav(this.el, {
            "down": function(e) {
                
            },
            "pageUp":function(e){
              this.setNext(1);
             // this.focus.defer(this,20,[true]);
            },
            "pageDown":function(){
               this.setNext(-1);
              // this.focus.defer(this,20,[true]);
            },
            scope: this,
            forceKeyDown: true
        });
    },

    setNext:function(direction){
        var d = this.getValue(),
        _d =d? d.add(Date.DAY, direction || -1):new Date();
        this.setValue(_d);
        this.fireEvent('select', this, _d);
    }

});

Ext.reg('kdn.form.datefield', Kdn.form.DateField);