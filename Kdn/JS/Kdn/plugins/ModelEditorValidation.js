
Ext.ux.PropertyValidationStatus = Ext.extend(Ext.Component, {
    errorIconCls: 'x-status-error',
    errorListCls: 'x-status-error-list',
    validIconCls: 'x-status-valid',
    showText: 'Ошибка (щелкните по тексту для просмтора ошибок...)',
    hideText: '...',
    submitText: 'Сохранение данных...',

    // private
    init: function(sb) {

        sb.on('afterrender', function() {
            this.statusBar = sb;
            this.monitor = true;
            this.errors = new Ext.util.MixedCollection();
            this.listAlign = (sb.statusAlign == 'right' ? 'br-tr?' : 'bl-tl?');

        }, this, { single: true });

        sb.on({
            scope: this,
            afterlayout: {
                single: true,
                fn: function() {
                    // Grab the statusEl after the first layout.
                    sb.statusEl.getEl().on('click', this.onStatusClick, this, { buffer: 100 });
                    this.startMonitoring();
                }
            },
            beforedestroy: {
                single: true,
                fn: this.onDestroy
            }
        });
    },

    // private
    startMonitoring: function() {

        this.editorMap = new Ext.util.MixedCollection();

        Ext.iterate(this.propertyGrid.customEditors, function(key, e) {

            this.editorMap.add(e.field.id, key);

            e.field.on('invalid', this.onFieldValidation, this);
            e.field.on('valid', this.onFieldValidation, this);
        }, this);

    },

    // private
    stopMonitoring: function() {
        Ext.iterate(this.propertyGrid.customEditors, function(key, e) {
            e.field.un('invalid', this.onFieldValidation, this);
            e.field.un('valid', this.onFieldValidation, this);
        }, this);
    },

    // private
    onDestroy: function() {
        this.stopMonitoring();
        this.hideErrors();
        this.statusBar.statusEl.un('click', this.onStatusClick, this);
        Ext.ux.PropertyValidationStatus.superclass.onDestroy.call(this);
    },

    // private
    onFieldValidation: function(f, msg) {
        if (!this.monitor) {
            return false;
        }
        if (msg) {
            this.errors.add(f.id, { field: f, msg: "<b>"+this.propertyGrid.propertyNames[this.editorMap.get(f.id)] + "</b> -" + msg });
        } else {
            this.errors.removeKey(f.id);
        }
        this.updateErrorList();
        if (this.errors.getCount() > 0) {
            if (this.statusBar.getText() != this.showText) {
                this.statusBar.setStatus({ text: this.showText, iconCls: this.errorIconCls });
            }
            this.propertyGrid.onInvalid();
        } else {
            this.statusBar.clearStatus().setIcon(this.validIconCls);
            this.propertyGrid.onValid();
        }
    },

    // private
    updateErrorList: function() {
        if (this.errors.getCount() > 0) {
            var msg = '<ul>';
            this.errors.each(function(err) {
                msg += ('<li id="x-err-' + err.field.id + '"><a href="#">' + err.msg + '</a></li>');
            }, this);
            this.getMsgEl().update(msg + '</ul>');
        } else {
            this.getMsgEl().update('');
        }
    },

    // private
    getMsgEl: function() {
        if (!this.msgEl) {
            this.msgEl = Ext.DomHelper.append(Ext.getBody(), {
                cls: this.errorListCls + ' x-hide-offsets'
            }, true);

            this.msgEl.on('click', function(e) {
                var t = e.getTarget('li', 10, true);
                if (t) {
                    var id = this.editorMap.get(t.id.split('x-err-')[1]);
                    this.hideErrors();
                    this.propertyGrid.startEditing(this.propertyGrid.store.indexOfId(id),1);
                }
            }, this, { stopEvent: true }); // prevent anchor click navigation
        }
        return this.msgEl;
    },

    // private
    showErrors: function() {
        this.updateErrorList();
        this.getMsgEl().alignTo(this.statusBar.getEl(), this.listAlign).show();
        this.statusBar.setText(this.hideText);
        this.propertyGrid.getEl().on('click', this.hideErrors, this, { single: true }); // hide if the user clicks directly into the form
    },

    // private
    hideErrors: function() {
        var el = this.getMsgEl();
        if (el.isVisible()) {
            // el.slideOut('b', {duration:0.2, easing:'easeIn'});
            el.hide();
            this.statusBar.setText(this.showText);
        }
        this.propertyGrid.getEl().un('click', this.hideErrors, this);
    },

    // private
    onStatusClick: function() {
        if (this.getMsgEl().isVisible()) {
            this.hideErrors();
        } else if (this.errors.getCount() > 0) {
            this.showErrors();
        }
    }
});