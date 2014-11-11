Kdn.form.ComboBox = Ext.extend(Ext.form.ComboBox, {

    constructor: function(cfg)
    {
        cfg = cfg || {};
        Ext.applyIf(cfg, {
            isCombo: true,
            objectValue: true,
            triggerAction: "all",
            mode: "local",
            forceSelection: true,
            selectOnFocus: true,
            allowBlank: true,
            resizable: true,
            autoScroll: true,
            enableClear: false,
            editable: false
        });


        var listeners = cfg.listeners || {};

        if (cfg.enableClear)
        {

            listeners.triggerclick = {
                fn: function(item, trigger, index, tag, e)
                {
                    this.clearValue();
                    this.fireEvent('select',this,null);
                }
            }

            Ext.apply(cfg, {
                triggersConfig: [{ iconCls: "x-form-clear-trigger", qtip: "Очистить"}],
                listeners: listeners
            });
        }

        if (cfg.objectValue)
        {

            Ext.apply(this, {

                getValue: function()
                {
                    var val = Kdn.form.ComboBox.superclass.getValue.call(this);
                    return (val == "" ? null : val);

                },
                
                
                
                setValue: function(v)
                {
                
                    var text = '',
                            val = {}

                    if (this.valueField && v)
                    {

                        var id = Ext.isObject(v) ? v[this.valueField] : v;
                        var r = this.findRecord(this.valueField, id);
                        if (r)
                        {
                            text = r.data[this.displayField];
                            val = r.data;
                        } else if (Ext.isDefined(this.valueNotFoundText))
                        {
                            text = this.valueNotFoundText;
                        }
                    }
                    this.lastSelectionText = text;
                    if (this.hiddenField)
                    {
                        this.hiddenField.value = val;
                    }
                    Ext.form.ComboBox.superclass.setValue.call(this, text);
                    this.value = val;
                    return this;
                }                                
            })
    }

    Kdn.form.ComboBox.superclass.constructor.call(this, cfg);
}

});

Ext.reg('kdn.form.combobox', Kdn.form.ComboBox);