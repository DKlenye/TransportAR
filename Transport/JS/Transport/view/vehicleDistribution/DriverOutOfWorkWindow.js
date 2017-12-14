T.view.vehicleDistribution.DriverOutOfWorkWindow = Ext.extend(Ext.Window, {
    
    constructor:function(cfg) {

        this.addEvents("outofworkchange");
        
        cfg = cfg || {};

        var store = Kdn.ModelFactory.getModel('DriverOutOfWork').buildStore({
            baseParams: {
                start: 0,
                limit: 50
            },
            remoteSort: true,
            autoSave: false,
            autoLoad: false
        });

        
        Ext.apply(cfg, {
            layout: 'fit',
            title:'Отгулы/Больничные водителей',
            items: [
                {
                    xtype: 'editorgrid',
                    clicksToEdit:1,
                    viewConfig:{
                       forceFit:true,
                       getRowClass: function (record, rowIndex, rp, ds) {

                           var rowColors = {
                               0: '',
                               1: 'green',
                               2: 'red',
                               3: 'yellow'
                           };

                           return rowColors[record.get('Cause')];
                       }
                    },
                    ref:'grid',
                    border:false,
                    columnLines: true,
                    stripeRows: true,
                    loadMask: true,
                    columns: [
                        {
                            xtype:'actioncolumn',
                            icon: 'images/icons/delete.png',
                            tooltip: 'Удалить',
                            fixed: true,
                            width:40,
                            handler: function (grid, rowIndex, colIndex) {
                                var rec = store.getAt(rowIndex);
                                store.remove(rec);
                            }

                        },
                        {
                            dataIndex: 'Cause',
                            header: 'Тип документа',
                            renderer:function(v) {
                                var values = {
                                    1:'Отпуск',
                                    2: 'Больничный',
                                    3: 'Отгул'
                                };
                                return values[v];
                            },
                            editor: {
                                xtype: 'combo',
                                editable:false,
                                typeAhead: true,
                                triggerAction: 'all',
                                lazyRender: true,
                                mode: 'local',
                                store: new Ext.data.ArrayStore({
                                    fields: ['id', 'name'],
                                    data: [[1, 'Отпуск'],[2, 'Больничный'], [3, 'Отгул"']]
                                }),
                                valueField: 'id',
                                displayField: 'name'
                            }
                        },
                        {
                            dataIndex: 'StartDate',
                            xtype: 'datecolumn',
                            header: 'С',
                            editor: { xtype: 'kdn.editor.datefield' }
                        },
                        {
                            dataIndex: 'EndDate',
                            xtype:'datecolumn',
                            header: 'По',
                            editor: { xtype: 'kdn.editor.datefield',allowBlank:true,enableClear:true }
                        }
                    ],
                    store: store,
                    tbar: [
                        '-',
                        'Водитель:',
                        {
                            width: 300,
                            ref:'../../driver',
                            xtype: 'combo.driver',
                            listeners: {
                                scope:this,
                                select:function() {
                                    this.reload();
                                }
                            }
                        },
                        '-',
                        {
                            xtype:'button.add',
                            handler: this.onAddClick,
                            scope:this
                        },
                        '-'
                    ]
                }
            ],
            bbar: [
                '->',
                '-',
                {
                    xtype:'button.save',
                    handler: this.onSave,
                    scope: this
                },
                '-'
            ]
        });
        T.view.vehicleDistribution.DriverOutOfWorkWindow.superclass.constructor.call(this, cfg);

        this.on({
            scope:this,
            beforehide: this.onBeforeClose
        });

    },

    showWithDriver: function (driver) {
        this.show();
        this.driver.setValue(driver);
        this.reload();
    },

    reload: function () {

        var driver = this.driver.getValue();

        this.grid.store.reload({
            params: { filter: {Driver:driver} }
        });

    },

    onAddClick: function (btn, ev) {
        var store = this.grid.store,
            r = new store.recordType({
            Driver:this.driver.getValue(),
            Cause:3,
            StartDate:new Date(),
            EndDate:new Date()
        });
        this.grid.stopEditing();
        store.insert(0, r);
        this.grid.startEditing(0, 3);
    },

    onSave: function () {
        var me = this;
        var driver = this.driver.getValue();

        this.grid.store.on({
            save: function (store, batch, data) {
                me.hide();
                me.fireEvent('outofworkchange',driver);
            },
            single: true
        })
        this.grid.store.save();
    },

    onBeforeClose:function() {
        var me = this,
            grid = me.grid,
            store = grid.store;
        
        if (store.hasChanges()) {

            Ext.Msg.show({
                title: 'Сохранить изменения?',
                msg: 'Вы пытаетесь закрыть окно с данными, в которых имеются несохранённые изменения. Сохранить изменения?',
                buttons: Ext.Msg.YESNOCANCEL,
                fn: function(e) {
                    switch (e) {
                        case 'no':
                        {
                            store.rejectChanges();
                            me.hide();    
                            break;
                        }
                        case 'yes':
                        {
                            me.onSave();
                            break;
                        }
                    };
                },
                scope:this,
                icon: Ext.MessageBox.QUESTION
            });

            return false;
        }
    }

});

Ext.reg('view.driveroutofworkwindow', T.view.vehicleDistribution.DriverOutOfWorkWindow);