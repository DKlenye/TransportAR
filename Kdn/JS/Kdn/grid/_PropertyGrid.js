﻿
Kdn.grid.PropertyRecord = Ext.data.Record.create([
    { name: 'name', type: 'string' }, 'value'
]);


    Kdn.grid.PropertyStore = Ext.extend(Ext.util.Observable, {

        constructor: function(grid, source) {
            this.grid = grid;
            this.store = new Ext.data.Store({
                recordType: Kdn.grid.PropertyRecord
            });
            this.store.on('update', this.onUpdate, this);
            if (source) {
                this.setSource(source);
            }
            Ext.grid.PropertyStore.superclass.constructor.call(this);
        },

        // protected - should only be called by the grid.  Use grid.setSource instead.
        setSource: function(o) {
            this.source = o;
            this.store.removeAll();
            var data = [];
            for (var k in o) {
                if (this.isEditableValue(o[k])) {
                    data.push(new Kdn.grid.PropertyRecord({ name: k, value: o[k] }, k));
                }
            }
            this.store.loadRecords({ records: data }, {}, true);
        },

        // private
        onUpdate: function(ds, record, type) {
            if (type == Ext.data.Record.EDIT) {
                var v = record.data.value;
                var oldValue = record.modified.value;
                if (this.grid.fireEvent('beforepropertychange', this.source, record.id, v, oldValue) !== false) {
                    this.source[record.id] = v;
                    record.commit();
                    this.grid.fireEvent('propertychange', this.source, record.id, v, oldValue);
                } else {
                    record.reject();
                }
            }
        },

        // private
        getProperty: function(row) {
            return this.store.getAt(row);
        },

        // private
        isEditableValue: function(val) {
            return true; //Ext.isPrimitive(val) || Ext.isDate(val) || Ext.isObject(val);
        },

        // private
        setValue: function(prop, value, create) {
            var r = this.getRec(prop);
            if (r) {
                r.set('value', value);
                this.source[prop] = value;
            } else if (create) {
                // only create if specified.
                this.source[prop] = value;
                r = new Ext.grid.PropertyRecord({ name: prop, value: value }, prop);
                this.store.add(r);

            }
        },

        // private
        remove: function(prop) {
            var r = this.getRec(prop);
            if (r) {
                this.store.remove(r);
                delete this.source[prop];
            }
        },

        // private
        getRec: function(prop) {
            return this.store.getById(prop);
        },

        // protected - should only be called by the grid.  Use grid.getSource instead.
        getSource: function() {
            return this.source;
        }
    });




Kdn.grid.PropertyColumnModel = Ext.extend(Ext.grid.ColumnModel, {

    nameText: 'Наименование поля',
    valueText: 'Значение',
    dateFormat: 'd.m.Y',
    trueText: 'Да',
    falseText: 'Нет',

    constructor: function(grid, store) {
        var g = Ext.grid,
	        f = Ext.form; 

        this.grid = grid;
        Kdn.grid.PropertyColumnModel.superclass.constructor.call(this, [
	        { header: this.nameText, width: 40, sortable: false, dataIndex: 'name', id: 'name', menuDisabled: true },
	        { header: this.valueText, width: 60, sortable: false, resizable: false, dataIndex: 'value', id: 'value', menuDisabled: true }
	    ]);
        this.store = store;

        var bfield = new f.Field({
            autoCreate: { tag: 'select', children: [
	            { tag: 'option', value: 'true', html: this.trueText },
	            { tag: 'option', value: 'false', html: this.falseText }
	        ]
            },
            getValue: function() {
                return this.el.dom.value == 'true';
            }
        });
        this.editors = {
            'date': new g.GridEditor(new f.DateField({ selectOnFocus: true })),
            'string': new g.GridEditor(new f.TextField({ selectOnFocus: true })),
            'number': new g.GridEditor(new f.NumberField({ selectOnFocus: true, style: 'text-align:left;' })),
            'boolean': new g.GridEditor(bfield, {
                autoSize: 'both'
            })
        };
        this.renderCellDelegate = this.renderCell.createDelegate(this);
        this.renderPropDelegate = this.renderProp.createDelegate(this);
    },

    // private
    renderDate: function(dateVal) {
        return dateVal.dateFormat(this.dateFormat);
    },

    // private
    renderBool: function(bVal) {
        return this[bVal ? 'trueText' : 'falseText'];
    },

    // private
    isCellEditable: function(colIndex, rowIndex) {
        return colIndex == 1;
    },

    // private
    getRenderer: function(col) {
        return col == 1 ?
            this.renderCellDelegate : this.renderPropDelegate;
    },

    // private
    renderProp: function(v) {
        return this.getPropertyName(v);
    },

    // private
    renderCell: function(val, meta, rec) {
        var renderer = this.grid.customRenderers[rec.get('name')];
        if (renderer) {
            return renderer.apply(this, arguments);
        }
        var rv = val; 
        if (Ext.isDate(val)) {
            rv = this.renderDate(val);
        } else if (typeof val == 'boolean') {
            rv = this.renderBool(val);
        }
        return Ext.util.Format.htmlEncode(rv);
    },

    // private
    getPropertyName: function(name) {
        var pn = this.grid.propertyNames;
        return pn && pn[name] ? pn[name] : name;
    },

    // private
    getCellEditor: function(colIndex, rowIndex) {
        var p = this.store.getProperty(rowIndex),
            n = p.data.name,
            val = p.data.value;
        if (this.grid.customEditors[n]) {
            return this.grid.customEditors[n];
        }
        if (Ext.isDate(val)) {
            return this.editors.date;
        } else if (typeof val == 'number') {
            return this.editors.number;
        } else if (typeof val == 'boolean') {
            return this.editors['boolean'];
        } else {
            return this.editors.string;
        }
    },

    // inherit docs
    destroy: function() {
        Ext.grid.PropertyColumnModel.superclass.destroy.call(this);
        this.destroyEditors(this.editors);
        this.destroyEditors(this.grid.customEditors);
    },

    destroyEditors: function(editors) {
        for (var ed in editors) {
            Ext.destroy(editors[ed]);
        }
    }
});


Kdn.grid.PropertyGrid = Ext.extend(Kdn.grid.EditorGridPanel, {


    // private config overrides
    enableColumnMove: false,
    stripeRows: false,
    trackMouseOver: false,
    clicksToEdit: 1,
    enableHdMenu: false,
    viewConfig: {
        forceFit: true
    },

    // private
    initComponent: function() {
        this.customRenderers = this.customRenderers || {};
        this.customEditors = this.customEditors || {};
        this.lastEditRow = null;
        var store = new Kdn.grid.PropertyStore(this);
        this.propStore = store;
        var cm = new Kdn.grid.PropertyColumnModel(this, store);
        
        this.addEvents(
            'beforepropertychange',
            'propertychange'
        );
        this.cm = cm;
        this.ds = store.store;
        Kdn.grid.PropertyGrid.superclass.initComponent.call(this);

        this.mon(this.selModel, 'beforecellselect', function(sm, rowIndex, colIndex) {
            if (colIndex === 0) {
                this.startEditing.defer(200, this, [rowIndex, 1]);
                return false;
            }
        }, this);
    },

    // private
    onRender: function() {
        Kdn.grid.PropertyGrid.superclass.onRender.apply(this, arguments);
        this.getGridEl().addClass('x-props-grid');
    },

    // private
    afterRender: function() {
        Kdn.grid.PropertyGrid.superclass.afterRender.apply(this, arguments);
        if (this.source) {
            this.setSource(this.source);
        }
    },


    setSource: function(source) {
        this.propStore.setSource(source);
    },


    getSource: function() {
        return this.propStore.getSource();
    },


    setProperty: function(prop, value, create) {
        this.propStore.setValue(prop, value, create);
    },


    removeProperty: function(prop) {
        this.propStore.remove(prop);
    }


});

Ext.reg("kdn.grid.propertygrid", Kdn.grid.PropertyGrid);
