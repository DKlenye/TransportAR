T.combo.TireSeason = Ext.extend(Kdn.form.ComboBox, {
    initComponent: function() {
        Ext.applyIf(this, {
            displayField: 'text',
            valueField: 'id',
            store: new Ext.data.ArrayStore({
               fields: ['id','text'],
               data: [['all','Всесезонная'],['summer','Летняя'],['winter','Зимняя']]          
            })
        });
        
        T.combo.TireSeason.superclass.initComponent.call(this);
    }
});

Ext.reg('combo.tireseason', T.combo.TireSeason);