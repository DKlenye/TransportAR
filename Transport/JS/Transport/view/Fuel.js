T.view.Fuel = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'Petrol',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {

            colModel: new Ext.grid.ColumnModel({
                defaults:{filter:{}},
                columns: [
                    {
                        dataIndex: 'FuelId',
                        header: 'Код',
                        width: 130,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'FuelName',
                        header: 'Наименование ГСМ',
                        width: 300,
                        editor: { xtype: 'kdn.editor.textfield' }
                    },
                    {
                        dataIndex: 'ShortFuelName',
                        header: 'Сокращённое наименование ГСМ',
                        width: 350,
                        editor: { xtype: 'kdn.editor.textfield' }
                    }
                ]
            })
        });

        T.view.Fuel.superclass.constructor.call(this, cfg);

    }
});

Ext.reg('view.fuel', T.view.Fuel);