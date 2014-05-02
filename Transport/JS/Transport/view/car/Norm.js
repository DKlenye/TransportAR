T.view.car.NormGrid = Ext.extend(Kdn.grid.LocalEditorGrid, {

    constructor: function(cfg) {
        cfg = cfg || {};

        this.cloneFn = cfg.cloneFn;
        
        Ext.apply(cfg, {
            viewConfig:{
                getRowClass: function(record, rowIndex, rp, ds){
                    var cls = 'notActual';
                    var now = new Date().clearTime();
                    
                    var startDate = record.get("StartDate") || now;
                    var endDate = record.get("EndDate") || now;

                    var isEnabled = startDate <= now && endDate >= now;
                    var isFuture = startDate > now;
                    
                    return record.get('Enabled')? (isEnabled?'green':(isFuture?'yellow':'red')) :cls;
                }
            },
            colModel: new T.colModel.Norm({increaseRenderer:cfg.increaseRenderer}),
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

        T.view.car.NormGrid.superclass.constructor.call(this, cfg);
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
                    handler: this.cloneFn,
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
Ext.reg('view.car.normgrid', T.view.car.NormGrid);


T.view.car.NormIncreaseGrig = Ext.extend(Kdn.grid.LocalEditorGrid, {

    constructor:function(cfg) {

        var emptyStore = Kdn.ModelFactory.getModel('NormIncrease').buildStore({
            autoLoad: false,
            autoSave: false
        });
        
        Ext.apply(cfg, {
            title: 'Надбавки',
            width: 400,
            collapsible: true,
            region: 'east',
            split: true,
            margins: '2 2 2 0',
            plugins: [Ext.ux.PanelCollapsedTitle],
            store: emptyStore,
            emptyStore:emptyStore,
            colModel: new Ext.grid.ColumnModel({
                columns: [
                    {
                        dataIndex: 'IncreaseId',
                        editor: { xtype: 'combo.increase', listWidth:300, objectValue: false },
                        renderer: function(v) {
                            if (!v) return v;
                            var store = Kdn.ModelFactory.getStore('Increase'),
                            rec = store.getById(v);
                            if (rec) return rec.get('IncreaseName');
                            return null;
                        },
                        header: 'Наименование',
                        width: 150
                    },
                    {
                        dataIndex: 'Prcn',
                        align:'center',
                        header: 'Процент',
                        editor: {
                            xtype: 'kdn.editor.numberfield'  
                        },
                        width: 70
                    },
                    {
                        dataIndex: 'Const',
                        header: 'Постоянная',
                         xtype:'checkcolumn',
                        width: 90
                    },
                    {
                        dataIndex: 'Force',
                        header: 'Автомат.',
                         xtype:'checkcolumn',
                        width: 70
                    }
                ]
            })
        });
        T.view.car.NormIncreaseGrig.superclass.constructor.call(this, cfg);
    }
   
});
Ext.reg('view.car.normincreasegrig', T.view.car.NormIncreaseGrig);


T.view.car.Norm = Ext.extend(Ext.Panel, {
    constructor: function(cfg) {

        var normGrid = Ext.create(
        {
            xtype: 'view.car.normgrid',
            increaseRenderer: this.IncreaseRenderer.createDelegate(this),
            cloneFn: this.cloneFn.createDelegate(this)
        });
        var increaseGrid = Ext.create({ xtype: 'view.car.normincreasegrig' });

        normGrid.store.on({
            load: this.onNormsLoad,
            add : this.onNormAdd,
            remove: this.onNormRemove,
            write: this.onNormWrite,
            scope: this
        });

        increaseGrid.on({
            afterrender: this.onAfterNormGridRender,
            scope: this,
            single: true
        });

        increaseGrid.on({
            afteredit: this.onAfterIncreaseEdit,
            scope: this
        });

        normGrid.selModel.on('selectionchange',this.onSelectionChange,this);
 
         Ext.apply(cfg, {
            layout: 'border',
            border: false,
            normGrid:normGrid,
            increaseGrid:increaseGrid,
            store: normGrid.store,
            stores: [],
            items: [
                normGrid,
                increaseGrid
            ]
        });


        this.IncreaseSaveTask = new Ext.util.DelayedTask(this.onIncreaseSaveTask, this);     
            
        T.view.car.Norm.superclass.constructor.call(this, cfg);
    },

    onIncreaseSaveTask: function() {

    this.store.each(function(r) {
        var increaseStore = this.stores[this.store.indexOf(r)];
        increaseStore.each(function(i) {
            i.set('NormId', r.id);
        });
        increaseStore.save();
    }, this);
    
    },

    cloneFn:function() {
        var sel = this.normGrid.getSelectionModel().getSelected();
        if (sel) {
            var clone = Kdn.clone(sel.data);
            clone.NormId = null;
            var Rec = new this.store.recordType(clone);
            this.store.insert(0,Rec);
        }

        var sourceStore = this.stores[this.store.indexOf(sel)];
        var destStore = this.stores[this.store.indexOf(Rec)];

        sourceStore.each(function(r) {
        var data = Kdn.clone(r.data);
            data.NormIncreaseId = null;
            destStore.add(new destStore.recordType(data));
        });

        this.normGrid.getView().refresh();

    },

    IncreaseRenderer: function(v, meta, r, rowIndex, colIndex, store) {

        var index = store.indexOf(r);
        var store = this.stores[index] || this.increaseGrid.emptyStore;
        var increaseStore = Kdn.ModelFactory.getStore('Increase');
        var a = [];
        var sum = 0;

        store.each(function(rec) {
        var increase = increaseStore.getById(rec.get('IncreaseId'));

            sum += rec.data.Prcn;    
        
            a.push(increase.data.IncreaseName + ' ' + rec.data.Prcn + '%');
        });

        if (a.length > 1) {
            a = a.concat(String.format('<b>Всего {0}%<b>', sum));
        }  
        
        return a.join('<br/>');
    },
    
    save:function() {
      if (!this.store.hasChanges()) {
          this.onNormWrite();
      }
    },

    onNormWrite: function() {
        var delay = 100;
        this.IncreaseSaveTask.delay(delay);
    },

    onAfterIncreaseEdit: function(e) {

        switch (e.field) {
            case 'IncreaseId':
            {
                if (e.value != e.originalValue) {
                var id = e.value;
                if (id) {
                    var rec = Kdn.ModelFactory.getStore('Increase').getById(id);
                    e.record.set('Prcn', rec.get('Prcn'));
                    e.record.set('Const', rec.get('isNormConstant'));
                }
            }
        }           
        }
        
    },

    onAfterNormGridRender:function() {
        this.increaseGrid.getEl().mask();
    },

    onNormsLoad: function() {
        Ext.iterate(this.stores, function(obj) {
            if (obj) {
                obj.destroy();
            }
        });
        this.stores = [];

        this.onSelectionChange.defer(100,this,[this.normGrid.selModel]);
        
        this.store.each(function(r) {
            var s = Kdn.ModelFactory.getModel('NormIncrease').buildStore({
                autoLoad: false,
                autoSave: false,
                listeners: {
                    scope:this,
                    load:this.onIncreasesLoad,
                    update: this.onIncreaseUpdate,
                    remove: this.onIncreaseUpdate
                }
            });
            s.reload({
                params: { filter: { NormId: r.id } }
            });
            this.stores.push(s);

        },this);

    },
    
    onIncreasesLoad:function(store) {
        this.normGrid.getView().refresh();
    },
    
    onIncreaseUpdate:function(store) {
        this.normGrid.getView().refresh();
    },
    
    onSelectionChange:function(sm) {

        var sel = sm.getSelections();
   
        if (sel.length==1) {
            this.increaseGrid.getEl().unmask();
            var r = sel.shift();
            var increaseStore = this.stores[r.store.indexOf(r)];
            this.increaseGrid.reconfigure(increaseStore, this.increaseGrid.colModel);

        } else {
        this.increaseGrid.getEl().mask();
        this.increaseGrid.reconfigure(this.increaseGrid.emptyStore, this.increaseGrid.colModel);
        }
    },

    onNormAdd: function(store, record, index) {

        if (this.stores.length != store.getCount()) {

            this.stores.unshift(
                Kdn.ModelFactory.getModel('NormIncrease').buildStore({
                    autoLoad: false,
                    autoSave: false,
                    listeners: {
                        scope: this,
                        load: this.onIncreasesLoad,
                        update: this.onIncreaseUpdate,
                        remove: this.onIncreaseUpdate
                    }
                })
            );
        }

    },
    
    onNormRemove:function(store,record,index) {
        this.stores.remove(this.stores[index]);
    }
    
});
Ext.reg('view.car.norm', T.view.car.Norm);
