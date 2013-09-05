Kdn.view.BaseEditorGrid = Ext.extend(Ext.grid.EditorGridPanel, {
    
    initComponent: function() {

            Ext.applyIf(this, {
                clicksToEdit: 1,
                selModel: new Ext.grid.RowSelectionModel({
                    singleSelect: false,
                    moveEditorOnEnter: false
                }),
                tbar: this._getTbar()
            });


            Ext.apply(this, {            
                columnLines: true,
                stripeRows: true,
                trackMouseOver: false,
                loadMask: true,
                keys: [
                        {
                            key: 'a',
                            ctrl: true,
                            stopEvent: true,
                            handler: function() {
                                this.getSelectionModel().selectAll();
                            },
                            scope: this
                        },
                        {
                            key: Ext.EventObject.DELETE,
                            stopEvent: true,
                            handler: this.onDelete,
                            scope: this
                        },
                        {
                            key: Ext.EventObject.INSERT,
                            stopEvent: true,
                            handler: this.onAdd,
                            scope: this
                        }
                    ]
            });


    this.mon(this.getSelectionModel(), {
        selectionchange: this.onSelectionChange,
        scope: this
    });


    Kdn.view.BaseEditorGrid.superclass.initComponent.call(this);
},

_getTbar: function() {
    return [
            {
                xtype: 'tbspacer',
                width: 10
            },
            '-',
            {
                text: 'Добавить',
                iconCls: 'icon-add',
                handler: this.onAdd,
                scope: this,
                cls: 'add_btn'
            },
            '-',
            {
                text: 'Удалить',
                iconCls: 'icon-delete',
                handler: this.onDelete,
                scope: this,
                cls: 'delete_btn',
                disabled: true
            },
            '-'
        ]
},


onSelectionChange: function() {

    var s = this.getSelectionModel().getSelections().length,
            del = this.getByCssClass('delete_btn');

    del.setDisabled(s == 0);
    del.setIconClass(s > 1 ? 'icon-table_delete' : 'icon-delete');

},


onAdd: function() {
    var r = Kdn.data.ModelFactory.prototype.applyDefaults(new this.store.recordType({}));
    this.stopEditing();
    this.store.insert(0, r);
    this.startEditing(0, 0);
},


onDelete: function() {    
    var sel = this.getSelectionModel().getSelections();
    Ext.iterate(sel, function(rec)
    {
        this.store.remove(rec);
    }, this);
},


getByCssClass: function(cls) {
    var el = this.getEl().query('.' + cls);
    if (el.length > 0) {
        return Ext.getCmp(el[0].id);
    }
    return null;
}


});