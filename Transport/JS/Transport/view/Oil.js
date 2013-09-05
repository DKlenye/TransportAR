T.view.Oil = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'Oil',
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
                        header: 'Наименование масла',
                        width: 300,
                        editor: { xtype: 'kdn.editor.textfield' }
                    },
                    {
                        dataIndex: 'ShortFuelName',
                        header: 'Сокращённое наименование масла',
                        width: 350,
                        editor: { xtype: 'kdn.editor.textfield' }
                    },
                    {
                        dataIndex: 'OilGroupId',
                        header: 'Группа масла',
                        width: 100,
                        editor: { xtype: 'combo.oilgroup',objectValue:false },
                        renderer: function(o) {
                            if (!o && !Ext.isObject(o)) return null;
                            var store = Kdn.ModelFactory.getStore('OilGroup'),
                                record = store.getById(o);                              
                                if (record) return record.get('OilGroupName');                              
                                return o;
                        }
                    }
                ]
            })
        });

        T.view.Oil.superclass.constructor.call(this, cfg);

    }
});

Ext.reg('view.oil', T.view.Oil);