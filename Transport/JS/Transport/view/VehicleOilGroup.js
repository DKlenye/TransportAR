T.view.VehicleOilGroup = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'VehicleOilGroup',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {

            colModel: new Ext.grid.ColumnModel({
                defaults:{filter:{}},
                columns: [
                    {
                        dataIndex: 'VehicleOilGroupId',
                        header: 'Код',
                        width: 130,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'VehicleOilGroupName',
                        header: 'Наименование',
                        width: 300,
                        editor: { xtype: 'kdn.editor.textfield' }
                    }
                ]
            })
        });

            T.view.VehicleOilGroup.superclass.constructor.call(this, cfg);

    }
});

Ext.reg('view.vehicleoilgroup', T.view.VehicleOilGroup);