T.view.car.Norm = Ext.extend(Kdn.grid.LocalEditorGrid, {

    constructor: function(cfg) {
        cfg = cfg || {};
        
        Ext.apply(cfg, {
            viewConfig:{
                getRowClass: function(record, rowIndex, rp, ds){
                    var cls = 'notActual';
                    var now = new Date().clearTime();
                    
                    var startDate = record.get("StartDate") || now;
                    var endDate = record.get("EndDate") || now;

                    var isEnabled = startDate <= now && endDate >= now;
                    
                    return record.get('Enabled')? (isEnabled?'green':'red') :cls;
                }
            },
            colModel: new T.colModel.Norm(),
            store:Kdn.ModelFactory.getModel('Norm').buildStore({
               autoLoad:false,
               autoSave:false
            }),
            loadMask:true,
            region:'center',
            split:true,
            margins:'2 0 2 2'  ,
            listeners: {
                scope: this,
                beforeedit: this.onBeforeEditNorm
            }        
        });
        
        T.view.car.Norm.superclass.constructor.call(this, cfg);
    },

    onBeforeEditNorm: function(e) {
        switch (e.field) {
            case 'MainFuelId':
                {
                    var editor = e.grid.colModel.getCellEditor(e.column);
                    var editorStore = editor.field.store;
                    var fuelCount = e.record.data.NormFuels.length;
                    var fuelStore = Kdn.ModelFactory.getStore('Fuel');

                    editorStore.removeAll();

                    Ext.iterate(e.record.data.NormFuels, function(f) {
                        var fuel = fuelStore.getById(f);
                        if (fuel) editorStore.add(new editorStore.recordType(fuel.json));
                    });
                    break;
                }
        }

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
                     text: 'Клонировать',
                    iconCls: 'icon-page_copy',
                    handler: this.onClone,
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
    
    onClone:function() {
        var sel = this.getSelectionModel().getSelected();
        if (sel) {
            var clone = Kdn.clone(sel.data);
            clone.NormId = null;
            this.store.add(new this.store.recordType(clone));
        }
    }

});
Ext.reg('view.car.norm', T.view.car.Norm);