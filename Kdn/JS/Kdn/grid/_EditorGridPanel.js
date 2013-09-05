Kdn.grid.EditorGridPanel = Ext.extend(Ext.grid.EditorGridPanel, {
    forceValidation: true,    
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
    }
});

Ext.reg('kdn.editorgrid', Kdn.grid.EditorGridPanel);