T.view.CalculateTariff = Ext.extend(Kdn.view.BaseGrid, {
        requireModels:"Petrol,Trailer",
        modelName: 'TariffCalculation',
        editor: 'view.calculatetariffeditor',
        constructor: function (cfg) {
            cfg = cfg || {};
            Ext.apply(cfg, {

                colModel: new Ext.grid.ColumnModel({
                    defaults: { filter: {} },
                    columns: [
                    {
                        dataIndex: 'TariffCalculationId',
                        header: 'Код',
                        width: 50
                    },
                        {
                        xtype:'datecolumn',
                        dataIndex: 'Date',
                        header: 'Дата'  
                        },
                        {
                            xtype:'mappingcolumn',
                            dataIndex: 'Car.GarageNumber',
                            header: 'Гар.№ ТС',
                            width: 50
                        },
                        {
                            xtype: 'mappingcolumn',
                            dataIndex: 'Car.Model',
                            header: 'Марка ТС',
                            width: 150
                        },
                        {
                            xtype: 'mappingcolumn',
                            dataIndex: 'Car.RegistrationNumber',
                            header: 'Гос.№ ТС',
                            width: 70
                        },
                        {
                            header: 'Прицеп',
                            width: 200,
                            dataIndex: 'TrailerId',
                            renderer: T.combo.Trailer.prototype.renderTpl,
                            filter: {
                                field: {
                                    xtype: 'combo.trailer',
                                    enableClear: true
                                },
                                fieldEvents: ["select"]
                            }
                        },
                        {
                            header: 'Водитель',
                            width: 240,
                            dataIndex: 'Driver',
                            renderer: T.combo.Driver.prototype.renderTpl,
                            filter: {
                                field: {
                                    xtype: 'combo.driver',
                                    enableClear: true
                                },
                                fieldEvents: ["select"]
                            }
                        },
                        {
                            dataIndex: 'Description',
                            header: 'Примечание',
                            width: 150
                        }
                    ]
                })
            });

            T.view.CalculateTariff.superclass.constructor.call(this, cfg);

        },

            _getTbar: function () {

        /* var exportButton = new Ext.ux.Exporter.Button({
        store: this.store,
        exportFunction:'exportStore',
        text     : "Экспорт в excel"
        });*/



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
                width: 10
            },
            '-',
         {
             text: 'Калькуляция',
             iconCls: 'icon-excel',
             handler: function () {
                 var sel = this.getSelectionModel().getSelected();
                 if (sel) {
                     var params = {};
                     params.id = sel.id;
                     Kdn.Reporter.exportReport("TariffCalculation", params, "Excel")
                 }
             },
             scope: this
         },
            
            '-'
            
            //,
        //'->',
        //exportButton

        ]
    }

    });

    Ext.reg('view.calculatetariff', T.view.CalculateTariff);