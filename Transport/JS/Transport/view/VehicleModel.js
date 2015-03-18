T.view.VehicleModel = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'VehicleModel',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {

            colModel: new Ext.grid.ColumnModel({
                defaults:{filter:{}},
                columns: [
                    {
                        dataIndex: 'VehicleModelId',
                        header: 'Код',
                        width: 130,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'VehicleModelName',
                        header: 'Наименование',
                        width: 400,
                        editor: { xtype: 'kdn.editor.textfield' }
                    }
                ]
            })
        });

            T.view.VehicleModel.superclass.constructor.call(this, cfg);

    }
});

    Ext.reg('view.vehiclemodel', T.view.VehicleModel);