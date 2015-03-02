T.view.VehicleReoillingGrid = Ext.extend(Kdn.view.BaseGrid, {
    editor: 'view.oilworkeditor',
    modelName: 'VehicleReoilling',
    pageSize: 50,
    pageMode: 'remote',

    constructor: function(cfg) {
        cfg = cfg || {};
        me = this;

        cfg.ComboCar = Ext.create({
            dataIndex: 'vehicle',
            xtype: 'combo.car',
            width: 300,
            listeners: {
                scope: me,
                select: function(rec) {
                    if (rec) {
                        this.VehicleId = rec.data.VehicleId;

                        this.OilWorkPanel.VehicleReoillingGrid.body.unmask();
                        this.OilWorkPanel.OilStandartConsuptionGrid.body.unmask();

                        this.addButtonVehicleReoling.setDisabled(false);
                        this.addChangeOil.setVisible(false);
                        this.removeChangeOil.setVisible(false);

                        this.reload();
                        this.reloadoilStandartConsuptionStore();
                    }
                }
            }
        });


        Ext.apply(cfg, {
            viewConfig: {
                getRowClass: function(record, index) {
                    var val = record.data.IsOilChange;
                    return val ? 'red' : '';
                }
            },
            colModel: new Ext.grid.ColumnModel({
                defaults: { filter: {} },
                columns: [
                    {
                        dataIndex: 'ReoillingId',
                        align: 'center',
                        header: 'Код',
                        width: 80,
                        hidden: true,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'RefuellingDate',
                        align: 'center',
                        header: 'Дата выдачи',
                        xtype: 'datecolumn',
                        width: 150,
                        editor: { xtype: 'kdn.editor.datefield' }
                    },
                    {
                        dataIndex: 'RefuellingPlace',
                        align: 'center',
                        width: 200,
                        header: 'Место выдачи',
                        renderer: function(v) {
                            if (!v) return null;
                            return v.RefuellingPlaceName;
                        }
                    },
                    {
                        header: 'Водитель',
                        width: 280,
                        align: 'center',
                        dataIndex: 'Driver',
                        renderer: T.combo.Driver.prototype.renderTpl,
                        filter: {
                            field: {
                                xtype: 'combo.driver',
                                enableClear: true
                            },
                            fieldEvents: ["select"]
                        },
                        editor: {
                            xtype: 'combo.driver'
                        }
                    },
                    {
                        header: 'Масло',
                        dataIndex: 'Fuel',
                        width: 220,
                        renderer: function(o) {
                            if (!o) return null;
                            return o.FuelName;
                        },
                        editor: { xtype: 'combo.oil' }
                    },
                    {
                        dataIndex: 'Quantity',
                        align: 'center',
                        header: 'Количество',
                        editor: { xtype: 'kdn.editor.decimalfield' }
                    },
                    {
                        dataIndex: 'IsOilChange',
                        align: 'center',
                        header: 'Назначение',
                        renderer: function(o) {
                            if (!o) return 'Доливка';
                            return 'Замена';
                        }
                    }
                ]
            })
        });

        T.view.VehicleReoillingGrid.superclass.constructor.call(this, cfg);

        this.on({
            viewready: me.onAfterRender,
            scope: me,
            single: true
        });
    },


    initComponent: function() {
        var me = this;
        var provider = Kdn.Direct;
        var cfg = {
            autoLoad: false,
            autoSave: true,
            api: {
                create: provider['Create'],
                read: provider['GetVehicleReoling'],
                update: provider['Update'],
                destroy: provider['Destroy']
            },
            listeners: {
              save:me.onVehicleReolingStoreSave,
              scope:me  
            }
        };

        var store = Kdn.ModelFactory.getStore('VehicleReoilling', cfg);
        Ext.apply(me, {
            store: store
        });

        T.view.VehicleReoillingGrid.superclass.initComponent.call(me);
    },

    onVehicleReolingStoreSave:function() {
        this.reloadoilStandartConsuptionStore();
    },

    _getTbar: function() {

        return [
            '-',
            {
                text: 'Обновить',
                iconCls: 'icon-refresh',
                handler: this.onRefresh,
                scope: this,
                cls: 'update_btn'
            },
            '-',
            { xtype: 'tbspacer', width: 10 },
            this.ComboCar,
            '-',
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
                cls: 'add_btn',
                ref: '../addButtonVehicleReoling'
            },
            '-',
            {
                text: 'Редактировать',
                iconCls: 'icon-edit',
                handler: this.onEdit,
                scope: this,
                cls: 'edit_btn',
                disabled: true,
                ref: '../editButtonVehicleReoling'
            },
            '-',
            {
                text: 'Удалить',
                iconCls: 'icon-delete',
                handler: this.onDelete,
                scope: this,
                cls: 'delete_btn',
                disabled: true,
                ref: '../removeButtonVehicleReoling'
            },
            '-',
            {
                xtype: 'tbspacer',
                width: 20
            },
            {
                text: 'Ввести замену',
                iconCls: 'icon-norm',
                handler: this.onAddChangeOil,
                scope: this,
                cls: 'norm_btn',
                hidden: true,
                ref: '../addChangeOil'
            },
            {
                text: 'Убрать замену',
                iconCls: 'icon-paintcan',
                handler: this.onRemoveChangeOil,
                scope: this,
                cls: 'paintcan_btn',
                hidden: true,
                ref: '../removeChangeOil'
            }
        ];
    },


    onDelete: function() {
        var rec = this.store.data.map[this.ReoillingId];
        if(!rec.data.IsOilChange)
            T.view.VehicleReoillingGrid.superclass.onDelete.call(this);
        else {
            Ext.Msg.alert('Удаление данных о выдаче масла',
                          'Удаление невозможно,т.к выдача масла используется как замена.<br/> ' +
                                'Удалите данные о замене масла, после чего повторите операцию.'
            );
        }          
    },

    onAfterRender: function() {
        this.addButtonVehicleReoling.setDisabled(true);
        this.ComboCar.focus.defer(300,this.ComboCar,[true]);
        this.OilWorkPanel.VehicleReoillingGrid.body.mask();
        this.OilWorkPanel.OilStandartConsuptionGrid.body.mask();
        this.VehicleId = 0;
        this.reload();
    },
    
    reloadoilStandartConsuptionStore: function()
    {
        if (this.VehicleId > 0) {
            this.OilWorkPanel.oilStandartConsuptionStore.reload({
                params: { 'VehicleId': this.VehicleId }
            });
        }
    },


    reload: function()
    {
        var store = Kdn.ModelFactory.getStore('VehicleReoilling');
        store.reload({ params: {'VehicleId':this.VehicleId} });
    },
    
    onRowDblClick: function () {
        if(!this.editButtonVehicleReoling.disabled)
            T.view.VehicleReoillingGrid.superclass.onRowDblClick.call(this);    
    },

    onAddChangeOil: function() {
        var winAddChangeOil = new T.view.OilWorkAddChangeForm({
            VehicleId: this.VehicleId,
            ReoillingId: this.ReoillingId,
            VehicleReoillingGrid: this
        });
        winAddChangeOil.show(this.addChangeOil.getEl());
    },
    
    onRemoveChangeOil: function() {
        Ext.Msg.confirm(
                    'Удаление замены масла',
                    '<br/> Вы действительно хотите удалить данные о замене масла?',
                    function(m) {
                         if (m == 'yes') this.removeOilChange();
                    },
                    this
        );
    },

    removeOilChange: function() {
        var store = this.getOilChangeStore(true);
        var index = store.find('ReoillingId',this.ReoillingId);
        if (index != -1)
            store.removeAt(index);
        this.addChangeOil.setVisible(true);
        this.removeChangeOil.setVisible(false);
    },
    
    getOilChangeStore: function(autoLoad) {
        var me = this; 
        var store = Kdn.ModelFactory.getStore('OilChange', {autoLoad:autoLoad});
        store.on({
            save: function(store, batch, data ) {
                me.reload();
                me.reloadoilStandartConsuptionStore();
            },
            single: true
        });
        return store;
    }
});
Ext.reg('view.vehiclereoillinggrid', T.view.VehicleReoillingGrid);



//Форма добавления замены масла для выбранной выдачи масла
T.view.OilWorkAddChangeForm = Ext.extend(Ext.Window, {
    initComponent: function() {
        Ext.apply(this, {
            title: 'Добавление замены масла',
            padding: 10,
            modal: true,
            resizable:false,
            items:[
                {
                    xtype: 'kdn.editor.numberfield',
                    fieldLabel: 'Следующая замена через',
                    name: 'Duration',
                    ref: 'Duration'
                },
                {
                    xtype: 'combo.norm',
                    fieldLabel: 'Норма',
                    name: 'Norm',
                    ref: 'Norm',
                    VehicleId: this.VehicleId,
                    width: 320,
                    listeners: {
                            select: this.onComboBoxNormSelect,
                        scope: this
                    }
                },
                {
                    xtype: 'kdn.editor.numberfield',
                    fieldLabel: 'Коэффициент,%',
                    ref: 'Percentage',
                    name: 'Percentage',
                    allowBlank:true
                },
                {
                    xtype:'button.add',
                    handler: this.onAddChangeOil,
                    scope: this
                }
            ]
        });


        T.view.OilWorkAddChangeForm.superclass.initComponent.call(this);
    },

    onComboBoxNormSelect: function (rec) {
        this.NormId = rec.data.NormId;
    },

    onAddChangeOil: function() {
        if (!this.Duration || this.Duration.getValue() == "") {
            Ext.Msg.alert('Сообщение', 'Поле "следующая замена через" обязательно для заполнения!');
            return;
        }
        if (!this.NormId || this.NormId == "") {
            Ext.Msg.alert('Сообщение', 'Выберите норму расхода топлива!');
            return;
        }

        var store = this.VehicleReoillingGrid.getOilChangeStore(false);
       
        var record = new store.recordType();
        record.data.Duration = this.Duration.getValue();
        record.data.NormId = this.NormId;
        record.data.Percentage = this.Percentage?this.Percentage.getValue():0;
        record.data.ReoillingId = this.ReoillingId;

        store.add(record);

        this.VehicleReoillingGrid.addChangeOil.setVisible(false);
        this.VehicleReoillingGrid.removeChangeOil.setVisible(true);

        this.close();
    }
});




T.view.OilWork = Ext.extend(Ext.Panel, {
    requireModels:"OilChange",
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};


        me.oilStandartConsuptionStore = new Ext.data.DirectStore({
            autoDestroy: true,
            api: {
                read: Kdn.Direct.GetStandartConsuption
            },
            idProperty: 'Id',
            fields: [
            'OilGroupName',
            'DateOilChange',
            'Quantity',
            'Duration',
            'OilWear',
            'OilNorm',
            'FuelConsumption',
            'OilConsumptionNorm',
            'OilConsumptionFact'
            ],
            root: 'data'
        });

        Ext.apply(cfg, {
            layout: 'border',
            border:false,
            items: [
                {
                    region: 'center',
                    xtype: 'view.vehiclereoillinggrid',
                    ref:'VehicleReoillingGrid',
                    OilWorkPanel:me
                },
                {
                    region: 'south',
                    height: 250,
                    title: 'Нормативный расход масла',
                    split: true,
                    collapsible: true,
                    stripeRows: true,
                    xtype: 'grid',
                    columnLines: true,
                    loadMask: true,
                    store:me.oilStandartConsuptionStore,
                    ref:'OilStandartConsuptionGrid',
                    columns: [
                        {
                            header: 'Группа масла',
                            dataIndex: 'OilGroupName',
                            width: 200
                        },
                        {
                            header: 'Дата посл. замены',
                            dataIndex: 'DateOilChange',
                            width: 140,
                            format: 'd.m.Y',
                            xtype: 'datecolumn'
                        },
                        {
                            header: 'Заменено,л',
                            dataIndex: 'Quantity',
                            width: 90
                        },
                        {

                            header: 'След. замена через',
                            dataIndex: 'Duration',
                            width: 150
                        },
                        {
                            header: 'Износ масла',
                            dataIndex: 'OilWear',
                            width: 100
                        },
                        {
                            header: 'Норма рас. масла',
                            dataIndex: 'OilNorm',
                            width: 140
                        },
                        {
                            header: 'Рас. топлива,л',
                            dataIndex: 'FuelConsumption',
                            width: 120
                        },
                        {
                            header: 'Рас. масла по норме',
                            dataIndex: 'OilConsumptionNorm',
                            width: 150
                        },
                        {
                            header: 'Рас. масла по факту',
                            dataIndex: 'OilConsumptionFact',
                            width: 150
                        }
                    ]

                }
            ]
        });

        T.view.OilWork.superclass.constructor.call(this, cfg);

        this.VehicleReoillingGrid.getSelectionModel().on({
            selectionchange: this.onSelectionChangeReoillingGrid,
            scope: this
        });
    },  

    onSelectionChangeReoillingGrid: function(sel) {
        var rec = sel.getSelected();
        if (rec) {
            var isNoEdit;
            rec.data.RefuellingPlace ? isNoEdit = true : isNoEdit = false;
            this.VehicleReoillingGrid.editButtonVehicleReoling.setDisabled(isNoEdit);
            this.VehicleReoillingGrid.removeButtonVehicleReoling.setDisabled(isNoEdit);

            var isAddChangeOil;
            rec.data.IsOilChange ? isAddChangeOil = false : isAddChangeOil = true;
            this.VehicleReoillingGrid.addChangeOil.setVisible(isAddChangeOil);
            this.VehicleReoillingGrid.removeChangeOil.setVisible(!isAddChangeOil);

            this.VehicleReoillingGrid.ReoillingId = rec.data.ReoillingId;
        }
    }
});

Ext.reg('view.oilwork', T.view.OilWork);