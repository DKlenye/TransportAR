T.view.VehicleReoillingGrid = Ext.extend(Kdn.view.BaseGrid, {
    editor: 'view.oilworkeditor',
    modelName: 'VehicleReoilling',
    pageSize: 50,
    pageMode: 'remote',
    constructor: function (cfg) {
        cfg = cfg || {};
        me = this;

        cfg.ComboCar = Ext.create({
                dataIndex: 'vehicle',
	            xtype:'combo.car',
	            width:300,
	            listeners:{
	                scope: me,
                    select: function (rec) {                                      
                        this.VehicleId = rec.data.VehicleId;
                        this.body.unmask();  
                        this.addButtonVehicleReoling.setDisabled(false);
                        this.reload();
                    }
	            }
        });


        Ext.apply(cfg, {

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
                        renderer: function (v) {
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
                        renderer: function (o) {
                            if (!o) return null;
                            return o.FuelName;
                        },
                        editor: { xtype: 'combo.fuel' }
                    },
                    {
                        dataIndex: 'Quantity',
                        align: 'center',
                        header: 'Количество',
                        editor: { xtype: 'kdn.editor.decimalfield' }
                    },
                    {
                        dataIndex: 'OilChange',
                        align: 'center',
                        header: 'Назначение',
                        renderer: function (o) {
                            if (!o) return 'Доливка';
                            return 'Замена';
                        },
                    }
                ]
            })
        });

        T.view.VehicleReoillingGrid.superclass.constructor.call(this, cfg);

         this.on({
            viewready:me.onAfterRender,
            scope:me,
            single:true
        });
    },


    initComponent:function(){

        var provider = Kdn.Direct;
        var cfg = {
            autoLoad:false,
            autoSave:true,
            api: {
                create: provider['Create'],
                read: provider['GetVehicleReoling'],
                update: provider['Update'],
                destroy: provider['Destroy']
            }
       };
       
       var store =  Kdn.ModelFactory.getStore('VehicleReoilling', cfg);
       Ext.apply(this,{
            store:store
       });

       T.view.VehicleReoillingGrid.superclass.initComponent.call(this);
    },  

    _getTbar: function () {

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

    onAfterRender: function() {
        this.addButtonVehicleReoling.setDisabled(true);
        this.ComboCar.focus.defer(300,this.ComboCar,[true]);
        this.body.mask();
        this.VehicleId = 0;
        this.reload();
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
        //alert('Добавление замены масла');
        var winAddChangeOil = new T.view.OilWorkAddChangeForm({
            VehicleId: this.VehicleId
        });
        winAddChangeOil.show(this);
    },

    onRemoveChangeOil: function() {
        alert('Удаление замены масла');
    }

});
Ext.reg('view.vehiclereoillinggrid', T.view.VehicleReoillingGrid);


T.view.OilWorkAddChangeForm = Ext.extend(Ext.Window, {
    initComponent: function() {
        Ext.apply(this, {
            title: 'Добавление замены масла',
            padding: 10,
            waitMsgTarget: true,
            items:[
                {
                    xtype: 'kdn.editor.datefield',
                    fieldLabel: 'Дата замены',
                    name: 'Date',
                    width: 250
                },
                {
                    xtype: 'kdn.editor.numberfield',
                    fieldLabel: 'Следующая замена через',
                    name: 'Duration'
                },
                {
                    xtype: 'combo.norm',
                    fieldLabel: 'Норма',
                    name: 'Norm',
                    VehicleId: this.VehicleId
                },
                {
                    xtype: 'kdn.editor.numberfield',
                    fieldLabel: 'Коэффициент,%',
                    name: 'Percentage'
                }
            ]
        });


        T.view.OilWorkAddChangeForm.superclass.initComponent.call(this);
    },
});




T.view.OilWork = Ext.extend(Ext.Panel, {
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};

        Ext.apply(cfg, {
            layout: 'border',
            items: [
                {
                    region: 'center',
                    xtype: 'view.vehiclereoillinggrid',
                    ref:'VehicleReoillingGrid'
                },
                {
                    region: 'south',
                    height: 250,
                    title: 'Нормативный расход масла',
                    split: true,
                    collapsible: true,
                    stripeRows: true
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
            rec.data.OilChange ? isAddChangeOil = false : isAddChangeOil = true;
            this.VehicleReoillingGrid.addChangeOil.setVisible(isAddChangeOil);
            this.VehicleReoillingGrid.removeChangeOil.setVisible(!isAddChangeOil);
        }
    }
});

Ext.reg('view.oilwork', T.view.OilWork);