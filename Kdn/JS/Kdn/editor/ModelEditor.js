
Kdn.editor.ModelEditor = Ext.extend(Kdn.editor.BaseModelEditor, {

    initComponent: function () {
        Ext.apply(this, {
            items: this.getItems(),
            tbar: this.getTbar()
        });
        Kdn.editor.ModelEditor.superclass.initComponent.call(this);
    },

    getItems: function () {
        var propCfg = this.grid.getEditorCfg();
        propCfg.xtype = 'kdn.grid.propertyeditor';
        return [Ext.create(propCfg)];
    },

    getTbar: function () {
        return [
	         { xtype: 'tbspacer', width: 10 },
	         '-',
	         { xtype: 'button.save' },
	         '-'
	      ]
    }

});

Ext.reg('kdn.editor.modeleditor', Kdn.editor.ModelEditor);
