Kdn.form.DateTimeField = Ext.extend(Ext.ux.form.DateTime, {

    constructor: function (cfg) {
        cfg = cfg || {};
        Ext.applyIf(cfg, {
            hiddenFormat : 'Y-m-d H:i:s',
            timePosition : 'right',
            dateFormat : 'd.m.Y',
            timeFormat : 'H:i',
            selectOnFocus : true
            
        });
    
        Kdn.form.DateTimeField.superclass.constructor.call(this,cfg);
    }
     
});

Ext.reg('datetimefield', Kdn.form.DateTimeField);