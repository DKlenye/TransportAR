Kdn.grid.LocalEditorGrid = Ext.extend(Ext.grid.EditorGridPanel, {
    forceValidation: true,
    constructor: function(cfg)
    {
        cfg = cfg || {};

        Ext.applyIf(cfg, {
            clicksToEdit: 1,
            columnLines: true,
            stripeRows: true,
            tbar: this.getTbar(),
            selModel : new Ext.grid.RowSelectionModel()
        });

        Kdn.grid.LocalEditorGrid.superclass.constructor.call(this, cfg);

    },


    getTbar: function()
    {
        return [
                '-',
                {
                    xtype: 'button.add',
                    cls:'addbtn',
                    handler: this.onAdd,
                    scope: this
                },
                '-',
                {
                    xtype: 'button.remove',
                    cls:'removebtn',
                    handler: this.onRemove,
                    scope: this
                },
                '-'
            ]
    },

    onAdd: function(btn, ev)
    {
        var r = new this.store.recordType({}).applyDefaults();
        this.stopEditing();
        this.store.insert(0, r);
        this.startEditing(0, 0);
    },

    onRemove: function(btn, ev)
    {
        var sel = this.getSelectionModel().getSelected();
        if (!sel)
        {
            return false;
        }
        this.store.remove(sel);
    },

    onEditComplete: function(ed, value, startValue)
    {

        this.editing = false;
        this.lastActiveEditor = this.activeEditor;
        this.activeEditor = null;

        var r = ed.record,
            field = this.colModel.getDataIndex(ed.col);
        value = this.postEditValue(value, startValue, r, field);
        if (this.forceValidation === true || String(value) !== String(startValue))
        {
            var e = {
                grid: this,
                record: r,
                field: field,
                originalValue: startValue,
                value: value,
                row: ed.row,
                column: ed.col,
                cancel: false
            };
            if (this.fireEvent("validateedit", e) !== false && !e.cancel)
            {
                r.set(field, e.value);
                delete e.cancel;
                this.fireEvent("afteredit", e);
            }
        }
        this.view.focusCell(ed.row, ed.col);
    },

    getJson: function()
    {
        var s = this.store,
            w = s.writer,
            a = [];

        s.data.each(function(r)
        {
            a.push(w.toHash(r));
        });

        return a;

    }

});