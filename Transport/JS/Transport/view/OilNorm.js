T.view.OilNorm = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'OilNorm',
    requireModels: 'VehicleOilGroup,PetrolGroup,OilGroup',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {

            colModel: new Ext.grid.ColumnModel({
                defaults:{filter:{}},
                columns: [
                    {
                        dataIndex: 'OilNormId',
                        header: 'Код',
                        width: 130,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'VehicleOilGroupId',
                        header: 'Группа транспорта по маслам',
                        width: 300,
                        editor: { xtype: 'combo.vehicleoilgroup', objectValue: false },
                        renderer: Kdn.Renderer.store('VehicleOilGroup', 'VehicleOilGroupName'),
                        filter: {
                            field: {
                                xtype: 'combo.vehicleoilgroup',
                                objectValue: false,
                                enableClear: true
                            },
                            fieldEvents: ["select"],
                            test: function (filterValue, value) {
                                if (!filterValue) return true;
                                return value == filterValue;
                            } 
                        }
                    },
                    {
                        dataIndex: 'PetrolGroupId',
                        header: 'Тип топлива',
                        width: 125,
                        editor: { xtype: 'combo.petrolgroup', objectValue: false },
                        renderer: Kdn.Renderer.store('PetrolGroup', 'PetrolGroupName'),
                        filter: {
                            field: {
                                xtype: 'combo.petrolgroup',
                                objectValue: false,
                                enableClear: true
                            },
                            fieldEvents: ["select"],
                            test: function (filterValue, value) {
                                if (!filterValue) return true;
                                return value == filterValue;
                            } 
                        }
                    },
                    {
                        dataIndex: 'OilGroupId',
                        header: 'Группа масла',
                        width: 150,
                        editor: { xtype: 'combo.oilgroup', objectValue: false },
                        renderer: Kdn.Renderer.store('OilGroup', 'OilGroupName'),
                        filter: {
                            field: {
                                xtype: 'combo.oilgroup',
                                objectValue: false,
                                enableClear: true
                            },
                            fieldEvents: ["select"],
                            test: function (filterValue, value) {
                                if (!filterValue) return true;
                                return value == filterValue;
                            } 
                        }
                    },
                    {
                        dataIndex: 'Norm',
                        header: 'Норма',
                        width: 100,
                        editor: { xtype: 'kdn.editor.decimalfield' }
                    }
                ]
            })
        });

                T.view.OilNorm.superclass.constructor.call(this, cfg);

    }
});

Ext.reg('view.oilnorm', T.view.OilNorm);