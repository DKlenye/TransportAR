Kdn.editor.BooleanField = Ext.extend(Ext.form.ComboBox, {
    typeAhead: true,
    triggerAction: 'all',
    lazyRender: true,
    mode: 'local',
    store: new Ext.data.ArrayStore({
        id: 0,
        fields: [
                'id',
                'val'
            ],
        data: [[true, 'Да'], [false, 'Нет']]
    }),
    valueField: 'id',
    displayField: 'val',
    editable:false,
    allowBlank:false
});

Ext.reg('kdn.editor.booleanfield', Kdn.editor.BooleanField);
