T.combo.MultiTireMoving = Ext.extend(Ext.net.MultiCombo, {
    initComponent: function () {
        Ext.apply(this, {
            valueType:'array',
            displayField: 'name',
            valueField: 'tire',
            triggerAction: 'all',
            mode: 'local',
            store: new Ext.data.JsonStore({
                autoDestroy:true,
                fields: ['id','tire','name']
            })
        });
        T.combo.MultiTireMoving.superclass.initComponent.call(this);
    },

    setValue: function (v) {
        if (v) {
            
				if (Ext.isObject(v)) {
				    v = [v];
				};

				var isArray = Ext.isArray(v);

				if (!isArray) v = this.normalizeStringValues(v);
            this.store.clearFilter();
            var values = isArray?v:(v.split(this.delimiter)),
                unselected = [];
            Ext.each(this.checkedRecords, function (r) {
                var found = false;
                Ext.each(values, function (value) {
                    if (r.get(this.valueField) == value) {
                        found = true;
                        return false;
                    }
                }, this);
                if (!found) {
                    unselected.push(r);
                }
            }, this);
            this.checkedRecords = [];
            Ext.each(unselected, function (r) {
                this.deselectRecord(r);
            }, this);
            this.store.each(function (r) {
                Ext.each(values, function (value) {
                    if (r.get(this.valueField).TireId == value.TireId) {
                        this.checkedRecords.push(r);
                        this.selectRecord(r);
                        return false;
                    }
                }, this);
            }, this);
            this.value = this.getValue();
            this.setRawValue(this.getText());
            if (this.hiddenField) {
                this.hiddenField.value = this.value;
            }
            if (this.el) {
                this.el.removeClass(this.emptyClass);
            }
            this.saveSelection();
        } else {
            this.clearValue();
        }
    },

    getValue: function (field) {

        var value = [];
        Ext.each(this.checkedRecords, function (record) {
            value.push(record.get(field || this.valueField));
        }, this);

        return this.valueType=='array'? value : (value.join(this.delimiter));
    }
});

Ext.reg('combo.multitiremoving', T.combo.MultiTireMoving);