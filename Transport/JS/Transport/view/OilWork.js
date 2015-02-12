T.view.VehicleReoillingGrid = Ext.extend(Kdn.view.BaseGrid, {
    //requireModels: 'TireModel,TireStandard,TireMaker',
    //editor: 'view.tireeditor',
    modelName: 'VehicleReoilling',
    pageSize: 50,
    pageMode: 'remote',
    constructor: function (cfg) {
        cfg = cfg || {};
        me = this;


        cfg.ComboCar = Ext.create({
	            xtype:'combo.car',
	            width:300,
	            listeners:{
	                scope: me,
                    select: function (rec) {                                      
                        this.vehicleId = rec.data.VehicleId;
                        this.updateVehicleReoling();
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
                        dataIndex: 'VehicleId',
                        align: 'center',
                        header: 'Авто',
                        //hidden: true,
                        editor: {
                             hidden:true,
                             xtype: 'kdn.editor.numberfield',
                             defaultvalue:this.VehicleId
                             
                        }
                        
                    }
                ]
            })
        });

        T.view.Tire.superclass.constructor.call(this, cfg);

         this.on({
            viewready:me.onAfterRender,
            scope:me,
            single:true
        });
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
                cls: 'add_btn'
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
                text: 'Редактировать',
                iconCls: 'icon-edit',
                handler: this.onEdit,
                scope: this,
                cls: 'edit_btn',
                disabled: true
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
            '-',
            {
                xtype: 'tbspacer',
                width: 20
            }
        ];
    },

    onAfterRender: function() {
        this.ComboCar.focus.defer(300,this.ComboCar,[true]);
    },


    updateVehicleReoling: function() {
        //if (this.vehicleId) {
            var store = Kdn.ModelFactory.getStore('VehicleReoilling');
            store.reload({
                params: {
                    sqlFilter: String.format("VehicleId = {0}",
                        this.vehicleId
                    ),
                    start: 0
                }
            });
       // }
    },

    _getStore: function()
    {
         var cfg= {
             autoLoad:false,
             autoSave:true
         };         
         if(this.pageSize && this.pageMode!='local'){
            Ext.apply(cfg,{
               baseParams:{
                  start:0,
                  limit:this.pageSize
               },
               remoteSort:true
            });
         }
         
        return Kdn.ModelFactory.getStore(this.modelName,cfg);
    },

     onAdd: function() {
         //this.editor.customEditors.VehicleId.value = this.VehicleId;
        Kdn.Application .createView({
            xtype: this.editor,
            grid: this,
            title: this.getInsertText(),
            iconCls: 'icon-add',
            withContainer:false
        });


    },  

});
Ext.reg('view.vehiclereoillinggrid', T.view.VehicleReoillingGrid);


T.view.OilWork = Ext.extend(Ext.Panel, {
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};

        Ext.apply(cfg, {
            layout: 'border',
            items: [
                {
                    region: 'center',
                    xtype: 'view.vehiclereoillinggrid'
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
    },
});

Ext.reg('view.oilwork', T.view.OilWork);