Kdn.grid.CheckColumn = Ext.extend(Ext.grid.Column, {

    renderer: function(v, p, record) {
        p.css += ' x-grid3-check-col-td';
        return String.format('<div class="x-grid3-check-col{0}">&#160;</div>', v ? '-on' : '');
    },


    editor: { xtype: 'kdn.editor.booleanfield' },


    // Deprecate use as a plugin. Remove in 4.0
    init: Ext.emptyFn
});

Ext.reg('kdn.grid.checkcolumn', Kdn.grid.CheckColumn);